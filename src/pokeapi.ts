import { Cache } from "./pokecache.js";

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  currentLocation: Location[] | undefined;
  cache: Cache;

  constructor() {
    this.cache = new Cache(50000);
  }

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const getLocationsURL = `${PokeAPI.baseURL}/${pageURL}`;
    const checkCache = this.cache.get(getLocationsURL);
    if(typeof checkCache !== "undefined") {
       return checkCache;
    }

    try {
      const res = await fetch(getLocationsURL, {
        method: "GET"
      });
      const result: ShallowLocations = await res.json();
      this.currentLocation = result.results;
      this.cache.add(getLocationsURL, result);
  
      return result;
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(`Unable to get locations error: ${e.message}`)
      } else {
        throw new Error("Unknown error in getting locations")
      }
    }
  }

  async fetchLocation(locationName: string): Promise<Location> {
    if (this.currentLocation === undefined) {
      throw new Error("No current location set, use map command first");
    } else {
      return this.currentLocation.find((loc) => loc.name === locationName)!;
    }
  }


}

export type ShallowLocations = {
  count: number,
  next: string
  previous: string | null,
  results: Location[]
};

export type Location = {
  name: string,
  url: string
};