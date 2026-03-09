import { createInterface, type Interface } from "node:readline";
import { commandHelp } from "./command_help.js";
import { commandExit } from "./command_exit.js";
import { PokeAPI } from "./pokeapi.js";
import { commandMap } from "./command_map.js";

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State) => Promise<void>;
};

export type State = {
  readline: Interface,
  commands: Record<string, CLICommand>,
  pokeapi: PokeAPI,
  nextLocationURL?: string,
  prevLocationsURL?: string | null
}

export function initState(): State {
  const readline = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > ",
  })
  const commands = getCommands();
  const pokeapi = new PokeAPI();
    return {
      readline,
      commands,
      pokeapi
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
      description: "Show current locations",
      callback: commandMap,
    },
    exit: {
      name: "exit",
      description: "Exits the pokedex",
      callback: commandExit,
    },
  };
}