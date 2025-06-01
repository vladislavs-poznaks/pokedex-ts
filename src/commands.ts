import { ShallowLocations, Location, Pokemon } from "./api/poke";
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

export const explore = async (state: State, ...args: string[]): Promise<void> => {
    if (args.length === 0) {
        throw new Error('No location name is provided')
    }

    const name = args[0]

    console.log(`Exploring ${name}`)

    const location: Location = await state.api.fetchLocation(name)

    console.log("Found Pokemon:")

    location.pokemon_encounters.map(encounter => {
        console.log(` - ${encounter.pokemon.name}`)
    })
}

export const catchPokemon = async (state: State, ...args: string[]): Promise<void> => {
    if (args.length === 0) {
        throw new Error('No Pokemon name is provided')
    }

    const name = args[0]

    console.log(`Throwing a Pokeball at ${name}...`)

    const pokemon: Pokemon = await state.api.fetchPokemon(name)

    const isCaught = Math.random() < Math.max(0.1, Math.min(0.9, 1 - pokemon.base_experience / 750))

    if (isCaught) {
        console.log(`${name} has been caught!`)
        state.pokedex.set(name, pokemon)
        console.log(`${name} has been added to the Pokedex.`)
    } else {
        console.log(`${name} got away!`)
    }
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