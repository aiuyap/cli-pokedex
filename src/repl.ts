export function cleanInput(str: string): string[] {
  const arr = str.toLowerCase().trim();
  if (arr === "") return [];
  return arr.split(/\s+/);
}
