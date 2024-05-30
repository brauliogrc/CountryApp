import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { ICountry } from '../../interfaces/ICountry';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: [
  ]
})
export class ByCapitalPageComponent {

  public countries: Array<ICountry> = [];

  constructor(
    private countriesService: CountriesService
  ) { }

  public searchByCapital( term: string ): void {
    this.countriesService.searchCapital(term).subscribe(
      result => {
        console.log(result);
        this.countries = result;
      }
    );
  }

}
