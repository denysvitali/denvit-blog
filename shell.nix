let
  hugoVersion = "0.154.1";
  pkgs = import <nixpkgs> {};
in
pkgs.mkShell {
  name = "denvit-blog";
  packages = with pkgs; [
    hugo
    nodejs
    pnpm
    just
  ];

  shellHook = ''
    npm install -g pagefind 2>/dev/null || true
    echo "Welcome to denvit-blog development environment!"
  '';

  HUGO_VERSION = hugoVersion;
}
