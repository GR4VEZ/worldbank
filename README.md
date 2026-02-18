# worldbank

A small library that talks to the [World Bank Country API](https://api.worldbank.org/v2/country?format=json) and returns country lists (e.g. ISO2 codes) for use in map builds, seeding, and UI allowlists.

You can either **call the API on the fly** for fresh data, or use the **bundled static snapshot** (last-known-good fetch from the API at build/publish time) so you don’t need network or the API at runtime.

## Install

```bash
npm install worldbank
```

## API

**Live (hits the API):**

- **`getCountryIso2Codes(options?)`** – Returns a sorted array of ISO2 codes. By default excludes aggregate regions. Options: `{ excludeAggregates?: boolean }` (default `true`).
- **`getCountries()`** – Returns full country objects from the API (non-aggregates only).
- **`fetchCountriesFromApi()`** – Returns the raw country list from the API (includes aggregates).

**Static (uses bundled snapshot, no network):**

- **`getCountryIso2CodesFromStatic(options?)`** – Same as `getCountryIso2Codes` but from the snapshot shipped with the package (sync).
- **`getCountriesFromStatic()`** – Same as `getCountries` but from the snapshot (sync).

## Usage

**On-the-fly (network required):**

```ts
import { getCountryIso2Codes, getCountries } from 'worldbank';

const iso2Codes = await getCountryIso2Codes();
const countries = await getCountries();
```

**Static snapshot (no network, good for builds/CI):**

```ts
import { getCountryIso2CodesFromStatic, getCountriesFromStatic } from 'worldbank';

const iso2Codes = getCountryIso2CodesFromStatic();
const countries = getCountriesFromStatic();
```

## Static snapshot

The package ships with a pre-fetched list from the World Bank API, generated when the library is built or published. To refresh it locally (e.g. before committing), run:

```bash
npm run build:static
```

Then run `npm run build` so the updated snapshot is copied into `dist/`.

## Requirements

- Node >= 18 (uses native `fetch` for live API calls).
- Network access only when using the live API; static getters need no network.

## License

MIT
