.PHONY: dev build build-css new-post validate clean lint lint-spell lint-markdown shell

dev:
	devenv up

build: build-css
	nix-shell -p hugo nodejs --run "hugo --gc --minify"

build-css:
	npx sass-embedded themes/pickles/assets/scss/style.scss:static/css/style.css --style=compressed --no-source-map 2>/dev/null

new-post:
	@if [ -z "$(post)" ]; then echo "Usage: make new-post post=title-slug"; exit 1; fi
	nix-shell -p hugo --run "hugo new posts/$(post).md"

validate:
	nix-shell -p hugo --run "hugo --gc --minify"

clean:
	rm -rf public resources

lint:
	nix-shell -p nodejs --run "npm run lint"

lint-spell:
	nix-shell -p nodejs --run "npm run lint:spell"

lint-markdown:
	nix-shell -p nodejs --run "npm run lint:markdown"

shell:
	devenv shell
