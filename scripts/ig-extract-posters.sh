#!/usr/bin/env zsh

# Extracts first frame as WebP poster from videos
set -euo pipefail

FOLDER="$1"
WIDTH="${2:-1080}"  # target width

SRC_DIR="ig_data/$FOLDER"

if [[ ! -d "$SRC_DIR" ]]; then
  echo "Folder $SRC_DIR does not exist."
  exit 1
fi

# Process each MP4 file recursively
for vid in $SRC_DIR/**/*.mp4; do
  [[ -f "$vid" ]] || continue
  base="${vid%.mp4}"
  output="${base}_poster.webp"
  echo "Extracting poster from $vid → $output"

  # ffmpeg: first frame, scale width to $WIDTH, height auto (even), output WebP
  ffmpeg -y -i "$vid" \
    -vf "scale=${WIDTH}:-2" \
    -vframes 1 "$output" || {
      echo "⚠️ Poster extraction failed for $vid, skipping."
      continue
    }
done

echo "Poster extraction complete!"

