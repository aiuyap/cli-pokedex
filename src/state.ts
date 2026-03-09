import { createInterface, type Interface } from "node:readline";
import { commandHelp } from "./command_help.js";
import { commandExit } from "./command_exit.js";
import { PokeAPI } from "./pokeapi.js";
import { commandMap } from "./command_map.js";
import { commandMapB } from "./command_mapb.js";
import { commandExplore } from "./command_explore.js";
import { commandCatch } from "./command_catch.js";
import { commandInspect } from "./command_inspect.js";

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State, ...args: string[]) => Promise<void>;
};

export type State = {
  readline: Interface,
  commands: Record<string, CLICommand>,
  pokeapi: PokeAPI,
  pokedex: Record<string, Pokemon>,
  nextLocationURL?: string,
  prevLocationsURL?: string | null
}

export type Pokemon = {
  base_experience: number,
  height: number,
  weight: number,
  stats: PokemonStats[],
  types: PokemonTypes[]
}

export type PokemonStats = {
  base_stat: number,
  effort: number,
  stat: {
    name: string,
    url: string
  }
}

export type PokemonTypes = {
  slot: number,
  type: {
    name: string,
    url: string
  }
}


export function initState(): State {
  const readline = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > ",
  })
  const commands = getCommands();
  const pokeapi = new PokeAPI();
  const pokedex: Record<string, Pokemon> = {};
    return {
      readline,
      commands,
      pokeapi,
      pokedex
    };
}

export function getCommands(): Record<string, CLICommand> {
  return {
    help: {
      name: "help",
      description: "Displays a help message",
      callback: commandHelp,
    },
    map: {
      name: "map",
      description: "Show current / next locations",
      callback: commandMap,
    },
    mapb: {
      name: "mapb",
      description: "Show previous previous locations",
      callback: commandMapB,
    },
    explore: {
      name: "explore <area-name>",
      description: "Explore the area",
      callback: commandExplore,
    },
    catch: {
      name: "catch <pokemon-name>",
      description: "Catch a pokemon",
      callback: commandCatch,
    },
    inspect: {
      name: "inspect <pokemon-name>",
      description: "Inspect a pokemon in your Pokedex",
      callback: commandInspect,
    },
    exit: {
      name: "exit",
      description: "Exits the pokedex",
      callback: commandExit,
    },
  };
}