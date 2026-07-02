# T21 — Rozhodnutí + specifikace nového serveru

**Tag:** NOVÝ SERVER (rozhodovací dokument jde napsat HNED) · **Priorita:** P2 · **Bolest:** infrastruktura/otevřená rozhodnutí · **Závisí na:** —

## Cíl
Jeden ADR dokument, který uzavře všechna otevřená rozhodnutí kolem nového serveru — migrace pak může začít bez debat.

## Kontext
`HULY_DECISIONS_AND_DEVIATIONS.md` eviduje **otevřená rozhodnutí**: specifikace nového serveru + lokální AI engine, SSO/OIDC, backup RPO/RTO, vlastní mailboxy. Navíc audit našel **rozpor**: DECISIONS říká „video = self-hosted LiveKit na novém serveru", ale PR #16 konfiguruje LiveKit **Cloud**. Plán migrace existuje (`docs/MIGRATION-RUNBOOK.md`), build z forku popsán (`docs/CUSTOM-BUILD.md`).

## Co přesně udělat
Napsat `praut_erp_docs/ADR_NOVY_SERVER.md` (rozhoduje Štěpán, agent připraví podklady s doporučením a cenami):
1. **HW/hosting:** požadavky Huly stacku + lokální LLM (GPU? kolik VRAM pro jaký model?) + LiveKit; varianty (dedikovaný server vs výkonný VPS) s měsíčními náklady.
2. **Topologie:** vše na jednom stroji vs. LLM/LiveKit odděleně; dopad na síť/latenci/zálohy.
3. **LiveKit: VYŘEŠIT ROZPOR** — self-hosted (rozhodnuto v DECISIONS) vs Cloud (nakonfigurováno v PR #16). Doporučení + úprava PR #16 podle výsledku.
4. **Backup RPO/RTO:** kolik dat smíme ztratit (např. 24 h dnes) a jak rychle obnovit; off-site záloha (dnes zálohy jen na tomtéž VPS!).
5. **SSO/OIDC:** ano/ne/odloženo (vazba na AI-only firmu, počet lidí).
6. **Mailboxy:** vlastní schránky ano/ne (dnes jen odchozí Postmark).
7. **Lokální AI engine:** jaký (Ollama/vLLM…), jaký model, co má obsluhovat (aibot, RAG, shrnutí schůzek — viz roadmapa „mozek firmy" část C).
8. Harmonogram migrace (odkázat MIGRATION-RUNBOOK, nekopírovat).

## Nástroje a vzory
- `docs/MIGRATION-RUNBOOK.md`, `docs/CUSTOM-BUILD.md`, `praut_erp_docs/HULY_DECISIONS_AND_DEVIATIONS.md`
- Ceníky hostingů (WebSearch) — uvádět zdroje a datum.

## Ověření
- ADR obsahuje u každého z 8 bodů: varianty, doporučení, NÁKLAD, a prázdné pole „Rozhodnutí: ___" pro Štěpána.
- Rozpor LiveKit je explicitně popsán s důsledky obou variant.

## Mantinely
- Agent NEROZHODUJE — připravuje podklady; rozhodnutí podepisuje Štěpán.
- Žádné objednávky/registrace služeb.
