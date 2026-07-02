# T18 — Doplnit chybějící SOP

**Tag:** HNED · **Priorita:** P2 · **Bolest:** konzistence/kontinuita · **Závisí na:** —

## Cíl
Čtyři SOP, které audit označil jako MUST mezery, existují a jsou proveditelné bez znalosti historie projektu.

## Kontext
`praut_erp_docs/AUDIT_DOKUMENTACE_2026-06-23.md` (§ mezery) explicitně jmenuje chybějící: (1) souvislé **Rebuild-from-scratch SOP**, (2) **completion checklist** živého workspace, (3) **troubleshooting matrix**, (4) **SOP uživatelé/přístupy**. Většina obsahu existuje roztroušeně (runbooky, memory, README) — úkol je KONSOLIDACE, ne výzkum.

## Co přesně udělat
Do `praut_erp_docs/` (případně `docs/`) napsat:
1. **`SOP_REBUILD_FROM_SCRATCH.md`** — od prázdného serveru k běžící instanci: OS → docker → clone → `huly_v7.conf` (odkaz na template, kde vzít tajemství) → compose up → nginx restart → restore ze zálohy (`praut-restore-smoke.sh` vzor) → healthcheck. Zdroje: README, HULY_VPS_POC_RUNBOOK, MIGRATION-RUNBOOK, RUNBOOK-SERVER-DOWN.
2. **`SOP_UZIVATELE_A_PRISTUPY.md`** — pozvání, role (onboard skript), reset hesla (`praut-account-reset.cjs`), zamčený účet (OTP → DB unlock), offboarding 2-fáze, merge duplicit **včetně postupu na „Confirmed social identity is attached to the wrong person"** (2026-07-02: account-merge + přepojení workspace SocialIdentity.attachedTo). Zdroje: memory `huly-account-management`, skripty README.
3. **`TROUBLESHOOTING_MATRIX.md`** — tabulka příznak → příčina → fix: 502/„Unexpected token <" (nginx stale IP → restart nginx), webhook 404 (trailing slash), AccountMismatch (socialId v TxOperations), zamčený účet, „Confirmed social identity…", prázdný výběr prostoru (role v docspace), „Nelze sloučit globální osoby" (směr merge), NAT hairpin (healthcheck 000).
4. **`COMPLETION_CHECKLIST.md`** — co má živý workspace obsahovat (prostory, procesy, views, dokumenty, členství) — ověřitelné read-only inventurou; využít čísla z ROADMAP-2026-07.

## Nástroje a vzory
- Zdroje jsou v repu + memory adresáři projektu; NIC nevymýšlet — konsolidovat ověřené postupy.
- Formát: krok-za-krokem, copy-paste příkazy, bez tajemství (jen odkazy kde tajemství vzít).

## Ověření
- Každé SOP projde „testem cizince": člověk/agent bez kontextu podle něj postupuje bez zaseknutí (u rebuild SOP aspoň mentální průchod, u přístupů reálné dry-runy).
- AUDIT_DOKUMENTACE aktualizován — mezery MUST označené jako vyřešené s odkazy.

## Mantinely
- Žádná tajemství do dokumentů (tokeny, hesla, SECRET) — jen názvy proměnných a kde je najít.
- Neměnit existující runbooky — nové SOP na ně odkazují.
