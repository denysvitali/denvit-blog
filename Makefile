.PHONY: dev build new-post validate clean lint lint:spell lint:markdown

dev:
	hugo server --bind 0.0.0.0 --port 1313 --buildDrafts --disableFastRender --liveReloadPort 35729

build:
	hugo --gc --minify

new-post:
	@if [ -z "$(post)" ]; then echo "Usage: make new-post post=title-slug"; exit 1; fi
	hugo new posts/$(post).md

validate:
	hugo --gc --minify --dryRun

clean:
	rm -rf public resources

lint:
	npm run lint

lint:spell:
	npm run lint:spell

lint:markdown:
	npm run lint:markdown
