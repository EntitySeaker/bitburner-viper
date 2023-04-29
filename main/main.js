const commands = {"exit":new Exit}

export async function main(ns) {
    while (true){

        var input = await user_input("Console: ", "red")
        ns.tprintf("\u001b[31m" + "Console: " + "\u001b[32m" + input)
		
        if (!(input in commands)) {
			ns.tprintf("Command " + input + ' does not exist, type "help" for help.')
			continue
        }

        commands[input].run(ns)

        await ns.sleep(1)
	}
}