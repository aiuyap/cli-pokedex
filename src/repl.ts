import { createInterface } from "node:readline";

import { CLICommand } from "./types";

export function cleanInput(str: string): string[] {
  const arr = str.toLowerCase().trim();
  if (arr === "") return [];
  return arr.split(/\s+/);
}

export function startREPL() {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > ",
  });
  rl.prompt();
  rl.on("line", (dirtyInput) => {
    const input = cleanInput(dirtyInput);
    if (!input.length) {
      rl.prompt();
      return;
    }
    switch (input[0]) {
      case "help":
        commandHelp();
        break;
      case "exit":
        commandExit();
        break;
    }
    rl.prompt();
  });
}

export function commandExit() {
  console.log("Closing the Pokedex... Goodbye!");
  process.exit(0);
}

export function commandHelp() {
  console.log("Welcome to the Pokedex");
  console.log("Usage: \n\n");
  const cmds = getCommands();
  for (const command of Object.values(cmds)) {
    console.log(`${command.name}: ${command.description}`);
  }
}

export function getCommands(): Record<string, CLICommand> {
  return {
    help: {
      name: "help",
      description: "Displays a help message",
      callback: commandHelp,
    },
    exit: {
      name: "exit",
      description: "Exits the pokedex",
      callback: commandExit,
    },
  };
}
