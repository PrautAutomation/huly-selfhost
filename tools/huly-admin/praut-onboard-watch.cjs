// HLÍDAČ onboardingu: automaticky zařadí KAŽDÉHO nového člena workspace do prostorů
// podle VÝCHOZÍ role (default: vyvojar = PULS + sdílená dokumentace). Běží na pozadí (cron),
// takže Štěpán jen pošle pozvánkový odkaz a o nic dalšího se nestará.
//
// Bezpečnost:
//   - Drží si "ledger" už zpracovaných účtů MIMO git: /Users/stepan/praut/praut-onboard-watch-seen.json
//   - Stávajících členů se NIKDY nedotkne (jsou v ledgeru z prvního "osetí").
//   - Jen PŘIDÁVÁ do prostorů (members), nikdy nic neodebírá ani nemaže. Idempotentní.
//   - Bez --apply = DRY-RUN (jen vypíše). PROTECTED účty (admin/bot) přeskakuje.
//
// Použití (z import-tool s NODE_PATH):
//   1) JEDNORÁZOVĚ OSETÍ (zapamatuje si všechny SOUČASNÉ členy, NIKOHO nezařadí):
//        node praut-onboard-watch.cjs --seed --apply
//   2) BĚŽNÝ CHOD (cron) — nové členy zařadí jako vyvojar:
//        node praut-onboard-watch.cjs --apply
//      bez --apply = jen ukáže, co by udělal. Roli lze změnit: --role <role>.
globalThis.window = globalThis
globalThis.addEventListener = () => {}; globalThis.removeEventListener = () => {}; globalThis.dispatchEvent = () => false
globalThis.location = { href: 'https://huly.praut.cz/', protocol: 'https:', host: 'huly.praut.cz', origin: 'https://huly.praut.cz' }
try { Object.defineProperty(globalThis, 'navigator', { value: { userAgent: 'node', language: 'cs' }, configurable: true }) } catch (e) {}
try { Object.defineProperty(globalThis, 'localStorage', { value: undefined, configurable: true }) } catch (e) {}
const fs = require('fs')
const coreMod = require('@hcengineering/core'); const core = coreMod.default; const { TxOperations, Hierarchy } = coreMod
const { setMetadata } = require('@hcengineering/platform')
const scp = require('@hcengineering/server-client').default
const { createClient, getAccountClient } = require('@hcengineering/server-client')

const APPLY = process.argv.includes('--apply')
const SEED = process.argv.includes('--seed')
function arg (f) { const i = process.argv.indexOf(f); return i >= 0 ? process.argv[i + 1] : undefined }
function env (f) { const o = {}; for (const l of fs.readFileSync(f, 'utf8').split('\n')) { const m = l.match(/^([A-Z_]+)=(.*)$/); if (m) o[m[1]] = m[2].trim() } return o }
function clean (s) { return Array.from(s || '').filter((c) => c.charCodeAt(0) >= 32).join('').trim() }

const LEDGER = '/Users/stepan/praut/praut-onboard-watch-seen.json' // MIMO git
const SHARED = 'Firemní dokumentace HULY'
const LEAD_FUNNEL_ID = '6a3abfafb0b5c36dec2898f8'
const EMP_MIXIN = 'contact:mixin:Employee'
const PROTECTED_NAMES = ['huly-praut', 'huly-praut[bot]', 'Admin,Praut', 'Praut Admin']

// role → prostory (shodné s praut-onboard-user.cjs)
const ROLE = {
  vedeni:      { spaces: [SHARED, 'Vedení', 'Řízení a reporting', 'Obchodní dokumenty', 'Marketing', 'Obchod'], funnel: true },
  obchodnik:   { spaces: [SHARED, 'Obchod', 'Obchodní dokumenty'], funnel: true },
  marketak:    { spaces: [SHARED, 'Marketing'], funnel: false },
  vyvojar:     { spaces: [SHARED, 'PULS'], funnel: false },
  zamestnanec: { spaces: [SHARED], funnel: false }
}

function loadLedger () { try { return JSON.parse(fs.readFileSync(LEDGER, 'utf8')) } catch (e) { return null } }
function saveLedger (l) { if (APPLY) fs.writeFileSync(LEDGER, JSON.stringify(l, null, 2) + '\n') }

async function main () {
  const role = arg('--role') || 'vyvojar'
  const def = ROLE[role]
  if (!def) { console.log('Neznámá role:', role, '— povolené:', Object.keys(ROLE).join(', ')); process.exit(2) }

  const ledger = loadLedger()
  if (ledger === null && !SEED) {
    console.log('❌ Ledger neexistuje. Nejdřív jednorázově osej současné členy:')
    console.log('   node praut-onboard-watch.cjs --seed --apply')
    process.exit(2)
  }
  const seen = new Set((ledger && ledger.seen) || [])

  const s = env('/Users/stepan/praut/huly-poc-secrets.env')
  const cfg = await (await fetch('https://huly.praut.cz/config.json')).json(); setMetadata(scp.metadata.Endpoint, cfg.ACCOUNTS_URL)
  const { token, socialId } = await getAccountClient().login(s.ADMIN_EMAIL, s.ADMIN_PASSWORD); const ac = getAccountClient(token)
  const ws = (await ac.getUserWorkspaces()).filter((w) => w.url === 'praut'); const sel = await ac.selectWorkspace(ws[0].url)
  const conn = await createClient(sel.endpoint, sel.token, []); const c = new TxOperations(conn, socialId)
  const h = c.getHierarchy()

  const persons = await c.findAll('contact:class:Person', {})
  const sids = await c.findAll('contact:class:SocialIdentity', {})
  const spaces = await c.findAll('core:class:Space', {})

  // aktivní členové = osoba s účtem (personUuid) + Employee.active === true, mimo PROTECTED
  const members = persons.filter((p) => {
    if (!p.personUuid) return false
    if (PROTECTED_NAMES.includes(clean(p.name)) || PROTECTED_NAMES.includes(p.name)) return false
    if (!h.hasMixin(p, EMP_MIXIN)) return false
    return h.as(p, EMP_MIXIN).active === true
  })

  const ts = new Date().toISOString()
  console.log(`[${ts}] HLÍDAČ onboardingu | režim: ${SEED ? 'SEED' : 'WATCH'} | ${APPLY ? 'APPLY' : 'DRY-RUN'} | role nových: ${role}`)
  console.log(`Aktivních členů: ${members.length} | v ledgeru: ${seen.size}`)

  const fresh = members.filter((p) => !seen.has(p.personUuid))
  if (fresh.length === 0) { console.log('Žádný nový člen. Hotovo.'); await conn.close(); saveLedger({ seen: [...seen], updated: ts }); process.exit(0) }

  for (const p of fresh) {
    const sid = sids.find((x) => x.type === 'email' && x.attachedTo === p._id)
    const email = sid ? sid.value : '—'
    if (SEED) {
      console.log(`  osetí: ${clean(p.name)} (${email}) → zapamatováno, NEzařazuji`)
      seen.add(p.personUuid)
      continue
    }
    console.log(`  NOVÝ: ${clean(p.name)} (${email}) → zařazuji jako ${role}`)
    const targets = [...def.spaces]
    for (const nm of targets) {
      const sp = spaces.find((x) => clean(x.name) === clean(nm))
      if (!sp) { console.log(`     ! prostor "${nm}" nenalezen, přeskakuji`); continue }
      const has = (sp.members || []).includes(p.personUuid)
      console.log(`     ${has ? '= ' : '+ '}${clean(sp.name)}${has ? ' (už členem)' : ''}`)
      if (APPLY && !has) await c.update(sp, { members: [...(sp.members || []), p.personUuid] })
    }
    if (def.funnel) {
      const funnel = spaces.find((x) => x._id === LEAD_FUNNEL_ID)
      if (funnel) {
        const has = (funnel.members || []).includes(p.personUuid)
        console.log(`     ${has ? '= ' : '+ '}Pipeline (Lead funnel)${has ? ' (už členem)' : ''}`)
        if (APPLY && !has) await c.update(funnel, { members: [...(funnel.members || []), p.personUuid] })
      }
    }
    seen.add(p.personUuid)
  }

  saveLedger({ seen: [...seen], updated: ts })
  console.log(`\nRežim: ${APPLY ? 'APPLIED' : 'DRY-RUN (přidej --apply)'} | ledger: ${APPLY ? 'uložen' : 'NEuložen'} (${seen.size} účtů)`)
  await conn.close(); process.exit(0)
}
main().catch((e) => { console.error('ERR', e.stack || e.message); process.exit(1) })
