# T06 — Týdenní automatický report pro vedení

**Tag:** HNED · **Priorita:** P1 · **Bolest:** přehled/reporting + ruční práce · **Závisí na:** —

## Cíl
Každé pondělí ráno je v teamspace „Řízení a reporting" čerstvý dokument „Týdenní přehled" — ředitel vidí stav firmy bez klikání po modulech.

## Kontext
Ředitel nemá rychlý přehled (hlavní bolest). Huly v0.7.423 nemá dashboard modul → nejpraktičtější je generovaný dokument. Ověřený vzor: `praut-quickstart-doc.cjs` vytváří dokument s HTML obsahem (idempotentně, přepíše dle názvu).

## Co přesně udělat
1. Nový skript `tools/huly-admin/praut-weekly-report.cjs` (DRY-RUN → `--apply`). Sesbírá findAll dotazy:
   - **Projekty:** per tracker projekt: otevřené/zavřené issues, kolik bez vlastníka, co se zavřelo za posledních 7 dní, co je In Progress (s vlastníky).
   - **Obchod:** leady per stav funnelu („Potencionální zákazník"), nové karty Nabídka/Zakázka za týden (CardSpace „Obchod").
   - **Lidé:** počet aktivních zaměstnanců, noví/odešlí za týden.
   - **Red flags:** issues In Progress bez vlastníka, leady bez aktivity (modifiedOn > 7 dní), procesy co vyhodily alert.
2. Vygeneruje dokument `📊 Týdenní přehled — YYYY-MM-DD` do „Řízení a reporting" (HTML content, tabulky). Starší přehledy nechává (historie).
3. Wrapper `.sh` pro cron (vzor: `scripts/praut-healthcheck.sh` + `ops/praut-root.crontab`): pondělí 07:00. Cron zatím na Macu Štěpána NEBO na VPS (rozhodne Štěpán — na VPS potřebuje nasadit node prostředí import-tool, což tam dnes není → pokud VPS, popsat postup; jednodušší = Mac).
4. Zápis do `tools/huly-admin/README.md`.

## Nástroje a vzory
- `tools/huly-admin/praut-quickstart-doc.cjs` (generování dokumentu — createDoc s content)
- `tools/huly-admin/praut-onboard-user.cjs` (boilerplate připojení)
- `ops/praut-root.crontab` (vzor cron zápisu)

## Ověření
- Dry-run vytiskne kompletní report do konzole (bez zápisu).
- Po `--apply` je dokument vidět v „Řízení a reporting" (členové: vedení), obsahuje všechny 4 sekce s reálnými čísly.
- Cron nainstalovaný a otestovaný jedním ručním spuštěním wrapperu.

## Mantinely
- Dokument jde do PRIVÁTNÍHO teamspace „Řízení a reporting" (vidí jen vedení) — nedávat do sdílené dokumentace (obsahuje obchodní čísla).
- Jen čtení dat + vytvoření dokumentu; žádné jiné zápisy.
