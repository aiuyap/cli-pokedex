import { cleanInput } from "./repl";
import { describe, expect, test } from "vitest";

describe.each([
  {
    input: "  hello  world  ",
    expected: ["hello", "world"],
  },
  {
    input: "hello",
    expected: ["hello"],
  },
  {
    input: "HeLLo",
    expected: ["hello"],
  },
  {
    input: "   hello   ",
    expected: ["hello"],
  },
  {
    input: "hello     world     again",
    expected: ["hello", "world", "again"],
  },
  {
    input: "\thello\tworld\t",
    expected: ["hello", "world"],
  },
  {
    input: "\nhello\nworld\n",
    expected: ["hello", "world"],
  },
  {
    input: " \t hello \n world \r\n again \t ",
    expected: ["hello", "world", "again"],
  },
  {
    input: "",
    expected: [],
  },
  {
    input: "     ",
    expected: [],
  },
  {
    input: "Pikachu THUNDERBOLT",
    expected: ["pikachu", "thunderbolt"],
  },
  {
    input: "catch, PIKACHU!",
    expected: ["catch,", "pikachu!"],
  },
  {
    input: "battle 25 1337",
    expected: ["battle", "25", "1337"],
  },

  // TODO: more test cases here
])("cleanInput($input)", ({ input, expected }) => {
  test(`Expected: ${expected}`, () => {
    const actual = cleanInput(input);

    // The `expect` and `toHaveLength` functions are from vitest
    // they will fail the test if the condition is not met
    expect(actual).toHaveLength(expected.length);
    for (const i in expected) {
      // likewise, the `toBe` function will fail the test if the values are not equal
      expect(actual[i]).toBe(expected[i]);
    }
  });
});
