import type { WorldBankCountry, WorldBankCountryApiResponse } from './types';
import { WORLD_BANK_COUNTRY_API_URL, REGION_AGGREGATES_VALUE, ISO2_PATTERN } from './constants';
import type { GetCountryIso2CodesOptions } from './types';

const staticCountriesData = require('./static/countries.json') as WorldBankCountry[];

const isAggregate = (c: WorldBankCountry): boolean => {
  const { region } = c || {};
  const { value } = region || {};
  const regionValue = (value && String(value).trim()) || '';
  return regionValue === REGION_AGGREGATES_VALUE;
};

const toIso2 = (c: WorldBankCountry): string => {
  const { iso2Code } = c || {};
  const code = iso2Code && String(iso2Code).trim().toUpperCase();
  return code || '';
};

const isValidIso2 = (code: string): boolean => ISO2_PATTERN.test(code);

export const fetchCountriesFromApi = async (): Promise<WorldBankCountry[]> => {
  const res = await fetch(WORLD_BANK_COUNTRY_API_URL);
  const { ok, status } = res;
  if (!ok) {
    throw new Error(`World Bank API error: ${status}`);
  }
  const data = (await res.json()) as WorldBankCountryApiResponse;
  const [, list] = data || [];
  return list || [];
};

export const getCountryIso2Codes = async (
  options: GetCountryIso2CodesOptions = {}
): Promise<string[]> => {
  const { excludeAggregates = true } = options || {};
  const list = await fetchCountriesFromApi();
  const filtered =
    (excludeAggregates && list.filter((c: WorldBankCountry) => !isAggregate(c))) || list;
  const codes = filtered.map(toIso2).filter(isValidIso2);
  const uniq = [...new Set(codes)];
  return uniq.sort();
};

export const getCountries = async (): Promise<WorldBankCountry[]> => {
  const list = await fetchCountriesFromApi();
  return list.filter((c: WorldBankCountry) => !isAggregate(c));
};

export const getCountriesFromStatic = (): WorldBankCountry[] => {
  const list = staticCountriesData || [];
  return list.filter((c: WorldBankCountry) => !isAggregate(c));
};

export const getCountryIso2CodesFromStatic = (
  options: GetCountryIso2CodesOptions = {}
): string[] => {
  const { excludeAggregates = true } = options || {};
  const list = staticCountriesData || [];
  const filtered =
    (excludeAggregates && list.filter((c: WorldBankCountry) => !isAggregate(c))) || list;
  const codes = filtered.map(toIso2).filter(isValidIso2);
  const uniq = [...new Set(codes)];
  return uniq.sort();
};
