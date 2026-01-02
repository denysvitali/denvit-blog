{ pkgs, ... }:

let
  hugoVersion = "0.154.1";
in
{
  packages = [
    pkgs.hugo
    pkgs.nodejs
    pkgs.pnpm
    pkgs.just
    pkgs.sass
  ];

  env.HUGO_VERSION = hugoVersion;

  enterShell = ''
    npm install -g pagefind 2>/dev/null || true
    # Install theme dependencies and build CSS
    cd themes/pickles && npm install && npm run build
    echo "Welcome to denvit-blog!"
  '';
}
