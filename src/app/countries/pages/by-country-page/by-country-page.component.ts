import { Component, OnInit } from '@angular/core';
import { ICountry } from '../../interfaces/ICountry';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: [
  ]
})
export class ByCountryPageComponent implements OnInit {
  public countries: Array<ICountry> = [];
  public isLoading: boolean = false;
  public initialValue: string = '';

  constructor(
    private countriesService: CountriesService
  ) {}

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStorage.byCountry.countries;
    this.initialValue = this.countriesService.cacheStorage.byCountry.term;
  }

  public searchByCountry(term: string): void {
    this.isLoading = true;
    this.countriesService.searchByCountry(term).subscribe(
      result => {
        console.log(result);
        this.countries = result;
        this.isLoading = false;
      }
    );
  }
}
