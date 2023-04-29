class Exit {
    constructor() {
        this.desc = "Exits out of Viper."
        this.args = ["N/A"]
        this.full_desc = "This command will exit out of Viper."
    }

    run(ns, _) {
        ns.exit()
    }
}