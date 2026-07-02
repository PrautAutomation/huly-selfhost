# T03 — Tracker hygiena

**Tag:** HNED · **Priorita:** P2 · **Bolest:** chaos v datech · **Závisí na:** —

## Cíl
Tracker odpovídá realitě: každý otevřený úkol má vlastníka, dokončené projekty jsou uzavřené.

## Kontext
Inventura 2026-07-08: **DASTA_PREVOD** 34 issues, 33 done/cancelled, 33 bez vlastníka → projekt vypadá dokončený. **PULS** 11 issues, 7 bez vlastníka. Pravidlo firmy (OPERATIVNI_MODEL): každá práce = issue s vlastníkem a termínem.

## Co přesně udělat
1. Read-only výpis: všechny issues per projekt se stavem, vlastníkem, stářím.
2. **DASTA_PREVOD:** potvrdit se Štěpánem, že je hotový → archivovat projekt (archived=true). Zbylý 1 otevřený issue: dořešit vlastníka nebo zavřít.
3. **PULS:** 7 otevřených issues bez vlastníka — vypsat seznam, Štěpán/vedoucí přiřadí (agent připraví tabulku, přiřazení provede skriptem po schválení).
4. Zavést psané pravidlo do sdílené dokumentace (doplnit do „🚀 Rychlý start"): *issue ve stavu In Progress musí mít vlastníka*; volitelně navrhnout alert proces (vzor `praut-build-processes.cjs`, alert-only).

## Nástroje a vzory
- `tools/huly-admin/praut-clean-tracker.cjs` (vzor práce s Tracker daty)
- `tools/huly-admin/praut-build-processes.cjs` (alert-only procesy)
- `tools/huly-admin/praut-quickstart-doc.cjs` (úprava dokumentu Rychlý start)

## Ověření
- findAll Issue: 0 otevřených issues bez vlastníka (nebo explicitní seznam výjimek schválený Štěpánem).
- DASTA_PREVOD archivovaný (pokud potvrzeno), jeho issues zachované.
- Pravidlo je v dokumentu Rychlý start.

## Mantinely
- Issues NEmazat, NEzavírat bez souhlasu — jen přiřazovat/archivovat po schválení.
- Alert procesy jen alert-only (žádné auto-akce) — firemní rozhodnutí.
