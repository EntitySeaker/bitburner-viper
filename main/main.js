const commands = {"exit":new Exit, "help":new Help, "clear":new Clear}

export async function main(ns) {
    ascii_print(ns)

    while (true){

        var input = await user_input(tty(ns), "red")
        ns.tprintf("\u001b[31m" + tty(ns) + "\u001b[32m" + input)

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

        commands[command].run(ns, args)

        await ns.sleep(1)
    }
}