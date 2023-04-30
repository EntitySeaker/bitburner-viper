const commands = {"exit":new Exit, "help":new Help}

export async function main(ns) {
    while (true){

        var input = await user_input("Console: ", "red")
        ns.tprintf("\u001b[31m" + "Console: " + "\u001b[32m" + input)

        var command = input.split(" ")[0]

        if (input.split(" ").length > 1) {
            var args = input.split(" ").slice(1)
        } else {
            var args = null
        }
		
        if (!(command in commands)) {
            ns.tprintf("Command " + command + ' does not exist, type "help" for help.')
            continue
        }

        //test

        commands[command].run(ns, args)

        await ns.sleep(1)
    }
}