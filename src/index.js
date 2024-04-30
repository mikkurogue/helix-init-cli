#!/usr/bin/env node

import { program } from "commander"

import { execSync } from "child_process"

console.log("Welcome, let's setup your Helix Editor env.")

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


program.parse(process.argv)

