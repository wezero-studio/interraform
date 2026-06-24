{ pkgs ? import <nixpkgs> { } }:

pkgs.mkShell {
  buildInputs = with pkgs; [
    # Runtime
    bun

    # Formatting
    treefmt
    prettier
    nixfmt

    # Git hooks
    lefthook
  ];

  shellHook = ''
    echo "wezero-studio dev shell loaded"
    lefthook install
  '';
}
