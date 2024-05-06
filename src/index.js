#!/usr/bin/env node

import { program } from "commander";
import chalk from "chalk";
import { execSync } from "child_process";
import * as fs from "node:fs";

const CLI_VERSION = "0.0.1"

console.log(chalk.green("Welcome, let's setup your Helix Editor env."));

program
  .description("Setup Helix Config")
  .option("--config, -cfg")
  .action(() => {
    setupDefaultConfig()
    // setupLanguagesToml()
  }
  );

program
  .description("Setup Helix env for lang")
  .option("-ts")
  .option("-go")
  .option("-rust")
  .action((options) => {
    if (options.Ts) {
      setupTypeScript();
    }

    if (options.Go) {
      console.log(chalk.yellow("Go setup is not yet supported"))
    }

    if (options.Rust) {
      console.log(chalk.yellow("Rust setup is not yet supported"))
    }
  });

program
  .version(CLI_VERSION)
  .command("check")
  .description("Check if hx is available")
  .action(() => {
    checkHelixAvailable();
  });


// start program to parse the commands
program.parse(process.argv);

function setupTypeScript() {
  console.log("Starting setup...");

  console.log("Installing Typescript language server");
  execSync("npm install -g typescript-language-server typescript");

  console.log("Installing vscode langserver for Typescript");
  execSync("npm i -g vscode-langservers-extracted");

  console.log("Installing emmet-ls");
  execSync("npm install -g emmet-ls");

  console.log("Running hx --health to list installed LSP's");
  execSync("hx --health");

  console.log(chalk.green("Complete... Helix Editor is now configured for Typescript"));
}

function checkHelixAvailable() {
  console.log("Running hx --health to see if helix available");

  try {
    execSync("hx --health");
    console.log("Found hx!");
  } catch (e) {
    console.error("It seems I can not find hx");
  }
}

function setupGo() {
  console.log("Starting setup...");

  console.log("Installing Go...");
  execSync("");
}

// This sets up a default easy config that I use for helix currently.
function setupDefaultConfig() {
  const cfg = `theme = "default"

[editor]
line-number = "absolute"
auto-format = true
text-width = 40
default-line-ending = "lf"
popup-border = "all"

[editor.cursor-shape]
insert = "bar"
normal = "block"
select = "underline"

[editor.file-picker]
hidden = false

[editor.statusline]
center = ["version-control"]
mode.normal = "___NORMAL___"
mode.insert = "___INSERT___"
mode.select = "___VISUAL___" # this is select mode, but visual mode sounds nicer to me

[keys.normal]
C-s = ":w"
C-S-s = ":w!"
C-g = [":n", ":insert-output lazygit", ":bc!", "redraw"]
  `;

  const appDataPath = process.env.APPDATA || (process.platform === "darwin" ? process.env.HOME + "/Library/Preferences" : "/var/local");
  const filePath = `${appDataPath}/helix/config.toml`;

  fs.mkdirSync(`${appDataPath}/helix`, { recursive: true });

  // Eventually add fs.existsSync to check if there is already an existing config and give the user input if they would like to overwrite their current config.
  fs.writeFile(filePath, cfg, (err) => {
    if (err) {
      console.log(chalk.red("There was a problem creating the Helix config."));
    } else {
      console.log(chalk.green("Helix config created succesfully."));
    }
  });
}

function setupLanguagesToml() {
  const langCfg = `[[language]]
name = "typescript"
auto-format = true
formatter = { command = "prettier", args = ["--parser", "typescript"] }

[[language]]
name = "rust"
scope = "source.rust"
injection-regex = "rust"
file-types = ["rs"]
roots = ["Cargo.toml", "Cargo.lock"]
shebangs = ["rust-script", "cargo"]
auto-format = true
comment-tokens = ["//", "///", "//!"]
block-comment-tokens = [
    { start = "/*", end = "*/" },
    { start = "/**", end = "*/" },
    { start = "/*!", end = "*/" },
]
language-servers = [ "rust-analyzer" ]
indent = { tab-width = 4, unit = "    " }
persistent-diagnostic-sources = ["rustc", "clippy"]
]`


  const appDataPath = process.env.APPDATA || (process.platform === "darwin" ? process.env.HOME + "/Library/Preferences" : "/var/local");
  const filePath = `${appDataPath}/helix/languages.toml`;


  fs.mkdirSync(`${appDataPath}/helix`, { recursive: true });

  // Eventually add fs.existsSync to check if there is already an existing config and give the user input if they would like to overwrite their current config.
  fs.writeFile(filePath, langCfg, (err) => {
    if (err) {
      console.log(chalk.red("There was a problem creating the Helix config."));
    } else {
      console.log(chalk.green("Helix language config created succesfully."));
    }
  });
}
