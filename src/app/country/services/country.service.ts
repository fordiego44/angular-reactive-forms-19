import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { combineLatest, Observable, of } from 'rxjs';
import { Country } from '../interfaces/country.interface';

@Injectable({providedIn: 'root'})
export class CountryService {

  private baseUrl = "https://restcountries.com/v3.1";
  private http = inject(HttpClient);

  private _regions = ['Africa','Americas','Asia','Europa','Oceania'];
  // /region/americas?fields=cca3,name,borders

  get regions():string[]{
    return [...this._regions]
  }

  getCountriesRegion( region: string): Observable<Country[]>{
    if (!region) return of([]);

    console.log({region});

    const url= `${this.baseUrl}/region/${region}?fields=cca3,name,borders`;
    return this.http.get<Country[]>(url);
  }

  getCountryByAlphaCode( alphaCode: string): Observable<Country>{
    console.log({alphaCode});

    const url= `${this.baseUrl}/alpha/${alphaCode}?fields=cca3,name,borders`;
    return this.http.get<Country>(url);
  }

  getCountryNamesByCodeArray( countryCodes: string[]): Observable<Country[]>{

    if ( !countryCodes || countryCodes.length == 0 ) return of([]);

    const countriesRequests: Observable<Country>[] = [];
    //
    // countryCodes.forEach( code => {
    //   const request = this.getCountryByAlphaCode(code).subscribe(country => {
    //     countriesRequests.push(country)
    //   });
    // });

    // return of(countriesRequests);
    //
    countryCodes.forEach( code => {
      const request = this.getCountryByAlphaCode(code);
      countriesRequests.push(request);
    });

    return combineLatest(countriesRequests);
  }
}
