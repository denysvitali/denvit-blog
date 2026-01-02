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
  ];

  env.HUGO_VERSION = hugoVersion;

  enterShell = ''
    npm install -g pagefind 2>/dev/null || true
    echo "Welcome to denvit-blog!"
  '';
}
