import {createInterface} from "readline"
import {commands as getCommands} from "./commands.js";

export const startREPL = (): void => {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "pokedex > ",
    })

    rl.prompt()

    rl.on("line", (input) => {
        const inputs = cleanInput(input)

        if (inputs.length === 0) {
            rl.prompt()
            return
        }

        const name = inputs[0]

        const commands = getCommands()

        const cmd = commands[name]

        if (!cmd) {
            console.log(`Unknown command: ${name}`)
            rl.prompt()
            return
        }

        cmd.callback(commands)

        rl.prompt()
    })
}

export const cleanInput = (input: string): string[] => {
    return input
        .trim()
        .toLowerCase()
        .split(/\s+/)
        .filter(Boolean)
}
