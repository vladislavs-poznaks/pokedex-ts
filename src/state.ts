import {createInterface, type Interface} from "readline";
import {exit, help} from "./commands.js";


export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State) => void;
}

export type State = {
    commands: Record<string, CLICommand>;
    rl: Interface;
}

export const initState = () => {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "pokedex > ",
    })

    const commands: Record<string, CLICommand> = {
        help: {
            name: "help",
            description: "Displays a help message",
            callback: help,
        },
        exit: {
            name: "exit",
            description: "Exit the Pokedex",
            callback: exit,
        }
    }

    return {commands, rl}
}