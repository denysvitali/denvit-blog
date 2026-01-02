.PHONY: dev build new-post validate clean lint lint:spell lint:markdown

dev:
	devenv up

build:
	devenv run -- hugo --gc --minify

new-post:
	@if [ -z "$(post)" ]; then echo "Usage: make new-post post=title-slug"; exit 1; fi
	devenv run -- hugo new posts/$(post).md

validate:
	devenv run -- hugo --gc --minify

clean:
	rm -rf public resources

lint:
	devenv run -- npm run lint

lint:spell:
	devenv run -- npm run lint:spell

lint:markdown:
	devenv run -- npm run lint:markdown

shell:
	devenv shell
