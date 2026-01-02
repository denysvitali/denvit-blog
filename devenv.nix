{ pkgs, config, ... }:

let
  hugoVersion = "0.154.1";
in
{
  packages = with pkgs; [
    hugo
    nodejs
    pnpm
    just
    nix
  ];

  # Install Pagefind via npm globally when entering shell
  enterShell = ''
    npm install -g pagefind 2>/dev/null || true
  '';

  # Scripts to run on shell activation
  activation = ''
    npm install -g pagefind 2>/dev/null || true
  '';

  env = {
    HUGO_VERSION = hugoVersion;
  };

  scripts = {
    dev = "hugo server --bind 0.0.0.0 --port 1313 --buildDrafts --disableFastRender";
    build = "hugo --gc --minify";
    lint = "npm run lint";
  };
}
