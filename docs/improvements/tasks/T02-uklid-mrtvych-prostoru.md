# T02 — Úklid mrtvých/prázdných prostorů

**Tag:** HNED · **Priorita:** P1 · **Bolest:** chaos v datech · **Závisí na:** —

## Cíl
V levém menu nezůstane žádný prázdný/mrtvý prostor, který mate tým.

## Kontext
Inventura 2026-07-08 našla:
- teamspace **„Předání dokumentů"** — 0 dokumentů, 0 členů (mrtvý)
- teamspace **„Vedení"** — 0 dokumentů, 5 členů (založený, nikdy nenaplněný — vedení reálně píše do „Řízení a reporting" a „Obchodní dokumenty")
- board **„Default"** — 0 členů (nepoužívaný modul Board)
- tracker **„Default"** — 4 issues, public, autoJoin (překrývá se s PULS)
- documents:class:OrgSpace „Předání pracovních dokumentů" (5 členů) a „Quality documents" — prověřit, zda se používají

## Co přesně udělat
1. Read-only inventura obsahu každého kandidáta (findAll dokumentů/karet/issues per space) — nic nesmí zmizet s obsahem.
2. Navrhni Štěpánovi per prostor: **archivovat** (prázdné) / **naplnit** (má-li smysl) / **nechat**. U „Vedení" doporučení: archivovat a nechat vedení v „Řízení a reporting" (méně prostorů = přehledněji), NEBO přesunout tam dokumenty vedení — rozhodne Štěpán.
3. Po schválení archivuj (`archived=true`, NE mazat) skriptem dle vzoru `praut-archive-junk.cjs`.
4. U tracker „Default": 4 issues přesunout do PULS nebo ponechat jako obecný „Ostatní" — rozhodne Štěpán; pokud zůstane, přejmenovat na srozumitelný název (např. „Ostatní úkoly").

## Nástroje a vzory
- `tools/huly-admin/praut-archive-junk.cjs` (vzor archivace, DRY-RUN → `--apply`)
- `tools/huly-admin/praut-spaces-list.cjs` (read-only přehled)
- Připojovací boilerplate: kterýkoli `praut-*.cjs` (globalThis shim + login + TxOperations se `socialId`)

## Ověření
- Inventura po zásahu: žádný prostor s 0 dokumenty/0 členy nearchivovaný (kromě systémových core:class:SystemSpace — ty nechat být).
- Nic nebylo smazáno — jen archivováno/přejmenováno/přesunuto; počty dokumentů/issues před = po.

## Mantinely
- ARCHIVOVAT, ne mazat. Archivace je vratná.
- Systémové prostory (core:class:SystemSpace, Personal space, template kategorie) NEřešit.
- Každý `--apply` po odsouhlaseném dry-runu.
