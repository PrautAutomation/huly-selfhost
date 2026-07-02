# T17 — Opravit deník + zavést change log

**Tag:** HNED · **Priorita:** P2 · **Bolest:** konzistence repa · **Závisí na:** —

## Cíl
`VYVOJOVY_DENIK.md` nemate nového čtenáře; existuje jednoduchý CHANGELOG s milníky.

## Kontext
Audit 2026-07-08: úvod `praut_erp_docs/VYVOJOVY_DENIK.md` stále tvrdí „jsme ve fázi přípravy kontrolovaného testu / ještě nejde o produkční provoz", zatímco systém od června produkčně běží a firma v něm pracuje. Audit dokumentace (`AUDIT_DOKUMENTACE_2026-06-23.md`) navíc mezi mezerami uvádí chybějící change log.

## Co přesně udělat
1. Přepsat úvod deníku: aktuální stav (produkční provoz od 2026-06, URL, workspace, kdo systém používá), zachovat historické zápisy beze změny (deník je historie — needitovat staré záznamy).
2. Založit `praut_erp_docs/CHANGELOG.md`: zpětně doplnit milníky z git historie a deníku (šablona: datum — co se změnilo — PR #). Milníky min.: zprovoznění, SMTP (#13), push config (#14), monitoring (#15), offboarding (#21), restrict obchod (#23), onboarding role (#24), quickstart (#25), oprava René (2026-07-02).
3. Do `AGENTS.md` (T19) přidat pravidlo: každá produkční změna = řádek do CHANGELOG.

## Nástroje a vzory
- `git log --oneline main` + `gh pr list --state merged` (zdroje milníků)
- `praut_erp_docs/VYVOJOVY_DENIK.md`, `AUDIT_DOKUMENTACE_2026-06-23.md`

## Ověření
- Úvod deníku odpovídá realitě (zkontroluje Štěpán).
- CHANGELOG.md obsahuje všechny mergnuté PR milníky s daty.

## Mantinely
- Historické zápisy deníku NEupravovat — jen úvod/hlavičku.
- Žádná tajemství do CHANGELOG (je součást repa).
