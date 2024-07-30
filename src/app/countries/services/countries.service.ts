import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { ICacheStorage } from '../interfaces/ICache-Store.interface';
import { ICountry } from '../interfaces/ICountry';
import { Region } from '../interfaces/Region.type';

@Injectable({providedIn: 'root'})
export class CountriesService {
    private apiUrl: string = 'https://restcountries.com/v3.1';
    public cacheStorage: ICacheStorage = {
        byCapital: { term: '', countries: [] },
        byCountry: { term: '', countries: [] },
        byRegion: { region: '', countries: [] },
    };

    constructor(private http: HttpClient) {
        this.loadFromLoscalStorage();
    }

    private saveToLocalStorage() {
        localStorage.setItem('cacheStore', JSON.stringify( this.cacheStorage ));
    }

    private loadFromLoscalStorage() {
        if ( !localStorage.getItem('cacheStore') ) return;
        this.cacheStorage = JSON.parse( localStorage.getItem('cacheStore')! );
    }

    // Optimizacion de llamada a la API para evitar tener codigo duplicado
    private getCountriesRequest(url: string): Observable<Array<ICountry>> {
        return this.http.get<Array<ICountry>>(url)
        .pipe(
            // Cachando errores en la peticion
            catchError( () => of([]) ),
            // of sirve para la creacon de un observable basado en el argumetno pasado
            // Para este caso, si sucede un error, el error es cachado y regresa en lugar del error un arreglo vacio
            //* delay(2000), // Retrasa el envio de informacion del servicio al componente
        );
    }

    public searchCountryByAlphaCode(code: string): Observable<ICountry | null> {
        return this.http.get<Array<ICountry>>(`${this.apiUrl}/alpha/${code}`)
            .pipe(
                map( countries => countries.length > 0 ? countries[0] : null ),
                catchError( () => of(null) )
            );
    }

    public searchCapital( term: string ): Observable<Array<ICountry>> {
        return this.getCountriesRequest(`${this.apiUrl}/capital/${term}`)
            .pipe(
                /**
                 * Cuando se tenga un mensaje del observable que se esta llamando en getCountriesRequest,
                 * se ejecuta el "tap" pero no infuira en nada del funcionamiento de la emicion que esta
                 * haciendo el observable.
                 * En este caso, en "tap" se esta haciendo el almacenamiento de la data en el objeto
                 * creado a manera de cache
                 */
                tap( countries => this.cacheStorage.byCapital = { term, countries }),
                tap( () => this.saveToLocalStorage() )
            );
    }

    public searchByCountry(term: string): Observable<Array<ICountry>> {
        return this.getCountriesRequest(`${this.apiUrl}/name/${term}`)
            .pipe(
                tap( countries => this.cacheStorage.byCountry = { term, countries }),
                tap( () => this.saveToLocalStorage() )
            );
    }

    public searchByRegion(region: Region): Observable<Array<ICountry>> {
        return this.getCountriesRequest(`${this.apiUrl}/region/${region}`)
            .pipe(
                tap( countries => this.cacheStorage.byRegion = { region, countries }),
                tap( () => this.saveToLocalStorage() )
            );
    }
}
