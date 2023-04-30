
function ascii_print(ns){
    ns.ui.clearTerminal()
    
    var ascii = ""
    ascii = ascii+""
    ascii = ascii+"##############################################################################\n"
    ascii = ascii+"#       ...    ....     ...                                                  #\n"
    ascii = ascii+"#      oOX0xdxO0000OkdxOK0xo                @@@@@@      @@@@@@               #\n"
    ascii = ascii+"#     .;:.,xmMMMMMMMMMMx,.:;.              @@   @@@    @@!  @@@              #\n"
    ascii = ascii+"#    :KXxokNMWWMMMMWWMWOoo0Xd.               .!!@!     @!@  !@!              #\n"
    ascii = ascii+"#   ;XWXXWMMMNKWMMWXXMMMWXXWWl              !!:        !!:  !!!              #\n"
    ascii = ascii+"#   ;XWd.lXW0lldxxxolkNWx'cXWo             :.:::::: ()  ::..::               #\n"
    ascii = ascii+"#    lNK,   cKc     cKc  .xNx.                                               #\n"
    ascii = ascii+"#     cXk.  ';'     ':'  oXx.       ____   ____ __                           #\n"
    ascii = ascii+"#      cKo.  ';     ;'  :Kd.        \\   \\ /   /|__|______    ____ _______    #\n"
    ascii = ascii+"#       :O:            'Oo.          \\   Y   / |  |\\____ \\ _/ __ \\\\_  __ \\   #\n"
    ascii = ascii+"#        ;d,          .ol             \\     /  |  ||  |_> >\\  ___/ |  | \\/   #\n"
    ascii = ascii+"#         ':.         ;;               \\___/   |__||   __/  \\___  >|__|      #\n"
    ascii = ascii+"#          ..         .                            |__|         \\/           #\n"
    ascii = ascii+"#                                                                            #\n"
    ascii = ascii+"# Created by: Volk                                                           #\n"
    ascii = ascii+"##############################################################################\n"
    
    ns.tprintf(ascii)
}
function print_help(ns, args, full_desc) {
    ns.tprintf("Args: "+args)
    ns.tprintf("Desc: "+full_desc)
}
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
class Exit {
    constructor() {
        this.desc = "Exits out of Viper."
        this.args = ["N/A"]
        this.full_desc = "This command will exit out of Viper."
    }

    run(ns, _) {
        ns.exit()
    }

    show_help(ns) {
        print_help(ns, this.args, this.full_desc)
    }
}
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
const commands = {"exit":new Exit, "help":new Help, "clear":new Clear}

export async function main(ns) {
    ascii_print(ns)

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

        commands[command].run(ns, args)

        await ns.sleep(1)
    }
}