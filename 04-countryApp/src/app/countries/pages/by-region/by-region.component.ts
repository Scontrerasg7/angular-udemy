import { Component } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-region',
  templateUrl: './by-region.component.html',
  styles: ``
})
export class ByRegionComponent {
  public countries: Country[] = [];

  constructor(
    private countriesService: CountriesService
  ) {}

  searchByRegion( term:string ): void {
    this.countriesService.searchRegion(term)
      .subscribe(countries => {
        this.countries = countries;
      });
  }
}
