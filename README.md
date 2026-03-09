# cli-pokedex

A tiny terminal Pokédex built with TypeScript. It talks to the public PokéAPI to browse locations, inspect nearby Pokémon, and build your own caught collection.

Written from scratch using the guide from boot.dev course. [Link](https://www.boot.dev/courses/build-pokedex-cli-typescript)

## Prerequisites
- Node.js
- Internet connection (for PokéAPI)

## Setup
```bash
npm install
npm run build   # compile to dist/
npm run start   # run CLI
```

Development mode:
```bash
npm run dev
```

## Commands
Run inside the prompt (`Pokedex > `):
- `help` — list commands
- `map` — show next page of location areas
- `mapb` — show previous page of location areas
- `explore <area-name>` — list Pokémon in that area
- `catch <pokemon-name>` — attempt to catch by random chance
- `inspect <pokemon-name>` — show details of a caught Pokémon
- `pokedex` — list all caught Pokémon
- `exit` — quit

Notes:
- `inspect` and `pokedex` only show Pokémon already in local state (your session-only Pokédex).
- Responses are cached briefly to reduce repeated network calls.
