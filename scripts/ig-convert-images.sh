# Converts images to webp and downsizes
set -euo pipefail

FOLDER="$1"
SIZE="${2:-1080}" 

SRC_DIR="ig_data/$FOLDER"

if [[ ! -d "$SRC_DIR" ]]; then
  echo "Folder $SRC_DIR does not exist."
  exit 1
fi

# Process each JPG file recursively
for img in $SRC_DIR/**/*.jpg; do
  [[ -f "$img" ]] || continue  # skip if not a file
  base="${img%.jpg}"
  output="${base}_${SIZE}.webp"
  echo "Converting $img → $output"
  magick "$img" -resize "${SIZE}x${SIZE}>" -quality 85 -strip "$output"
done

echo "Conversion complete!"
