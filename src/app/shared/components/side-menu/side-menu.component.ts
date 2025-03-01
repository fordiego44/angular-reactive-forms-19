import { Component } from '@angular/core';
import { reactiveRoutes } from '../../../reactive/reactive.routes';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface MenuItem{
  title: string,
  route: string
}

const reactiveItems = reactiveRoutes[0].children ?? [];

@Component({
  selector: 'app-side-menu',
  imports: [
    RouterLinkActive,
    RouterLink
  ],
  templateUrl: './side-menu.component.html',
  styles: ``
})
export class SideMenuComponent {
  reactiveMenu: MenuItem[] = reactiveItems
    .filter((item)=> item.path !== '**')
    .map((item)=>({
      route: `reactive/${item.path}`,
      title: `${item.title}`
    }));

    authMenu: MenuItem[] = [{
        title: 'Registro', route: './auth'
    }];

    country: MenuItem[] = [{
        title: 'Países', route: './country'
    }];
}
