class Directory {
    constructor(represent, parent) {
        this.represent = represent;
        this.descendants = [];
        this.parent = parent;
    }
}
let dir = "~";
const home = new Directory("~", null);
let currentDirectory = home;

function isCommandValid(command) {
    const validCommands = ["pwd", "echo", "cd", "mkdir"];
    return validCommands.includes(command);
}

function mkdir(args, term) {
    const new_dir = new Directory(args, currentDirectory);
    currentDirectory.descendants.push(new_dir);
    term.value += "\nCarpeta "+ new_dir.represent + " creada.";
}

function cd(args, term) {
    let exist;

    if (args === undefined)
    {
        dir = "~";
        currentDirectory = home;
        term.value += "\nCambiando al directorio " + dir;
    }
    else if (args === "..")
    {
        if (currentDirectory.parent != null)
        {
            dir = dir.substring(0, dir.lastIndexOf("/"));
            currentDirectory = currentDirectory.parent;
            term.value += "\nCambiando a " + currentDirectory.represent;
        }
        else
            term.value += "\nYa se está en la raíz, no se puede cambiar al anterior directorio.";
    }
    else
    {
        currentDirectory.descendants.forEach(function (item) {
            if (item.represent === args) {
                exist = 1;
            } else {
                exist = 0;
            }
        });
        if (exist){
            dir += "/" + args;
            currentDirectory = currentDirectory.descendants.find(function (descendant){
                return descendant.represent === args;
            });
            term.value += "\nCambiando al directorio " + currentDirectory.represent;
        }else{
            term.value += "\nEse directorio no existe o no está en " + currentDirectory.represent;
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
    const code = new Directory("code", home);
    home.descendants.push(code);
    term.appendChild(termwrite);
    termwrite.value += "Comandos posibles: pwd, cd, echo y mkdir.\n";
}

