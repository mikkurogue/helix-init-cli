package cmd

import (
	"fmt"
	"os"
	"runtime"

	"github.com/spf13/cobra"
)

var hxConfigDir string

var rootCmd = &cobra.Command{
	Use: "hxi",
	Run: func(cmd *cobra.Command, args []string) {

		if runtime.GOOS == "windows" {
			hxConfigDir = "%AppData%\\helix\\config.toml"
		}

		if runtime.GOOS != "windows" {

			usrHomeDir, err := os.UserHomeDir()
			if err != nil {
				fmt.Println("Can not access home dir")
				os.Exit(1)
			}

			hxConfigDir = usrHomeDir + "/.config/helix/config.toml"
		}

		file, err := os.OpenFile(hxConfigDir, os.O_WRONLY|os.O_TRUNC|os.O_CREATE, 0644)
		if err != nil {
			fmt.Println("Error opening helix config")
			os.Exit(1)
		}
		defer file.Close()

		new_content := DEFAULT_HX_CFG

		_, err = file.WriteString(new_content)
		if err != nil {
			fmt.Println("Error writing the hx config")
			os.Exit(1)
		}

		fmt.Println("Helix config updated")

	},
}

// Execute adds all child commands to the root command and sets flags appropriately.
// This is called by main.main(). It only needs to happen once to the rootCmd.
func Execute() {
	err := rootCmd.Execute()
	if err != nil {

		fmt.Println(err.Error())
		os.Exit(1)
	}
}

func init() {
	var Source string

	rootCmd.Flags().StringVarP(&Source, "source", "s", "", "Source directory to read from")
}

const DEFAULT_HX_CFG = `# Config auto generated by hxi - github.com/mikkurogue/helix-init-cli
	theme = "rose_pine_moon"

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
C-S-s = ":w!"`
