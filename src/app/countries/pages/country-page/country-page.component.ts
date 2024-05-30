import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { switchMap } from 'rxjs';
import { ICountry } from '../../interfaces/ICountry';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: [
  ]
})
export class CountryPageComponent implements OnInit{

  public country? : ICountry;

  constructor(
    private activatedRoute: ActivatedRoute,
    /* 
      Activated Route: https://angular.io/api/router/ActivatedRoute
    */
    private countriesService: CountriesService,
    private router: Router
  ) {}

  ngOnInit(): void {

    // * Codigo simplificado
    this.activatedRoute.params
      .pipe(
        switchMap( ({id}) => this.countriesService.searchCountryByAlphaCode(id) )
        // "switchMap" recive el valor anterior (en este caso los "params")
        // y regresa un nuevo Observable
      )
      .subscribe(
        result => { // result ahora es un arreglo de ICountry
          if ( !result )
            return this.router.navigateByUrl('');
          return this.country = result;
        }
      );

    //! Codigo a simplificar
    // this.activatedRoute.params.subscribe(
    //   ({id}) => { // Haces desestructuracion para obtener la propiedad "id"
    //     // obtenemos "id" porque en "countries-routing.module.ts" tenemos "by/:id"
    //     // si se siene "(params) =>" podremos observer que es de tipo "Params"
    //     this.countriesService.searchCountryByAlphaCode(id).subscribe(
    //       result => {
    //         // Tener un Observable dentro de otro Observable se conoce como "Observable hell"
    //         // Termino silimar a "Callback hell"
    //         console.log({result})
    //       }
    //     );
    //   }
    // );
  }

}
