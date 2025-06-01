import {Cache} from '../cache.js'

export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2";

    #cache: Cache

    constructor(cacheInterval: number) {
        this.#cache = new Cache(cacheInterval)
    }
  
    async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
        const url = pageURL || PokeAPI.baseURL.concat('/location-area')

        const cached = this.#cache.get<ShallowLocations>(url)

        if (cached) {
            return cached
        }

        try {
            const res = await fetch(url)

            if (!res.ok) {
                throw new Error(`${res.status}: ${res.statusText}`)
            }

            const locations: ShallowLocations = await res.json()

            this.#cache.add<ShallowLocations>(url, locations)

            return locations
        } catch (e) {
            throw new Error('Unable to make API request')
        }
    }
  
    async fetchLocation(locationName: string): Promise<Location> {
        const url = PokeAPI.baseURL.concat('/location-area/').concat(locationName)

        const cached = this.#cache.get<Location>(url)

        if (cached) {
            return cached
        }

        try {
            const res = await fetch(url)

            if (!res.ok) {
                throw new Error(`${res.status}: ${res.statusText}`)
            }

            const location: Location = await res.json()

            this.#cache.add<Location>(url, location)

            return location
        } catch (e) {
            throw new Error('Unable to make API request')
        }
    }
}
  
  export type ShallowLocations = {
    count: number;
    next: string;
    previous: string;
    results: {
        name: string;
        url: string;
    }[]
  };
  
  export type Location = {
    encounter_method_rates: {
      encounter_method: {
        name: string;
        url: string;
      };
      version_details: {
        rate: number;
        version: {
          name: string;
          url: string;
        };
      }[];
    }[];
    game_index: number;
    id: number;
    location: {
      name: string;
      url: string;
    };
    name: string;
    names: {
      language: {
        name: string;
        url: string;
      };
      name: string;
    }[];
    pokemon_encounters: {
      pokemon: {
        name: string;
        url: string;
      };
      version_details: {
        encounter_details: {
          chance: number;
          condition_values: any[];
          max_level: number;
          method: {
            name: string;
            url: string;
          };
          min_level: number;
        }[];
        max_chance: number;
        version: {
          name: string;
          url: string;
        };
      }[];
    }[];
  };