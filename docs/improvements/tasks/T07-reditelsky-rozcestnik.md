# T07 — Ředitelský rozcestník „Přehled firmy"

**Tag:** HNED · **Priorita:** P2 · **Bolest:** přehled/reporting · **Závisí na:** T06 (odkazuje na týdenní reporty)

## Cíl
Jeden dokument „🏠 Přehled firmy", ze kterého se ředitel doklikne na všechno podstatné do 2 kliknutí.

## Kontext
Huly nemá dashboard; navigace po modulech je pro netechnického ředitele zdlouhavá. FilteredViews už částečně existují (7 views z `praut-build-views.cjs`); tři views nešly postavit („Bez vlastníka", „Moje", „Obnovy do 60 dní" — pole jsou TypeString místo Ref/Date, oprava = code-level, viz T22).

## Co přesně udělat
1. Dokument `🏠 Přehled firmy` v „Řízení a reporting" (generovat skriptem, vzor quickstart): sekce Obchod (odkaz na funnel + CardSpace Obchod), Projekty (PULS, aktivní views), Lidé (Contacts, HR), Reporty (poslední týdenní přehledy), Dokumentace (klíčové návody). Huly podporuje interní odkazy — použít URL formát `https://huly.praut.cz/workbench/praut/...` (ověřit reálné URL z UI).
2. Zrevidovat existující FilteredViews (`praut-build-views.cjs` — read-only kontrola, že fungují) a doplnit ty, které jdou (např. „Issues In Progress podle projektu").
3. Do dokumentu explicitně zapsat, co zatím NEJDE a čeká na nový server (views blokované TypeString) — ať ředitel ví, co přijde.

## Nástroje a vzory
- `tools/huly-admin/praut-quickstart-doc.cjs`, `praut-create-guide.cjs` (vzor HOME dokumentu)
- `tools/huly-admin/praut-build-views.cjs` + jeho README sekce „Nedotaženo"

## Ověření
- Štěpán projde dokument a doklikne se na každou položku (žádný mrtvý odkaz).
- Dokument je v privátním „Řízení a reporting".

## Mantinely
- Odkazy ověřit ručně v UI (URL formát Huly se může lišit per modul) — žádné slepé odkazy.
- Bez zásahů do dat, jen dokument + případné views (po dry-runu).
