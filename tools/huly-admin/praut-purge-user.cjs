// TRVALÝ OKAMŽITÝ VÝMAZ zaměstnance z workspace (bez 60denní grace).
// Smaže contact:class:Person kartu + její contact:class:SocialIdentity dokumenty.
// Cílí VÝHRADNĚ podle konkrétních person _id (žádné mazání podle jména).
// Pojistky: odmítne osobu, která má přiřazené issues nebo je členem prostoru,
// a chráněná jména (boti/admin). Účtová DB se maže zvlášť SQL na serveru (viz --sql).
//
//   node praut-purge-user.cjs <personId> [<personId2> ...]           DRY-RUN
//   node praut-purge-user.cjs <personId> ... --apply                  provede
//   node praut-purge-user.cjs <personId> ... --sql                    vypíše i DB SQL
globalThis.window = globalThis
globalThis.addEventListener = () => {}; globalThis.removeEventListener = () => {}; globalThis.dispatchEvent = () => false
globalThis.location = { href: 'https://huly.praut.cz/', protocol: 'https:', host: 'huly.praut.cz', origin: 'https://huly.praut.cz' }
try { Object.defineProperty(globalThis, 'navigator', { value: { userAgent: 'node', language: 'cs' }, configurable: true }) } catch (e) {}
try { Object.defineProperty(globalThis, 'localStorage', { value: undefined, configurable: true }) } catch (e) {}
const fs = require('fs')
const coreMod = require('@hcengineering/core'); const { TxOperations } = coreMod
const { setMetadata } = require('@hcengineering/platform')
const scp = require('@hcengineering/server-client').default
const { createClient, getAccountClient } = require('@hcengineering/server-client')

const APPLY = process.argv.includes('--apply')
const SHOW_SQL = process.argv.includes('--sql')
const PROTECTED_NAMES = ['huly-praut', 'huly-praut[bot]', 'Admin,Praut', 'Praut Admin']
function env (f) { const o = {}; for (const l of fs.readFileSync(f, 'utf8').split('\n')) { const m = l.match(/^([A-Z_]+)=(.*)$/); if (m) o[m[1]] = m[2].trim() } return o }
function clean (s) { return Array.from(s || '').filter((c) => c.charCodeAt(0) >= 32).join('').trim() }

async function main () {
  const ids = process.argv.slice(2).filter((a) => !a.startsWith('--'))
  if (!ids.length) { console.log('Zadej jeden nebo více person _id. (DRY-RUN; --apply provede; --sql vypíše DB SQL)'); process.exit(2) }
  const s = env('/Users/stepan/praut/huly-poc-secrets.env')
  const cfg = await (await fetch('https://huly.praut.cz/config.json')).json(); setMetadata(scp.metadata.Endpoint, cfg.ACCOUNTS_URL)
  const { token, socialId } = await getAccountClient().login(s.ADMIN_EMAIL, s.ADMIN_PASSWORD); const ac = getAccountClient(token)
  const ws = (await ac.getUserWorkspaces()).filter((w) => w.url === 'praut'); const sel = await ac.selectWorkspace(ws[0].url)
  const conn = await createClient(sel.endpoint, sel.token, []); const c = new TxOperations(conn, socialId)

  const persons = await c.findAll('contact:class:Person', {})
  const sids = await c.findAll('contact:class:SocialIdentity', {})
  const issues = await c.findAll('tracker:class:Issue', {})
  const spaces = await c.findAll('core:class:Space', {})
  console.log(`Mode: ${APPLY ? 'APPLY (TRVALÝ VÝMAZ)' : 'DRY-RUN'}\n`)

  const uuidsForSql = []
  for (const id of ids) {
    const p = persons.find((x) => x._id === id)
    if (!p) { console.log(`  ! person _id ${id} nenalezen — přeskakuji`); continue }
    const name = clean(p.name)
    // pojistky
    if (PROTECTED_NAMES.includes(name) || PROTECTED_NAMES.includes(p.name)) { console.log(`  ⛔ "${name}" je chráněný — ODMÍTÁM`); continue }
    const assigned = issues.filter((i) => i.assignee === p._id)
    const memberOf = spaces.filter((sp) => (sp.members || []).includes(p.personUuid))
    if (assigned.length || memberOf.length) {
      console.log(`  ⛔ "${name}" má ${assigned.length} přiřazených úkolů a je v ${memberOf.length} prostorech — ODMÍTÁM (nejdřív offboard/přeřaď).`)
      continue
    }
    const mySids = sids.filter((x) => x.attachedTo === p._id)
    console.log(`  🗑  "${name}" _id=${p._id} personUuid=${p.personUuid || '—'}`)
    console.log(`      social identity: ${mySids.length} (${mySids.map((x) => x.type + ':' + x.value).join(', ') || 'žádné'})`)
    if (p.personUuid) uuidsForSql.push(p.personUuid)
    if (APPLY) {
      for (const sid of mySids) await c.removeDoc(sid._class, sid.space, sid._id)
      await c.removeDoc(p._class, p.space, p._id)
      console.log('      → SMAZÁNO (Person + social identity)')
    }
  }
  console.log(`\nRežim: ${APPLY ? 'APPLIED' : 'DRY-RUN → pro výmaz přidej --apply'}`)
  if (SHOW_SQL && uuidsForSql.length) {
    const list = uuidsForSql.map((u) => `'${u}'`).join(',')
    console.log('\n--- Účtová DB (spusť na serveru přes ssh huly) ---')
    console.log(`docker compose exec -T cockroach ./cockroach sql --certs-dir=certs --host=127.0.0.1:26257 --database=defaultdb -e "DELETE FROM global_account.social_id WHERE person_uuid IN (${list}); DELETE FROM global_account.person WHERE uuid IN (${list});"`)
  }
  await conn.close(); process.exit(0)
}
main().catch((e) => { console.error('ERR', e.stack || e.message); process.exit(1) })
