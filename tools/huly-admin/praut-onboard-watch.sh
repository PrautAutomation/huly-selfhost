#!/bin/zsh
# Spouštěč hlídače onboardingu pro cron. Zařadí nové členy workspace jako vyvojar.
# Loguje mimo git. Spouští se z import-tool (kde jsou node_modules platformy).
IMPORT_TOOL="/Users/stepan/praut/HulyPrautplatform/dev/import-tool"
SCRIPT="/Users/stepan/praut/huly-selfhost/tools/huly-admin/praut-onboard-watch.cjs"
LOG="/Users/stepan/praut/praut-onboard-watch.log"
cd "$IMPORT_TOOL" || exit 1
echo "----- $(date) -----" >> "$LOG"
NODE_PATH="$IMPORT_TOOL/node_modules" /usr/bin/env node "$SCRIPT" --apply 2>&1 \
  | grep -v "no document found" >> "$LOG" 2>&1
