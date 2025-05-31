export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2";
  
    constructor() {}
  
    async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
        try {
            const res = await fetch(pageURL || PokeAPI.baseURL.concat('/location-area'))

            if (!res.ok) {
                throw new Error(`${res.status}: ${res.statusText}`)
            }

            const locations: ShallowLocations = await res.json()

            return locations
        } catch (e) {
            throw new Error('Unable to make API request')
        }
    }
  
    async fetchLocation(locationName: string): Promise<Location> {
        try {
            const res = await fetch(PokeAPI.baseURL.concat('/location-area/').concat(locationName))

            if (!res.ok) {
                throw new Error(`${res.status}: ${res.statusText}`)
            }

            const location: Location = await res.json()

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
    id: number;
  };