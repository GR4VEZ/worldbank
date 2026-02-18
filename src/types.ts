export type WorldBankRegion = {
  id: string;
  iso2code: string;
  value: string;
};

export type WorldBankCountry = {
  id: string;
  iso2Code: string;
  name: string;
  region: WorldBankRegion;
  adminregion?: WorldBankRegion;
  incomeLevel?: WorldBankRegion;
  lendingType?: WorldBankRegion;
  capitalCity?: string;
  longitude?: string;
  latitude?: string;
};

export type WorldBankCountryApiResponse = [
  { page: number; pages: number; per_page: string; total: number },
  WorldBankCountry[]
];

export type GetCountryIso2CodesOptions = {
  excludeAggregates?: boolean;
};
