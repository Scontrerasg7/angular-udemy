import { Country } from "./country.interface";
import { Region } from "./regions.type";

export interface CacheStore {
  byCapital: CacheCountries;
  byCountry: CacheCountries;
  byRegion: CacheRegion;
}

interface CacheCountries {
  term: string;
  countries: Country[];
}

interface CacheRegion {
  region?: Region;
  countries: Country[];
}
