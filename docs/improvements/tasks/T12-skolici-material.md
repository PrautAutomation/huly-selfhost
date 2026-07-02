# T12 — Školicí materiál „Huly za 30 minut"

**Tag:** HNED · **Priorita:** P3 · **Bolest:** lidi neví jak · **Závisí na:** T09 (staví na role návodech)

## Cíl
Hotový podklad pro živé školení týmu: 30minutová osnova + cvičení, uložené v Huly (Trainings/sdílená dokumentace).

## Kontext
Štěpán plánuje školení zaměstnanců na Huly (červenec 2026, kalendářová událost). Prostor „Trainings" (core:class:TypedSpace, autoJoin, 10 členů) je prázdný/nevyužitý. Materiál musí být pro netechnické publikum.

## Co přesně udělat
1. Dokument `🎓 Školení Huly za 30 minut` (sdílená dokumentace nebo Trainings — ověřit, zda Trainings modul umí dokumenty; jinak sdílená dokumentace):
   - Osnova: 5 min proč Huly → 10 min Tracker (založ úkol, posuň stav) → 5 min Dokumenty a hledání → 5 min Chat + Inbox → 5 min otázky.
   - Ke každému bloku 1 praktické cvičení (např. „založ úkol ,Zkouška — tvé jméno' a přiřaď si ho").
   - Tahák nejčastějších úkonů (tabulka: chci X → kliknu Y).
2. Cvičný tracker projekt `SKOLENI` (public), kam účastníci zakládají zkušební úkoly — po školení se archivuje.
3. Checklist lektora (co promítnout, v jakém pořadí, co zkontrolovat po školení).

## Nástroje a vzory
- `tools/huly-admin/praut-quickstart-doc.cjs` (dokument), `praut-create-spaces.cjs` (vzor založení prostoru)
- Obsahové zdroje: Rychlý start, role návody (T09)

## Ověření
- Materiál projde „test brigádníka": člověk bez znalosti Huly podle něj zvládne cvičení.
- Cvičný projekt SKOLENI existuje a je oddělený od ostrých projektů.

## Mantinely
- Cvičný projekt jasně označit (název + popis „cvičné, bude archivováno") — ať se v něm nezakládá ostrá práce.
