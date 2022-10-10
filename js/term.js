let dir = "~";

class Directory {
    constructor(name, represent) {
        this.name = name;
        this.represent = represent;
        this.descendants = [];
    }
}

const home = new Directory("Home", "~");

function isCommandValid(command) {
    const validCommands = ["pwd", "echo", "cd", "mkdir"];
    return validCommands.includes(command);
}

function mkdir(args, term) {

}

function cd(args, term) {
    let exist;
    if (args === undefined)
    {
        dir = "~";
        term.value += "\nCambiando al directorio " + dir;
    }
    else
    {
        home.descendants.forEach(function (item) {
            if (item.represent === args) {
                exist = 1;
            } else {
                exist = 0;
            }
        });
        if (exist){
            dir += "/" + args;
            term.value += "\nCambiando al directorio " + args;
        }else{
            term.value += "\nEse directorio no existe o no está en " + home.represent;
        }
    }

}

function pwd(term) {
    term.value += "\n" + dir;
}

function echo(args, term) {
    term.value += "\n" + args;
}

function getCommand(term){
    let command;
    let args;
    if (term.value.includes("\n"))
    {
        command = term.value.substring(term.value.lastIndexOf("\n")+1);
        if (command.includes(" "))
        {
            args = command.substring(command.indexOf(" ")).trim();
            command = command.substring(0, command.indexOf(" "));
        }
    }
    else
    {
        command = term.value;
        if (command.includes(" ")) {
            args = command.substring(command.indexOf(" ")).trim();
            command = command.substring(0, command.indexOf(" "));
        }
    }
    //El comando en este momento está en command
    if (isCommandValid(command)) {
        if (command === "pwd") {
            pwd(term);
        } else if (command === "echo") {
            echo(args, term);
        } else if (command === "cd") {
            cd(args, term);
        } else if (command === "mkdir") {
            mkdir(args, term);
        }
    }else{
        term.value += "\nEse comando no existe.";
    }
}

function initTerm(term){
    let termwrite = document.createElement("textarea");
    termwrite.addEventListener("keypress", function (event){
        let key = event.key;

        if (key === "Enter")
        {
            getCommand(termwrite);
        }
    });

    termwrite.style = 'height: 350px; width: 675px;' +
        'background-color: transparent; border: 0; font-family:"Noto-Sans",serif;' +
        'color: #ffffff; font-size: large;';
    termwrite.focus();
    termwrite.scrollIntoView();
    const code = new Directory("Code", "code");
    home.descendants.push(code);
    term.appendChild(termwrite);
    termwrite.value += "Comandos posibles: pwd, cd, echo y mkdir.\n";
}

