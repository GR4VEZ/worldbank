/**
 * Fetches the current World Bank country list from the API and writes it to
 * src/static/countries.json. Run as part of build/publish so the package
 * ships with a last-known-good snapshot.
 */
import * as fs from 'fs';
import * as path from 'path';
import type { WorldBankCountryApiResponse } from '../src/types';

const WORLD_BANK_COUNTRY_API_URL =
  'https://api.worldbank.org/v2/country?format=json&per_page=300';
const OUT_DIR = path.join(__dirname, '..', 'src', 'static');
const OUT_FILE = path.join(OUT_DIR, 'countries.json');

const main = async (): Promise<void> => {
  const res = await fetch(WORLD_BANK_COUNTRY_API_URL);
  if (!res.ok) {
    throw new Error(`World Bank API error: ${res.status}`);
  }
  const data = (await res.json()) as WorldBankCountryApiResponse;
  const list = (data && data[1]) || [];
  if (!fs.existsSync(OUT_DIR)) {
    fs.mkdirSync(OUT_DIR, { recursive: true });
  }
  fs.writeFileSync(OUT_FILE, JSON.stringify(list, null, 2), 'utf8');
  console.log(`Wrote ${list.length} countries to ${OUT_FILE}`);
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
