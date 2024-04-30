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
usage: git [--version] [--help] [-C <path>] [-c <name>=<value>]
           [--exec-path[=<path>]] [--html-path] [--man-path] [--info-path]
           [-p | --paginate | -P | --no-pager] [--no-replace-objects] [--bare]
           [--git-dir=<path>] [--work-tree=<path>] [--namespace=<name>]
           [--super-prefix=<path>] [--config-env=<name>=<envvar>]
           <command> [<args>]

These are common Git commands used in various situations:

start a working area (see also: git help tutorial)
   clone     Clone a repository into a new directory
   init      Create an empty Git repository or reinitialize an existing one

work on the current change (see also: git help everyday)
   add       Add file contents to the index
   mv        Move or rename a file, a directory, or a symlink
   restore   Restore working tree files
   rm        Remove files from the working tree and from the index

examine the history and state (see also: git help revisions)
   bisect    Use binary search to find the commit that introduced a bug
   diff      Show changes between commits, commit and working tree, etc
   grep      Print lines matching a pattern
   log       Show commit logs
   show      Show various types of objects
   status    Show the working tree status

grow, mark and tweak your common history
   branch    List, create, or delete branches
   commit    Record changes to the repository
   merge     Join two or more development histories together
   rebase    Reapply commits on top of another base tip
   reset     Reset current HEAD to the specified state
   switch    Switch branches
   tag       Create, list, delete or verify a tag object signed with GPG

collaborate (see also: git help workflows)
   fetch     Download objects and refs from another repository
   pull      Fetch from and integrate with another repository or a local branch
   push      Update remote refs along with associated objects

'git help -a' and 'git help -g' list available subcommands and some
concept guides. See 'git help <command>' or 'git help <concept>'
to read about a specific subcommand or concept.
See 'git help git' for an overview of the system.
