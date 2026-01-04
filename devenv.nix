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

  enterShell = '';
}
