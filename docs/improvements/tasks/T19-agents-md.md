# T19 — AGENTS.md v kořeni repa

**Tag:** HNED · **Priorita:** P2 · **Bolest:** konzistence (AI-only firma bez lokálních pravidel) · **Závisí na:** —

## Cíl
Kořen repa má `AGENTS.md` — každý AI agent zná lokální pravidla dřív, než něco spustí.

## Kontext
PRAUT ústava (globální CLAUDE.md) říká „přečti AGENTS.md aktuálního repa" — ale v `huly-selfhost` ŽÁDNÝ není (audit 2026-07-08). Roli částečně suplují `praut_erp_docs/AGENT_STATE.md` a memory, ale ty nejsou na kanonickém místě.

## Co přesně udělat
Napsat `AGENTS.md` (kořen repa) s tímto obsahem (zhustit, max ~100 řádků):
1. **Co tento repo je:** deployment config + admin tooling pro produkční Huly (huly.praut.cz); fork platformy je jinde (`HulyPrautplatform`).
2. **KRITICKÉ: auto-commit hook** — repo samo commituje každou editaci a na main pushuje → VŽDY nejdřív `git checkout -b feat/... && git push -u origin feat/...`, pak teprve editovat.
3. **Živá produkce:** workspace používá firma denně. Zápisy do workspace/DB jen po DRY-RUN výstupu odsouhlaseném Štěpánem. Skripty: vždy nejdřív bez `--apply`.
4. **Jak spouštět admin skripty:** z `HulyPrautplatform/dev/import-tool/` s `NODE_PATH="$PWD/node_modules"`; creds z `/Users/stepan/praut/huly-poc-secrets.env` (netisknout, necommitovat).
5. **Server:** SSH alias `huly`; po `docker compose up -d` VŽDY `docker compose restart nginx`; healthcheck na 127.0.0.1 (NAT hairpin).
6. **Tajemství:** jen v `huly_v7.conf` na serveru / `huly-poc-secrets.env` lokálně — nikdy do gitu.
7. **Zdroje pravdy:** `tools/huly-admin/README.md`, `praut_erp_docs/HULY_DECISIONS_AND_DEVIATIONS.md`, `docs/improvements/ROADMAP-2026-07.md`, `docs/CUSTOM-BUILD.md`, TROUBLESHOOTING_MATRIX (T18).
8. **PR pravidla:** conventional commits, `### AI metadata` sekce, nemergovat vlastní PR, max 5 iterací → handover.
9. Odkaz na CHANGELOG povinnost (T17).

## Nástroje a vzory
- Vzor struktury: `PrautAutomation/praut-example-summarizer` AGENTS.md (pokud dostupný), jinak globální ústava.

## Ověření
- `AGENTS.md` existuje v kořeni, obsahuje všech 9 bodů, žádná tajemství.
- Test: nový agent podle něj správně založí větev před editací (mentální průchod).

## Mantinely
- Stručnost — AGENTS.md je vstupní brána, detaily linkovat, nekopírovat.
