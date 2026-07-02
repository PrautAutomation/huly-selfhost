# T13 — Dotáhnout alert pravidla (automatizace)

**Tag:** HNED · **Priorita:** P2 · **Bolest:** ruční práce · **Závisí na:** —

## Cíl
Všech 7 navržených alert pravidel běží (alert-only) a je ověřeno, že upozornění reálně dorazí.

## Kontext
`tools/huly-admin/AUTOMATION_SETUP_MANUAL.md` popisuje 7 pravidel; inventura 2026-07-08 ukazuje 4 běžící procesy: „Nabídka uvízla ve schvalování", „Lead bez aktivity 7 dní", „SLA požadavku do 24 h", „Zakázka v riziku". Chybí tedy 3. Firemní rozhodnutí: všechna pravidla **alert-only** (žádné auto-akce). Není ověřeno, že alerty reálně chodí (kam — Inbox? kanál?).

## Co přesně udělat
1. Read-only: vypsat existující procesy (process:class:Process) + jejich definice; porovnat s manuálem — které 3 chybí a proč (manuál uvádí i UI-only omezení).
2. Doplnit chybějící přes `praut-build-processes.cjs` (rozšířit) nebo dle manuálu ručně v UI (pokud API nestačí) — zdokumentovat co šlo kudy.
3. **Test doručení:** vytvořit testovací entitu splňující podmínku (např. testovací lead se starým modifiedOn — POZOR: do testu, ne do ostrých dat; ideálně dočasný lead „TEST ALERT — smazat", po testu odstranit), ověřit, že alert dorazil, zdokumentovat KAM chodí.
4. Do dokumentace vedení zapsat tabulku: pravidlo → podmínka → komu chodí → jak reagovat.

## Nástroje a vzory
- `tools/huly-admin/praut-build-processes.cjs` + `AUTOMATION_SETUP_MANUAL.md`
- `tools/huly-admin/README.md` (stav automatizací)

## Ověření
- findAll procesů = 7 (nebo dokumentovaný důvod proč méně).
- Aspoň 1 alert prokazatelně doručen (screenshot/log) a zapsáno kam.
- Testovací data uklizena.

## Mantinely
- Alert-only. Žádné procesy, které samy mění data.
- Testovací entity jasně označené a po testu smazané (se souhlasem, jsou to ostrá DB data).
