{ pkgs, ... }:

let
  hugoVersion = "0.154.1";
in
pkgs.devenv.mkShell {
  name = "denvit-blog";
  packages = [
    pkgs.hugo
    pkgs.nodejs
    pkgs.pnpm
    pkgs.just
  ];

  enterShell = ''
    npm install -g pagefind 2>/dev/null || true
    echo "Welcome to denvit-blog development environment!"
  '';

  env = {
    HUGO_VERSION = hugoVersion;
  };
}
