import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, map } from 'rxjs';
import { ICountry } from '../interfaces/ICountry';

@Injectable({providedIn: 'root'})
export class CountriesService {
    private apiUrl: string = 'https://restcountries.com/v3.1';

    constructor(private http: HttpClient) { }

    public searchCountryByAlphaCode(code: string): Observable<ICountry | null> {
        return this.http.get<Array<ICountry>>(`${this.apiUrl}/alpha/${code}`)
            .pipe(
                map( countries => countries.length > 0 ? countries[0] : null ),
                catchError( () => of(null) )
            );
    }

    public searchCapital( capital: string ): Observable<Array<ICountry>> {
        return this.http.get<Array<ICountry>>(`${this.apiUrl}/capital/${capital}`)
            .pipe(
                // Cachando errores en la peticion
                catchError( () => of([]) )
                // of sirve para la creacon de un observable basado en el argumetno pasado
                // Para este caso, si sucede un error, el error es cachado y regresa en lugar del error un arreglo vacio
            );
    }

    public searchByCountry(country: string): Observable<Array<ICountry>> {
        return this.http.get<Array<ICountry>>(`${this.apiUrl}/name/${country}`)
            .pipe(
                catchError( () => of([]) )
            );
    }

    public searchByRegion(region: string): Observable<Array<ICountry>> {
        return this.http.get<Array<ICountry>>(`${this.apiUrl}/region/${region}`)
            .pipe(
                catchError( () => of([]) )
            );
    }
}
