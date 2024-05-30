import { Component, Input } from '@angular/core';
import { ICountry } from '../../interfaces/ICountry';

@Component({
  selector: 'countries-table',
  templateUrl: './country-table.component.html',
  styles: [
    `img {
      width: 35px
    }`
  ]
})
export class CountryTableComponent {
  @Input() public countries: Array<ICountry> = [];
}
