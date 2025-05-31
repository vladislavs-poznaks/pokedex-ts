import {State} from "./state";

export const exit = (state: State): void => {
    console.log("Closing the Pokedex... Goodbye!")

    state.rl.close()
    process.exit(0)
}

export const help = (state: State): void => {
    console.log("Welcome to the Pokedex!")
    console.log("Usage:")
    console.log()

    for (const name in state.commands) {
        console.log(`${name}: ${state.commands[name].description}`)
    }
}