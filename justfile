dev:
    hugo server --bind 0.0.0.0 --port 1313 --buildDrafts --disableFastRender

build:
    hugo --gc --minify

[group('posts')]
default:
    @just --list
