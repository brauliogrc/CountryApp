import { Component } from '@angular/core';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent {
  public sidebarItems: Array<any> = [
    {
      text: 'Home page',
      routerLink: ''
    },
    {
      text: 'About page',
      routerLink: 'about'
    },
    {
      text: 'Contact page',
      routerLink: 'contact'
    }
  ]

}
