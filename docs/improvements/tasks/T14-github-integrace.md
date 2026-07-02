# T14 — GitHub↔Huly dotažení

**Tag:** HNED · **Priorita:** P2 · **Bolest:** ruční práce · **Závisí na:** —

## Cíl
GitHub integrace je plně funkční (issues/PR se synchronizují) a tým ví, jak workflow PR↔issue používat.

## Kontext
Webhook 404 vyřešen (nginx trailing slash, PR #10 — vrací 200). Z memory `github-integration-state`: **zbývá ověřit account link** — diagnostika hlásila `workspaces:0` (GitHub App možná není propojená s workspace). Diagnostický skript existuje: `praut-github-check.cjs` (read-only). Docs: `docs/GITHUB-INTEGRATION-SETUP.md`.

## Co přesně udělat
1. Spustit `praut-github-check.cjs` — aktuální stav (App instalace, propojené repo, workspaces count).
2. Pokud `workspaces:0`: projít propojení v Huly UI (Nastavení→Integrace→GitHub) pod účtem, který App instaloval; podle `GITHUB-INTEGRATION-SETUP.md`. Kroky vyžadující UI/GitHub org admin → připravit přesný klikací postup pro Štěpána.
3. End-to-end test: propojit 1 tracker projekt s 1 repem (např. PULS ↔ vhodné repo v PrautAutomation — vybere Štěpán), vytvořit testovací issue, ověřit sync obou směrů.
4. Zapsat workflow do sdílené dokumentace pro vývojáře (doplnit do role návodu T09): jak se issue páruje s PR, co dělá magic word (`Fixes #`), co se synchronizuje.
5. Aktualizovat memory/dokumentaci o výsledném stavu.

## Nástroje a vzory
- `tools/huly-admin/praut-github-check.cjs` (read-only diagnostika)
- `docs/GITHUB-INTEGRATION-SETUP.md`
- Server: služba `github` v compose.yml (logy: `docker compose logs github`)

## Ověření
- `praut-github-check.cjs` hlásí propojený workspace (workspaces ≥ 1).
- Testovací issue se objeví na obou stranách; změna stavu se propíše.
- Workflow zdokumentován.

## Mantinely
- Nepropojovat hromadně všechna repa — jen 1 pilotní po schválení.
- Na server (logy) jen read-only; GitHub App nastavení mění Štěpán (org admin).
