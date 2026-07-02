# T16 — Otevřít PR pro spec invite rolí

**Tag:** HNED · **Priorita:** P1 · **Bolest:** konzistence repa · **Závisí na:** —

## Cíl
Spec `docs/specs/invite-with-praut-role.md` je v PR (a po schválení na main) — přestane viset jen na větvi.

## Kontext
Spec (výběr PRAUT role přímo v pozvánce → automatické přiřazení prostorů; klíčové architektonické rozhodnutí: rozšířit `doJoinByInvite` o připojení k transactoru) byl napsán 2026-06-26 na větvi `feat/spec-invite-roles`, ale **PR nikdy nevznikl**. Bez PR hrozí zapomenutí/ztráta. Realizace samotná = T22 (nový server, build pipeline).

## Co přesně udělat
1. `git fetch` + zkontrolovat větev `feat/spec-invite-roles` (existuje na origin, 1 commit se spec souborem).
2. Ověřit, že spec je aktuální — od té doby vznikl error-case „Confirmed social identity…" (2026-07-02): do specu doplnit poznámku do Rizik, že merge duplicitních osob musí přepojit i workspace SocialIdentity (relevantní pro auto-přiřazování při joinu).
3. Otevřít PR `feat/spec-invite-roles` → main s AI metadata sekcí; do popisu: jde o SPEC (dokumentaci), ne kód; realizace = nový server.
4. Po schválení Štěpánem merge.

## Nástroje a vzory
- `gh pr create --base main --head feat/spec-invite-roles`
- Spec: `docs/specs/invite-with-praut-role.md` (na té větvi)

## Ověření
- PR otevřen, CI zelené, spec po merge dostupný na main v `docs/specs/`.

## Mantinely
- Needitovat obsah specu nad rámec doplnění rizika (bod 2) — architektura je rozhodnutá.
- Merge jen se souhlasem Štěpána.
