dev:
    nix-shell shell.nix --run "hugo server --bind 0.0.0.0 --port 1313 --buildDrafts --disableFastRender"

build:
    nix-shell shell.nix --run "hugo --gc --minify"

[group('posts')]
default:
    @just --list
