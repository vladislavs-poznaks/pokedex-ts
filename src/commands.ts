export type CLICommand = {
    name: string;
    description: string;
    callback: (commands: Record<string, CLICommand>) => void;
}

export const exit = (): void => {
    console.log("Closing the Pokedex... Goodbye!")

    process.exit(0)
}

export const help = (commands: Record<string, CLICommand>): void => {
    console.log("Welcome to the Pokedex!")
    console.log("Usage:")
    console.log()

    for (const name in commands) {
        console.log(`${name}: ${commands[name].description}`)
    }
}

export const commands = (): Record<string, CLICommand> => ({
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
})