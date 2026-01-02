dev:
    devenv up

build:
    devenv run -- ./hugo --gc --minify

shell:
    devenv shell

[group('posts')]
default:
    @just --list
