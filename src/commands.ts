import { ShallowLocations } from "./api/poke";
import {State} from "./state";

export const map = async (state: State): Promise<void> => {
    const locations: ShallowLocations = await state.api.fetchLocations(state.locations.next || undefined)
    state.locations = {next: locations.next, previous: locations.previous}

    console.log()
    locations.results.map(it => console.log(it.name))
}

export const mapb = async (state: State): Promise<void> => {
    if (!state.locations.previous) {
        console.log("you're on the first page")
        return
    }

    const locations: ShallowLocations = await state.api.fetchLocations(state.locations.previous)
    state.locations = {next: locations.next, previous: locations.previous}

    console.log()
    locations.results.map(it => console.log(it.name))
}

export const exit = async (state: State): Promise<void> => {
    console.log("Closing the Pokedex... Goodbye!")

    state.rl.close()
    process.exit(0)
}

export const help = async (state: State): Promise<void> => {
    console.log("Welcome to the Pokedex!")
    console.log("Usage:")
    console.log()

    for (const name in state.commands) {
        console.log(`${name}: ${state.commands[name].description}`)
    }
}