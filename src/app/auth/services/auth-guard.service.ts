import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { Store } from '@ngxs/store';

import { LoginRedirect, StatusState } from '../store';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private store: Store) {}

  canActivate(): Observable<boolean> {
    return this.store.select(StatusState.getLoggedIn).pipe(
      map(authed => {
        if (!authed) {
          this.store.dispatch(new LoginRedirect());
          return false;
        }

        return true;
      }),
      take(1)
    );
  }
}
