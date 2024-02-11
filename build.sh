#!/bin/sh

# Decompile files
folder="./casio"

for file in "$folder"/*; do
    if [ -f "$file" ]; then
       bun decompile_file.js $file
    fi
done

# Split files
folder="./casio_decompiled"

for file in "$folder"/*; do
    if [ -f "$file" ]; then
       bun split_file.js $file
    fi
done