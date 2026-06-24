{ ... }:
{
  projectRootFile = "flake.nix";

  programs.prettier = {
    enable = true;
    includes = [
      "*.ts"
      "*.tsx"
      "*.js"
      "*.jsx"
      "*.mjs"
      "*.cjs"
      "*.json"
      "*.css"
      "*.md"
      "*.yaml"
      "*.yml"
    ];
    excludes = [
      ".next/*"
      "node_modules/*"
      "bun.lock"
      ".wrangler/*"
    ];
    settings = {
      semi = true;
      singleQuote = false;
      tabWidth = 2;
      trailingComma = "all";
      printWidth = 100;
      plugins = [ "prettier-plugin-tailwindcss" ];
    };
  };

  programs.nixfmt.enable = true;
}
