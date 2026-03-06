import { State } from "./state";

export function commandExit(state: State) {
  console.log("Closing the Pokedex... Goodbye!");
  process.exit(0);
}
