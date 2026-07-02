# T15 — Zachránit skripty z PR #16 na main

**Tag:** HNED · **Priorita:** P1 (blokuje T01) · **Bolest:** konzistence repa · **Závisí na:** —

## Cíl
`praut-merge-persons.cjs` a `praut-create-relations.cjs` jsou na main; PR #16 obsahuje už jen Love/LiveKit změny.

## Kontext
Audit repa 2026-07-08: oba skripty jsou v dokumentaci (README tools, AUDIT, DECISIONS) popsané jako hotové nástroje, ale **na main neexistují** — žijí jen ve větvi `feat/love-video-calls` (PR #16), který je držený na nový server. PR #16 je navíc proti staré main (diff ukazuje falešná „mazání"). Živé kopie skriptů jsou i v `HulyPrautplatform/dev/import-tool/` (necommitnuté v huly-selfhost).

## Co přesně udělat
1. Nová větev `feat/rescue-admin-scripts` z aktuální main (+ push -u PŘED zápisem — auto-commit hook!).
2. Získat oba skripty: `git show origin/feat/love-video-calls:tools/huly-admin/praut-merge-persons.cjs` (a create-relations) NEBO z `HulyPrautplatform/dev/import-tool/` — porovnat obě verze, vzít novější/funkční.
3. Uložit do `tools/huly-admin/`, doplnit do `tools/huly-admin/README.md` (tabulka nástrojů).
4. Otevřít PR → main (s AI metadata), po schválení merge.
5. Úklid PR #16: rebase/aktualizace větve na novou main tak, aby diff obsahoval JEN Love/LiveKit (compose změny, docs) — skripty z ní po merge kroku 4 zmizí samy rebasí. Pokud rebase konfliktní peklo → alternativa: zavřít #16 a otevřít čistý PR jen s Love změnami (obsah vytáhnout `git show`), do popisu odkázat původní.

## Nástroje a vzory
- `git show origin/<branch>:<path>` (extrakce bez checkout)
- `gh pr view 16 --json files` (co PR reálně mění)

## Ověření
- Oba skripty na main, spustitelné (dry-run projde z import-tool).
- PR #16 (nebo náhradní) diff = jen Love/LiveKit.
- README tools aktualizované.

## Mantinely
- Žádný force-push na sdílené větve; PR #16 rebase jen na jeho vlastní feature větvi.
- Merge PR jen se souhlasem Štěpána (ústava: nemergovat vlastní PR bez pokynu).
