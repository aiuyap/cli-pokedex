export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  currentLocation: Location[] | undefined;

  constructor() {
  }

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const getLocationsURL = `${PokeAPI.baseURL}/${pageURL}`;
    try {
      const res = await fetch(getLocationsURL, {
        method: "GET"
      });
      const result = res.json() as Promise<ShallowLocations>;
      this.currentLocation = (await result).results;
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