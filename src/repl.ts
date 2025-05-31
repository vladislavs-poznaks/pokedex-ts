import {State} from "./state";

export const startREPL = async (state: State): Promise<void> => {
    state.rl.prompt()

    state.rl.on("line", (input) => {
        const inputs = cleanInput(input)

        if (inputs.length === 0) {
            state.rl.prompt()
            return
        }

        const name = inputs[0]

        const cmd = state.commands[name]

        if (!cmd) {
            console.log(`Unknown command: ${name}`)
            state.rl.prompt()
            return
        }

        cmd.callback(state)

        state.rl.prompt()
    })
}

export const cleanInput = (input: string): string[] => {
    return input
        .trim()
        .toLowerCase()
        .split(/\s+/)
        .filter(Boolean)
}
