import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';

import { Store, Select } from '@ngxs/store';

import { CloseSidenav, OpenSidenav, LayoutState } from '../store';
import { Logout, AuthStatusState } from '../../auth/store';

@Component({
  selector: 'bc-app',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <bc-layout>
      <bc-sidenav [open]="showSidenav$ | async">
        <bc-nav-item
          (navigate)="closeSidenav()"
          *ngIf="(loggedIn$ | async)"
          routerLink="/"
          icon="book"
          hint="View your book collection"
        >
          My Collection
        </bc-nav-item>
        <bc-nav-item
          (navigate)="closeSidenav()"
          *ngIf="(loggedIn$ | async)"
          routerLink="/books/find"
          icon="search"
          hint="Find your next book!"
        >
          Browse Books
        </bc-nav-item>
        <bc-nav-item (navigate)="closeSidenav()" *ngIf="!(loggedIn$ | async)">
          Sign In
        </bc-nav-item>
        <bc-nav-item (navigate)="logout()" *ngIf="(loggedIn$ | async)">
          Sign Out
        </bc-nav-item>
      </bc-sidenav>
      <bc-toolbar (openMenu)="openSidenav()">Book Collection</bc-toolbar>

      <router-outlet></router-outlet>
    </bc-layout>
  `,
})
export class AppComponent {
  @Select(LayoutState.getShowSidenav) showSidenav$: Observable<boolean>;
  @Select(AuthStatusState.getLoggedIn) loggedIn$: Observable<boolean>;

  constructor(private store: Store) {}

  closeSidenav() {
    this.store.dispatch(new CloseSidenav());
  }

  openSidenav() {
    this.store.dispatch(new OpenSidenav());
  }

  logout() {
    this.closeSidenav();

    this.store.dispatch(new Logout());
  }
}
