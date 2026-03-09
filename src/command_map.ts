import { State } from "./state";

export async function commandMap(state: State) {

  let currentURL = "location-area";
  if (!state.prevLocationsURL || !state.nextLocationURL) {
    currentURL = getPathAndSearch(state.nextLocationURL ?? currentURL);
  }
  const getLoc = await state.pokeapi.fetchLocations(currentURL);
  state.nextLocationURL = getLoc.next;
  state.prevLocationsURL = getLoc.previous;

  const arrOfLocations = getLoc.results;
  for(const loc of arrOfLocations) {
    console.log(loc.name);
  }
}

function getPathAndSearch(url: string) {
  return url.replace("https://pokeapi.co/api/v2/", "");
}