#!/usr/bin/env bash
set -e

[ -z "$TARGET" ] && TARGET="dev"

cd "$(dirname $0)"
ROOT=$(dirname "$(pwd)")

if [ ! -f "$ROOT/.env" ]; then
    cp "$ROOT/.env.dist" "$ROOT/.env"
fi

cd "$ROOT"

npm install