# hx-init

After trying Helix Editor, and having 3 devices I decided its probably time to create a CLI tool that will install the LSP and other dependencies required for the languages.

# Current support:

- Typescript. This will install the typescript language server, typescript, vscode externals and lemmet-ls for prettier support.
- Javascript. A byproduct of supporting Typescript.
  - Also support for jsx and tsx as they are subsets of JS and TS

# Upcoming support:

- Rust
- C#
- C
- C++
- Go


# Installation

Clone the repository, in your terminal of choice you navigate to the repo and fire the command `npm install -g` after this the `hx-init` command should now be available. 


# Supported commands

`hx-init lang <Language>` will setup the environment required for the language.

# Upcoming commands

- `hx-init check` check if Helix Editor and npm are installed as these are required for some packages.
- `hx-init lang open <Language>` will setup the environment required for the language and also open a new Helix Editor instance in the current terminal.