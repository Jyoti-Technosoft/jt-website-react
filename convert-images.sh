#!/bin/bash
# Batch image conversion script (requires cwebp and avifenc)
# Install tools: sudo apt-get install webp libavif-tools

ASSETS_DIR="public/assets"
WEBP_DIR="public/assets/webp"
AVIF_DIR="public/assets/avif"

# Create directories
mkdir -p "$WEBP_DIR" "$AVIF_DIR"

# Convert to WebP
find "$ASSETS_DIR" -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" | while read file; do
  filename=$(basename "$file")
  name="${filename%.*}"
  webp_file="$WEBP_DIR/$name.webp"
  
  echo "Converting to WebP: $filename"
  cwebp -q 80 "$file" -o "$webp_file"
done

# Convert to AVIF
find "$ASSETS_DIR" -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" | while read file; do
  filename=$(basename "$file")
  name="${filename%.*}"
  avif_file="$AVIF_DIR/$name.avif"
  
  echo "Converting to AVIF: $filename"
  avifenc -c aom -s 6 -a end-usage=q -a cq-level=32 "$file" "$avif_file"
done

echo "Conversion complete!"
