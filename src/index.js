#!/usr/bin/env node

import { program } from "commander"

import { execSync } from "child_process"
import * as fs from "node:fs"


console.log("Welcome, let's setup your Helix Editor env.")

program.command("config")
  .description("Setup Helix Config")
  .action(() => setupDefaultConfig())

program.command("lang")
  .description("Setup Helix env for lang")
  .argument("<lang>", "Setup Helix environment for specified language")
  .action((lang) => {
    if (lang === 'typescript' || lang === 'ts') {
      setupTypeScript()
    }
  })

program.command("check")
  .description("Check if hx is available")
  .action(() => {
    checkHelixAvailable()
  })


function setupTypeScript() {

  console.log("Starting setup...")

  console.log("Installing Typescript language server")
  execSync("npm install -g typescript-language-server typescript");

  console.log("Installing vscode langserver for Typescript")
  execSync("npm i -g vscode-langservers-extracted")

  console.log("Installing emmet-ls")
  execSync("npm install -g emmet-ls")

  console.log("Running hx --health to list installed LSP's")
  execSync("hx --health")

  console.log("Complete... Helix Editor is now configured for Typescript")
}


function checkHelixAvailable() {
  console.log("Running hx --health to see if helix available")

  try {
    execSync("hx --health");
    console.log("Found hx!")
  } catch (e) {
    console.error("It seems I can not find hx")
  }

}

function setupGo() {

  console.log("Starting setup...")

  console.log("Installing Go...")
  execSync("")

}


// This sets up a default easy config that I use for helix currently.
function setupDefaultConfig() {
  const cfg = `theme = "curzon"

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
  `;

  const appDataPath = process.env.APPDATA || (process.platform === 'darwin' ? process.env.HOME + '/Library/Preferences' : '/var/local');
  const filePath = `${appDataPath}/helix/config.toml`

  fs.mkdirSync(`${appDataPath}/helix`, { recursive: true })

  // Eventually add fs.existsSync to check if there is already an existing config and give the user input if they would like to overwrite their current config.
  fs.writeFile(filePath, cfg, err => {
    if (err) {
      console.error("There was a problem creating the Helix config. ", err)
    } else {
      console.log("Helix config created succesfully.")
    }
  })

}




program.parse(process.argv)

