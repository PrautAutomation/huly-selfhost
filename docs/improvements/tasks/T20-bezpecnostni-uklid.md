# T20 — Bezpečnostní úklid

**Tag:** HNED · **Priorita:** P1 · **Bolest:** bezpečnost · **Závisí na:** —

## Cíl
Kompromitovatelné údaje jsou zrotované, citlivé soubory ze serveru pryč, repo čisté dle gitleaks.

## Kontext
`PRAUT_REMAINING_WORK.md` eviduje od června: (1) **Postmark server token byl vložen do AI chatu** → rotovat; (2) **GitHub OAuth client secret** obdobně → rotovat; (3) na serveru leží nepoužívaný privátní klíč **`gh.pem`** (GitHub App) → ověřit využití a smazat/přesunout do bezpečí; (4) preventivní gitleaks sken repa.

## Co přesně udělat
1. **Postmark:** Štěpán v Postmark UI vygeneruje nový server token (agent připraví klikací postup). Pak na serveru: aktualizovat `SMTP_PASSWORD`/token v `huly_v7.conf`, `docker compose up -d mail && docker compose restart nginx`, test odchozího mailu (healthcheck alert nebo OTP login).
2. **GitHub client secret:** v GitHub App nastavení (org admin = Štěpán) vygenerovat nový, aktualizovat na serveru v conf, restart služby `github` + nginx, ověřit `praut-github-check.cjs`.
3. **gh.pem:** zjistit, zda ho služba `github` používá (grep conf/compose na cestu). Pokud ano → přesunout do řádné cesty s právy 600 a zdokumentovat; pokud ne → smazat.
4. **gitleaks:** spustit na repo (`gitleaks detect`) lokálně; nálezy vyhodnotit (template soubory s placeholdery = OK), skutečné úniky eskalovat Štěpánovi.
5. Zapsat výsledek do CHANGELOG (T17) + PRAUT_REMAINING_WORK (odškrtnout).

## Nástroje a vzory
- SSH alias `huly`; conf: `/root/huly-selfhost/huly_v7.conf` (needitovat bez zálohy: `cp huly_v7.conf huly_v7.conf.bak-$(date +%F)`)
- `tools/huly-admin/praut-github-check.cjs` (ověření po rotaci)
- Memory `huly-deploy-nginx-stale-ip`: po každém `up -d` → `restart nginx`

## Ověření
- Starý Postmark token deaktivován (test: starý nefunguje, nový ano — dorazí testovací mail).
- GitHub integrace funguje s novým secretem.
- `gh.pem` vyřešen (smazán/zabezpečen + zdokumentováno).
- gitleaks report bez skutečných nálezů.

## Mantinely
- Rotace = výpadek okna služby → provádět s vědomím Štěpána (mail/github krátce nepojedou).
- Nové tokeny NIKDY nevkládat do chatu/gitu — Štěpán je vloží na server sám, nebo přes bezpečný kanál.
- Před editací conf na serveru záloha souboru.
