#!/usr/bin/env bash
# 収録した raw.mp4 を配布用に仕上げる（先頭・末尾のフェード、faststart、ファイルサイズ最適化）
set -euo pipefail
cd "$(dirname "$0")/out"
DUR=$(ffprobe -v error -show_entries format=duration -of csv=p=0 raw.mp4)
FADE_OUT_AT=$(python3 -c "print(max(0, ${DUR} - 0.8))")
ffmpeg -y -v error -i raw.mp4 \
  -vf "fade=t=in:st=0:d=0.6,fade=t=out:st=${FADE_OUT_AT}:d=0.8" \
  -c:v libx264 -preset slow -crf 20 -profile:v high -pix_fmt yuv420p -movflags +faststart \
  wintec-pos-prototype-walkthrough.mp4
ls -lh wintec-pos-prototype-walkthrough.mp4
