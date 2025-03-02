import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interface';
import { filter, switchMap, tap } from 'rxjs';

@Component({
  selector: 'country-country-page',
  imports: [
    ReactiveFormsModule, JsonPipe
  ],
  templateUrl: './country-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryPageComponent {

  private fb = inject(FormBuilder);
  countryService = inject(CountryService);

  regions = signal(this.countryService.regions);

  countriesByRegion = signal<Country[]>([]);
  borders = signal<Country[]>([]);

  myForm: FormGroup = this.fb.group({
    region: ['', [Validators.required]],
    country: ['', [Validators.required]],
    border: ['', [Validators.required]],
  });

    onFormChanged = effect((onCleanUp) => {
      const formRegionChanged = this.onRegionChanged();
      const formCountryChanged = this.onCountryChanged();
      // const formRegionChanged = this.myForm
      //   .get('region')!
      //   .valueChanges.subscribe((value)=> {
      //     console.log({value});
      //   });

      onCleanUp(()=>{
        formRegionChanged.unsubscribe();
        console.log('Limpiado');

      });
    });

    onRegionChanged(){
      return this.myForm
              .controls['region']!
              .valueChanges.pipe(
                tap(() => this.myForm.get('country')!.setValue('')),
                tap(() => this.myForm.get('border')!.setValue('')),
                tap(() => {
                  this.countriesByRegion.set([]),
                  this.borders.set([])
                }),
                switchMap((region) =>
                  this.countryService.getCountriesRegion(region)
                )
              )
              .subscribe( countries => {
                this.countriesByRegion.set(countries);
                console.log({countries});
              });
    }


    onCountryChanged(){
      return this.myForm
              .get('country')!
              .valueChanges.pipe(
                tap(() => this.myForm.get('border')!.setValue('')),
                filter((value) => value!.length > 0),
                switchMap((alphaCode) =>
                  this.countryService.getCountryByAlphaCode(alphaCode ?? '')
                ),
                switchMap((country) =>
                  this.countryService.getCountryNamesByCodeArray(country.borders)
                )
              )
              .subscribe( borders => {
                console.log({borders});
                this.borders.set(borders);
              });
    }
}
