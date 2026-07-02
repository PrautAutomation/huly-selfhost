# ROADMAPA vylepšení Huly ERP — červenec 2026

> Výstup kompletního auditu (repo + dokumentace + živý workspace, 2026-07-08).
> Každý úkol má soběstačné zadání v `docs/improvements/tasks/T##-*.md` — předatelné AI agentovi rovnou.
> Zadal: Štěpán Manda (ředitel). Priority odpovídají jeho čtyřem bolestem:
> **(1) přehled/reporting, (2) chaos v datech, (3) lidi neví jak, (4) ruční práce.**

## Stav k 2026-07-08 (inventura živého workspace)

- 18 osob (9 aktivních zaměstnanců, 6 neaktivních), 4 firmy, **2 duplicitní osoby** (Švanda Martin 2×, Hoyer 2× — stará karta)
- 102 dokumentů (69 ve sdílené dokumentaci), 21 karet, **jen 3 leady**, 4 alert procesy
- Tracker: PULS 11 issues (7 bez vlastníka), DASTA_PREVOD 34 issues (33 done, 33 bez vlastníka), Default 4
- Mrtvé prostory: teamspace „Předání dokumentů" (0 dokumentů/0 členů), teamspace „Vedení" (0 dokumentů), Board „Default" (0 členů)
- Kanál `praut-denni-prehled`: **1 člen** — denní rytmus nefunguje
- HR oddělení zdvojená: „Vývojové oddělení" vs „IT development"

## Tabulka úkolů

| ID | Úkol | Bolest | Tag | Priorita | Závislosti |
|----|------|--------|-----|----------|------------|
| [T01](tasks/T01-merge-duplicit-osob.md) | Dokončit merge duplicit osob | chaos | HNED | P1 | T15 |
| [T02](tasks/T02-uklid-mrtvych-prostoru.md) | Úklid mrtvých/prázdných prostorů | chaos | HNED | P1 | — |
| [T03](tasks/T03-tracker-hygiena.md) | Tracker hygiena (vlastníci, archiv DASTA) | chaos | HNED | P2 | — |
| [T04](tasks/T04-hr-oddeleni.md) | Sjednotit HR oddělení | chaos | HNED | P2 | T01 |
| [T05](tasks/T05-diakritika-dokumentu.md) | Diakritika ~80 importovaných dokumentů | chaos | HNED | P3 | — |
| [T06](tasks/T06-tydenni-report.md) | Týdenní automatický report pro vedení | přehled + ruční práce | HNED | P1 | — |
| [T07](tasks/T07-reditelsky-rozcestnik.md) | Ředitelský rozcestník „Přehled firmy" | přehled | HNED | P2 | T06 |
| [T08](tasks/T08-obchodni-minimum.md) | Obchodní pipeline — návod a šablony | přehled | HNED | P2 | — |
| [T09](tasks/T09-navody-per-role.md) | Návody per role v Huly | lidi neví jak | HNED | P1 | — |
| [T10](tasks/T10-denni-rytmus.md) | Oživit denní rytmus (kanál + ritual) | lidi neví jak | HNED | P1 | T06 |
| [T11](tasks/T11-onboarding-checklist.md) | Onboarding checklist nováčka | lidi neví jak | HNED | P2 | T09 |
| [T12](tasks/T12-skolici-material.md) | Školicí materiál „Huly za 30 minut" | lidi neví jak | HNED | P3 | T09 |
| [T13](tasks/T13-alert-pravidla.md) | Dotáhnout 7 alert pravidel | ruční práce | HNED | P2 | — |
| [T14](tasks/T14-github-integrace.md) | GitHub↔Huly dotažení | ruční práce | HNED | P2 | — |
| [T15](tasks/T15-zachrana-skriptu-pr16.md) | Zachránit skripty z PR #16 na main | konzistence | HNED | P1 | — |
| [T16](tasks/T16-pr-spec-invite-roles.md) | Otevřít PR pro spec invite rolí | konzistence | HNED | P1 | — |
| [T17](tasks/T17-denik-changelog.md) | Opravit deník + zavést change log | konzistence | HNED | P2 | — |
| [T18](tasks/T18-chybejici-sop.md) | Doplnit chybějící SOP (rebuild, troubleshooting, přístupy) | konzistence | HNED | P2 | — |
| [T19](tasks/T19-agents-md.md) | AGENTS.md v kořeni repa | konzistence | HNED | P2 | — |
| [T20](tasks/T20-bezpecnostni-uklid.md) | Bezpečnostní úklid (tokeny, gh.pem, gitleaks) | bezpečnost | HNED | P1 | — |
| [T21](tasks/T21-spec-noveho-serveru.md) | Rozhodnutí + spec nového serveru | infrastruktura | NOVÝ SERVER | P2 | — |
| [T22](tasks/T22-build-featury.md) | Balík build featur (invite role, Love, push, AI…) | vše | NOVÝ SERVER | P3 | T21 |

## Doporučené pořadí

1. **Vlna 1 (P1, HNED):** T15 → T16 → T20 (repo/bezpečnost) souběžně s T02, T06, T09, T10 (viditelné zlepšení pro tým). Pak T01 (potřebuje T15).
2. **Vlna 2 (P2, HNED):** T03, T04, T07, T08, T11, T13, T14, T17, T18, T19.
3. **Vlna 3 (P3, HNED):** T05, T12.
4. **Nový server:** T21 (rozhodnutí, může běžet už teď jako dokument), T22 (realizace po migraci).

## Pravidla pro agenty (platí pro KAŽDÝ úkol)

1. **Feature větev + `git push -u` PŘED prvním zápisem** — repo má auto-commit hook, který jinak pushuje na main.
2. **Zápisy do živého workspace jen se souhlasem Štěpána** — vždy nejdřív DRY-RUN (skripty bez `--apply`), ukázat výstup, čekat na potvrzení.
3. Admin skripty se spouští z `HulyPrautplatform/dev/import-tool/` s `NODE_PATH="$PWD/node_modules"`; přihlášení čtou z `/Users/stepan/praut/huly-poc-secrets.env` (nikdy netisknout, nikdy necommitovat).
4. Git hooky = stop sign. Žádný `--no-verify`, žádné obcházení.
5. PR musí mít sekci `### AI metadata` (Model/Spec/Plan/Iterace/Confidence/Cost).
6. Po max 5 iteracích STOP → handover do `docs/handovers/` + label `needs-human`.
7. Server: po `docker compose up -d` vždy `docker compose restart nginx`.
8. Zdroje pravdy: `tools/huly-admin/README.md` (nástroje), `praut_erp_docs/HULY_DECISIONS_AND_DEVIATIONS.md` (rozhodnutí), `docs/CUSTOM-BUILD.md` (build z forku), `docs/MIGRATION-RUNBOOK.md` (migrace).
