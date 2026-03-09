import type { State } from "./state.js";

export async function commandPokedex(state: State) {
  if (Object.keys(state.pokedex).length === 0) {
    console.log("No pokemon found in your Pokedex. Catch one first using the `catch` command.");
    return
  }
  console.log("Your Pokedex: ")
  for(const pokemon of Object.keys(state.pokedex)) {
    console.log(`  -${pokemon}`);
  }
}