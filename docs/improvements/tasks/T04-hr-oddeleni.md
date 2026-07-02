# T04 — Sjednotit HR oddělení

**Tag:** HNED · **Priorita:** P2 · **Bolest:** chaos v datech · **Závisí na:** T01 (ať se nečlení duplicitní osoby)

## Cíl
HR modul odpovídá skutečné struktuře firmy — žádná zdvojená oddělení, členství jen aktivní zaměstnanci.

## Kontext
Inventura 2026-07-08, `hr:class:Department`: „Vývojové oddělení" (4) **a zároveň** „IT development" (4) — zjevná duplicita; „Designové oddělení" (1), „Marketingové oddělení" (1), „PRAUT" (15 — obsahuje i neaktivní/bývalé). Role ve firmě dle `praut-onboard-user.cjs`: vedeni / obchodnik / marketak / vyvojar / zamestnanec.

## Co přesně udělat
1. Read-only výpis oddělení + členů (jméno, active).
2. Navrhnout cílovou strukturu (odsouhlasí Štěpán), např.: PRAUT (kořen) → Vývoj, Marketing, Obchod, Vedení. Design sloučit pod Vývoj nebo nechat — rozhodne Štěpán.
3. Sloučit „Vývojové oddělení" + „IT development" (přesunout členy, druhé smazat/archivovat).
4. Z kořene „PRAUT" odebrat neaktivní osoby (bývalé zaměstnance).
5. Zdokumentovat: kdo je vedoucí kterého oddělení (department.teamLead pokud existuje atribut).

## Nástroje a vzory
- Připojovací boilerplate z `tools/huly-admin/praut-*.cjs`; hr:class:Department se edituje přes `client.update`.
- Mapa rolí: `tools/huly-admin/praut-onboard-user.cjs` (ROLE konstanta).

## Ověření
- findAll Department: žádné dvě oddělení se stejným účelem; členové = jen aktivní zaměstnanci.
- Struktura schválená Štěpánem zapsaná v dokumentaci (sdílený teamspace).

## Mantinely
- Zápisy po odsouhlaseném dry-runu.
- HR modul může vázat dovolené/docházku — před smazáním oddělení ověřit, že na něm nevisí žádné žádosti (findAll hr request tříd).
