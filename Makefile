.PHONY: dev build new-post validate clean lint lint:spell lint:markdown

dev:
	nix-shell shell.nix --run "hugo server --bind 0.0.0.0 --port 1313 --buildDrafts --disableFastRender"

build:
	nix-shell shell.nix --run "hugo --gc --minify"

new-post:
	@if [ -z "$(post)" ]; then echo "Usage: make new-post post=title-slug"; exit 1; fi
	nix-shell shell.nix --run "hugo new posts/$(post).md"

validate:
	nix-shell shell.nix --run "hugo --gc --minify --dryRun"

clean:
	rm -rf public resources

lint:
	nix-shell shell.nix --run "npm run lint"

lint:spell:
	nix-shell shell.nix --run "npm run lint:spell"

lint:markdown:
	nix-shell shell.nix --run "npm run lint:markdown"
