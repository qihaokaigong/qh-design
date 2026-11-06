#!/usr/bin/env bash
set -euo pipefail

# Avoid slow Azure mirror downloads during browser dependency installation.
# Keep Ubuntu's signed package repositories and change only the mirror host.
for qh_apt_source in \
  /etc/apt/apt-mirrors.txt \
  /etc/apt/sources.list \
  /etc/apt/sources.list.d/ubuntu.sources; do
  if [[ -f "$qh_apt_source" ]]; then
    sudo sed -i 's|azure.archive.ubuntu.com|archive.ubuntu.com|g' "$qh_apt_source"
  fi
done
