#!/bin/sh
# specter.html and panel.html are page bodies (the format the Claude artifact wants).
# This wraps each in a full HTML document for GitHub Pages and local viewing: specter.html -> index.html, panel.html -> panel/index.html.
cd "$(dirname "$0")/.." || exit 1
wrap(){
  mkdir -p "$(dirname "$2")"
  {
    printf '<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n<style>body{margin:0}img{max-width:100%%}[hidden]{display:none!important}</style>\n</head>\n<body>\n'
    cat "$1"
    printf '</body>\n</html>\n'
  } > "$2"
}
wrap specter.html index.html
wrap panel.html panel/index.html
