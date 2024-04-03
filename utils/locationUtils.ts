import { Country, State, City } from 'country-state-city';
import { ICountry, IState, ICity } from 'country-state-city'

export function getCountries(): ICountry[] {
    return Country.getAllCountries();
}

export function getStates(countryCode: string): IState[] {
    return State.getStatesOfCountry(countryCode);
}

export function getCities(countryCode: string, stateCode: string): ICity[] {
    return City.getCitiesOfState(countryCode, stateCode);
}
