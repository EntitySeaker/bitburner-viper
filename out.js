
async function user_input(input, color){
    let doc=globalThis["document"];
    let slp=ms=>new Promise(r=>setTimeout(r,ms));
    let terminalPrompt=promptText=>new Promise(async r=>{
    let done = false;
    let addPrompt=basePrompt=>{
        let customPrompt = basePrompt.insertAdjacentElement("beforeBegin",basePrompt.cloneNode(true));
        let [customP, customIn] = Array.from(customPrompt.children);
        customIn.id="";
        customIn.focus();
        customP.innerText=promptText;
        customP.style.whiteSpace = "pre";
        customP.style.color = color;
        basePrompt.style.display="none";
        customIn.addEventListener("keydown",e=>{
        e.stopPropagation();
        if (e.key === "Enter"){
            customPrompt.remove();
            basePrompt.style.display="";
            done = true;
            r(customIn.value);
        }
        });
    }
    while(!done){
        let tIn = doc.querySelector("#terminal-input");
        if (tIn && !tIn.parentElement.style.display) addPrompt(tIn.parentElement);
        await slp(100);
    }
    });

    var cmd
    await Promise.all([terminalPrompt(input).then(response => cmd = response)])
    return cmd
}
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
const commands = {"exit":new Exit}

export async function main(ns) {
	while (true){

		var input = await user_input("Console: ", "red")
		ns.tprintf("\u001b[31m"+"Console: "+"\u001b[32m"+input)
		
		if (!(input in commands)) {
			ns.tprintf("Command "+input+' does not exist, type "help" for help.')
			continue
		}

		commands[input].run(ns)

		await ns.sleep(1)
	}
}