import { State } from "./state.js";

export async function commandExplore (state: State, ...input: string[]) {
  if (!input[1]) {
    console.log("Usage: explore <area-name>. Try 'map' first.")
    return
  }
  const areaToExplore = input[1];
  
try {
  const loc = await state.pokeapi.fetchLocation(areaToExplore).catch((e) => {
    if(e instanceof Error) {
      console.log(`${e.message}`)
    } 
    return;
  });

    if (!loc) {
      console.log("Could not find area. Try again...");
      return
    }
    let res;
    const cacheHit = state.pokeapi.cache.get(loc.url);
    if (cacheHit) {
      res = cacheHit;
    } else {
      const data = await fetch(loc.url);
      res = await data.json();
      state.pokeapi.cache.add(loc.url, res);
    }



    for (const item of res.pokemon_encounters) {
      console.log(`- ${item.pokemon.name}`);
    }
  } catch (e) {
    if (e instanceof Error) {
      throw new Error (`Error exploring area: ${e.message}`)
    }
    throw new Error ("Unknown error while exploring");
  }
  
}