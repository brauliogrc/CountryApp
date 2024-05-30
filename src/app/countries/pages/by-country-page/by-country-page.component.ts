import { Component } from '@angular/core';
import { ICountry } from '../../interfaces/ICountry';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: [
  ]
})
export class ByCountryPageComponent {
  public countries: Array<ICountry> = [];

  constructor(
    private countriesService: CountriesService
  ) {}

  public searchByCountry(term: string): void {
    this.countriesService.searchByCountry(term).subscribe(
      result => {
        console.log(result);
        this.countries = result;
      }
    );
  }
}
