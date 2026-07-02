# T05 — Diakritika importovaných dokumentů

**Tag:** HNED · **Priorita:** P3 · **Bolest:** chaos v datech · **Závisí na:** —

## Cíl
Názvy a obsah ~80 importovaných dokumentů mají správnou českou diakritiku.

## Kontext
`praut_erp_docs/PRAUT_REMAINING_WORK.md` eviduje: ~80 dokumentů importovaných bez diakritiky (ASCII transliterace z hromadného importu). Zdroje s diakritikou existují v `praut_erp_docs/huly_unified_import/` (94 souborů).

## Co přesně udělat
1. Read-only: vypiš všechny `document:class:Document` (title + space), označ ty s podezřením na chybějící diakritiku (heuristika: české slovo bez háčků/čárek — porovnej proti zdrojovým .md souborům).
2. Spáruj dokument ↔ zdrojový soubor (podle titulu/slugu).
3. Návrh oprav (tabulka starý → nový titul; u obsahu diff) → schválení Štěpánem.
4. Oprava skriptem: title přes `updateDoc`, obsah přes `content` pole (vzor `praut-quickstart-doc.cjs` — smazat+vytvořit, POZOR: zachovat _id/odkazy když jde jen o update títulu; obsah přepisovat jen tam, kde je zdroj jednoznačný).

## Nástroje a vzory
- `tools/huly-admin/praut-quickstart-doc.cjs` (práce s dokumenty, HTML content)
- Zdroj pravdy: `praut_erp_docs/huly_unified_import/`

## Ověření
- Náhodný vzorek 10 dokumentů: titul i obsah s diakritikou, odpovídá zdrojovému .md.
- Žádný dokument neztratil obsah (počty dokumentů před = po).

## Mantinely
- Přepisovat obsah JEN kde je jednoznačný zdrojový soubor; jinak jen titul.
- Dry-run tabulka → schválení → apply. Dokumenty vytvořené ručně týmem (ne importem) NEupravovat.
