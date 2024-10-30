import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap, map, combineLatest } from 'rxjs';

import {  Country, Region, SmallCountry } from '../interfaces/country.interfaces';

@Injectable({providedIn: 'root'})
export class CountriesService {

  private _regions: Region[] = [Region.Africa, Region.Americas, Region.Europe, Region.Oceania, Region.Asia];
  private baseUrl: string = 'https://restcountries.com/v3.1'

  constructor(
    private http: HttpClient,
  ) { }

  get regions(): Region[] {
    return [...this._regions]
  }

  getCountriesByRegion(region: Region): Observable<SmallCountry[]> {
    if (!region) return of([]);

    return this.http.get<Country[]>(`${this.baseUrl}/region/${region}?fields=cca3,name,borders`)
      .pipe(
        map( countries => countries.map( country => ({
          name: country.name.common,
          cca3: country.cca3,
          borders: country.borders ?? [],
        }))),
      )
  }

  getCountryByAlphaCode(alphaCode: string): Observable<SmallCountry> {
    return this.http.get<Country>(`${this.baseUrl}/alpha/${alphaCode}?fields=cca3,name,borders`)
      .pipe(
        map( country => ({
          name: country.name.common,
          cca3: country.cca3,
          borders: country.borders ?? [],
        }))
      )
  }

  getCountryBordersByCodes(borders: string[]): Observable<SmallCountry[]> {
    if (!borders || borders.length === 0) return of([]);

    const countryRequests: Observable<SmallCountry>[] = [];
    borders.forEach(code => {
      const request = this.getCountryByAlphaCode(code);
      countryRequests.push(request)
    });

    return combineLatest(countryRequests);
  }

}
