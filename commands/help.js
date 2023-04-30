class Help {
    constructor() {
        this.desc = "Shows the help page."
        this.args = ["(COMMAND)"]
        this.full_desc = "This command will show the help page of Viper.\n Where (COMMAND) is the command to get more information about."
    }

    run(ns, args) {

        if (!(args)){
            ns.tprintf("Comming soon.")
            return
        }

        if (!(args[0] in commands)){
            ns.tprintf('Help: command "'+args[0]+'" not found!')
            return
        }

        commands[args[0]].show_help(ns)

    }

    show_help(ns) {
        print_help(ns, this.args, this.full_desc)
    }
}