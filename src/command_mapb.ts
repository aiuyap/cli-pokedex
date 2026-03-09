import { getPathAndSearch } from "./command_map.js";
import { State } from "./state";

export async function commandMapB(state: State) {

  let currentURL = "location-area";
  if (!state.prevLocationsURL || !state.nextLocationURL) {
    currentURL = getPathAndSearch(state.prevLocationsURL ?? currentURL);
  }
  const getLoc = await state.pokeapi.fetchLocations(currentURL);
  state.nextLocationURL = getLoc.next;
  state.prevLocationsURL = getLoc.previous;

  const arrOfLocations = getLoc.results;
  for(const loc of arrOfLocations) {
    console.log(loc.name);
  }
}