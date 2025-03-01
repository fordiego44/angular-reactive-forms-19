import { Routes } from '@angular/router';
import { CountryPageComponent } from './pages/country-page/country-page.component';

export const countryRoutes: Routes = [
  {
    path:'',
    children:[
      {
        path:'country',
        title:'Básicos',
        component: CountryPageComponent
      },
      {
        path:'**',
        redirectTo: 'country'
      }
    ]

  }

];



