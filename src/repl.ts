import { createInterface } from "node:readline";

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
  rl.on("line", (input) => {
    const cleaned = cleanInput(input);
    if (!cleaned.length) {
      rl.prompt();
      return;
    }
    console.log(`Your command was: ${cleaned[0]}`);
    rl.prompt();
  });
}
