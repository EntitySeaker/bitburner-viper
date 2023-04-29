class Exit {
    constructor() {
        this.desc = "Exits out of Viper."
        this.args = ["N/A"]
        this.full_desc = "This command will exit out of Viper."
    }

    run(ns, _) {
        this.show_help(ns)
        ns.exit()
    }

    show_help(ns) {
        print_help(ns, this.args, this.full_desc)
    }
}