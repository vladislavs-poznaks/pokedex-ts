import {createInterface, type Interface} from "readline";
import {map, mapb, exit, help} from "./commands.js";
import { PokeAPI } from "./api/poke.js";


export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State) => Promise<void>;
}

export type State = {
    commands: Record<string, CLICommand>;
    rl: Interface;
    api: PokeAPI;
    locations: {
        next: string | null;
        previous: string | null;
    }
}

export const initState = (cacheInterval: number) => {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "pokedex > ",
    })

    const commands: Record<string, CLICommand> = {
        mapb: {
            name: "mapb",
            description: "Displays previous locations",
            callback: mapb,
        },
        map: {
            name: "map",
            description: "Displays next locations",
            callback: map,
        },
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

    const api = new PokeAPI(cacheInterval)

    const locations = {next: null, previous: null}

    return {commands, rl, api, locations}
}