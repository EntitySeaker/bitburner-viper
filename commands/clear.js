class Clear {
    constructor() {
        this.desc = "Clears the screen."
        this.args = ["N/A"]
        this.full_desc = "This command will clear the screen."
    }

    run(ns, _) {
        ascii_print(ns)
    }

    show_help(ns) {
        print_help(ns, this.args, this.full_desc)
    }
}