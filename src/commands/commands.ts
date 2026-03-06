import { CLICommand } from "src/types/command.js";


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