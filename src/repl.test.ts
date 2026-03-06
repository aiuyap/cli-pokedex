import { cleanInput } from "./repl";
import { describe, expect, test } from "vitest";

describe.each([
  {
    input: "hello world",
    expected: ["hello", "world"],
  },
  {
    input: "Charmander Bulbasaur PIKACHU",
    expected: ["charmander", "bulbasaur", "pikachu"],
  },
  {
    input: "  hello world  ",
    expected: ["hello", "world"],
  },
  {
    input: "hello     world",
    expected: ["hello", "world"],
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
    input: " \t Charmander \n Bulbasaur \r\n PIKACHU \t ",
    expected: ["charmander", "bulbasaur", "pikachu"],
  },
  {
    input: "HELLO",
    expected: ["hello"],
  },
  {
    input: "   HELLO   ",
    expected: ["hello"],
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
    input: " \t \n \r\n ",
    expected: [],
  },
  {
    input: "one two three four",
    expected: ["one", "two", "three", "four"],
  },
  {
    input: "MiXeD CaSe iNpUt",
    expected: ["mixed", "case", "input"],
  },
  {
    input: "123 ABC def",
    expected: ["123", "abc", "def"],
  },
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
