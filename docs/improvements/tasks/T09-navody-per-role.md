# T09 — Návody per role v Huly

**Tag:** HNED · **Priorita:** P1 · **Bolest:** lidi neví jak · **Závisí na:** —

## Cíl
Každá role (vývojář/brigádník, obchodník, markeťák, vedoucí) má v Huly vlastní krátký návod „můj den v Huly" — nováček se zorientuje bez ptaní.

## Kontext
Existuje obecný „🚀 Rychlý start — jak pracovat v Huly" (sdílená dokumentace, `praut-quickstart-doc.cjs`). Chybí role-specifické: vývojář potřebuje Tracker+GitHub, obchodník Lead+karty, markeťák Marketing teamspace, vedoucí navíc reporting. Zdrojový materiál: `praut_erp_docs/zamestnanecke_navody/` a `OPERATIVNI_MODEL_HULY_TRACKER_GITHUB.md`.

## Co přesně udělat
1. Načti zdroje (`zamestnanecke_navody/`, OPERATIVNI_MODEL, quickstart) — nevymýšlet nové procesy, jen zhustit existující.
2. Napiš 4 dokumenty (každý max 1 obrazovka, struktura: Co otevřu ráno / Kam píšu co / Moje povinnosti / Co nesmím / Na koho se obrátit):
   - `👨‍💻 Vývojář & brigádník v Huly` → sdílená dokumentace (vidí všichni)
   - `💼 Obchodník v Huly` → „Obchodní dokumenty" (privátní)
   - `📣 Markeťák v Huly` → „Marketing" (privátní)
   - `👔 Vedoucí v Huly` → „Řízení a reporting" (privátní)
3. Generovat skriptem (idempotentní vzor quickstart — smazat+vytvořit dle názvu), nový skript `praut-role-guides.cjs` do `tools/huly-admin/`.
4. Do obecného Rychlého startu doplnit odkazy na role návody (jen ty viditelné všem).

## Nástroje a vzory
- `tools/huly-admin/praut-quickstart-doc.cjs` — přímý vzor (HTML content, idempotence)
- Zdroje: `praut_erp_docs/zamestnanecke_navody/`, `praut_erp_docs/OPERATIVNI_MODEL_HULY_TRACKER_GITHUB.md`

## Ověření
- 4 dokumenty existují ve správných prostorech (role vidí svůj: obchodník NEvidí vedoucí návod atd.).
- Test srozumitelnosti: každý návod dává smysl bez dalšího kontextu (přečte člověk, ne agent).
- Skript je idempotentní (druhé spuštění nevytvoří duplicitu).

## Mantinely
- Návody popisují JEN existující procesy (zdroje výše) — žádné vymyšlené workflow.
- Privátní návody do privátních prostorů (přístupový model = prostor, memory `huly-access-model`).
