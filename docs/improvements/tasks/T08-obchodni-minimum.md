# T08 — Obchodní pipeline: návod a šablony

**Tag:** HNED · **Priorita:** P2 · **Bolest:** přehled (obchod nemá data) · **Závisí na:** —

## Cíl
Obchodní proces má psaný návod + šablony, aby pipeline žila (dnes jen 3 leady) a vedení vidělo reálný stav obchodu.

## Kontext
Funnel „Potencionální zákazník" (privátní, vedení) má počeštěné fáze (Zájemce→Kvalifikace→Vyjednávání→Příprava nabídky→Rozhodování→Uzavření→Vyhráno/Prohráno, `praut-lead-setup.cjs`), ale jen 3 leady. Obchodní karty (Příležitost/Nabídka/Zakázka) jsou v privátním CardSpace „Obchod" (5 karet). Řetěz dle plánu: lead → nabídka → zakázka → faktura. Roli `obchodnik` zatím nikdo nemá.

## Co přesně udělat
1. Dokument `📈 Jak vedeme obchod` do „Obchodní dokumenty" (privátní, vedení): kdy vzniká lead, kdo ho zakládá, co znamená každá fáze, kdy se lead překlápí do karty Nabídka → Zakázka, kdo co aktualizuje a jak často (min. 1× týdně), pravidlo „lead bez aktivity 7 dní = alert" (proces už běží).
2. Šablony: text šablony pro kartu Nabídka a Zakázka (povinná pole: klient, hodnota, termín, vlastník) — jako `templates` v Huly nebo aspoň vzorová karta „ŠABLONA — kopíruj mě".
3. Návrh číslování nabídek (např. `N-2026-001`) — jen konvence do návodu (vynucení = nový server).
4. Ověřit, že nové obchodní karty vznikají v prostoru „Obchod" a ne v „Default" (známý problém z memory: default space) — popsat správný postup v návodu.

## Nástroje a vzory
- `tools/huly-admin/praut-quickstart-doc.cjs` (dokument), `praut-restrict-obchod.cjs` (kontext obchodní izolace)
- `tools/huly-admin/praut-lead-setup.cjs` (fáze funnelu)

## Ověření
- Dokument existuje v „Obchodní dokumenty", srozumitelný pro nového obchodníka (test: přečte a založí zkušební lead správně).
- Šablonové karty existují v prostoru „Obchod".

## Mantinely
- Vše do PRIVÁTNÍCH prostorů (obchodní data vidí jen vedení/obchod — rozhodnutí z PR #23).
- Nezakládat reálné leady/karty za obchod — jen šablony a návod.
