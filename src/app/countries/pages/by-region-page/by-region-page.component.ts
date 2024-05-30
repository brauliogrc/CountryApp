import { Component } from '@angular/core';
import { ICountry } from '../../interfaces/ICountry';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [
  ]
})
export class ByRegionPageComponent {

  public countries: Array<ICountry> = [];

  constructor(
    private countriesService: CountriesService
  ) {}

  public searchByRegion(term: string): void {
    this.countriesService.searchByRegion(term).subscribe(
      result => {
        console.log(result);
        this.countries = result;
      }
    );
  }
}
