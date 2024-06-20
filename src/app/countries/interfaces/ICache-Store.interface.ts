import { ICountry } from "./ICountry"
import { Region } from "./Region.type"

export interface ICacheStorage {
    byCapital: ITermCountries,
    byCountry: ITermCountries,
    byRegion: IRegionCountries
}

export interface ITermCountries {
    term: string,
    countries: Array<ICountry>
}

export interface IRegionCountries {
    region: Region,
    countries: Array<ICountry>
}