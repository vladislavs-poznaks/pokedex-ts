import { createInterface } from "readline"

export const startREPL = (): void => {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "pokedex > ",
    })

    rl.prompt()

    rl.on("line", (input) => {
        const words = cleanInput(input)

        if (words.length) {
            console.log(`Your command was: ${words[0]}`)
        }

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
