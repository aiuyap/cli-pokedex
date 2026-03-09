import type { State, Pokemon } from "./state.js";

export async function commandCatch(state: State, ...input: string[]) {
  const pokemonName = input[1];
  const pokemonURL = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
  console.log(`Throwing a Pokeball at ${pokemonName}...`)
  await delay(1000);

  try {
    const res = await fetch(pokemonURL);
     if (res.status !== 200 || res.statusText === "Not Found") {
      console.log("Pokemon not found, try again...");
      return
    }

    const pokemon = await res.json()
    const catched = attemptCatch(pokemon.base_experience);
    if (catched) {
      state.pokedex[pokemonName] = pokemon;
      console.log(`${pokemonName} was caught!`)
    } else {
      console.log(`${pokemonName} escaped!`)
    }

  } catch (e) {
    if (e instanceof Error) {
      console.log(`Error catching pokemon: ${e.message}`)
    }
  }
}

function attemptCatch(baseExperience: number): boolean {
  const MAX_BASE_EXP = 300;
  const MIN_CHANCE = 0.2;

  const difficulty = baseExperience / MAX_BASE_EXP;

  const catchChance = Math.max(MIN_CHANCE, 1 - difficulty);

  return Math.random() < catchChance;
}

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}