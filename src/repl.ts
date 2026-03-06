import { createInterface } from "node:readline";
import { commandExit, commandHelp } from "./commands/commands.js";


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



