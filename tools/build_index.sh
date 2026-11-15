#!/bin/sh
# specter.html is the page body (the format the Claude artifact wants).
# This wraps it in a full HTML document as index.html, for GitHub Pages and local viewing.
cd "$(dirname "$0")/.." || exit 1
{
  printf '<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n<style>body{margin:0}img{max-width:100%%}[hidden]{display:none!important}</style>\n</head>\n<body>\n'
  cat specter.html
  printf '</body>\n</html>\n'
} > index.html
