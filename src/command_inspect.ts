import type { State } from "./state.js";

export async function commandInspect(state: State, ...input: string[]) {
  const pokemonToInspect = input[1];
  let exists = false;

  for (const [name, pokemon] of Object.entries(state.pokedex)) {
    if (pokemonToInspect === name) {
      console.log(`Name: ${name}`);
      console.log(`Height: ${pokemon.height}`);
      console.log(`Weight: ${pokemon.weight}`);
      console.log(`Stats:`);
      console.log(`  -hp: ${pokemon.stats[0].base_stat}`);
      console.log(`  -attack: ${pokemon.stats[1].base_stat}`);
      console.log(`  -defense: ${pokemon.stats[2].base_stat}`);
      console.log(`  -special-attack: ${pokemon.stats[3].base_stat}`);
      console.log(`  -special-defense: ${pokemon.stats[4].base_stat}`);
      console.log(`  -speed: ${pokemon.stats[5].base_stat}`);
      console.log(`Types:`);
      for (const type of pokemon.types) {
        console.log(`  -${type.type.name}`)
      }
      exists = true;
    }
  }
  if (!exists) {
    console.log("Pokemon not found in your Pokedex. Try again or catch it first using `catch` command.")
  }
}