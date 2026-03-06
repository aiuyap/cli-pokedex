import { State } from "./state.js";

export function cleanInput(str: string): string[] {
  const arr = str.toLowerCase().trim();
  if (arr === "") return [];
  return arr.split(/\s+/);
}

export function startREPL(state: State) {
  const rl = state.readline;
  rl.prompt();
  rl.on("line", (dirtyInput) => {
    const input = cleanInput(dirtyInput);
    if (!input.length) {
      rl.prompt();
      return;
    }
    const command = state.commands[input[0]];
    if (!command) {
      console.log("Unknown command");
    } else {
      command.callback(state);
    }
    rl.prompt();
  });
}



