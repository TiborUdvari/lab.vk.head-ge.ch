#!/usr/bin/env zsh

# Converts videos to a specific width and adds a suffix
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
  output="${base}_${WIDTH}.mp4"
  echo "Resizing $vid → $output"

  # ffmpeg: set width to $WIDTH, height auto (even)
  ffmpeg -y -i "$vid" \
    -vf "scale=${WIDTH}:-2" \
    -c:a copy "$output" || {
      echo "⚠️ Conversion failed for $vid, skipping."
      continue
    }
done

echo "Video conversion complete!"

