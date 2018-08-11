import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Store, Select } from '@ngxs/store';

import { Authenticate } from '../models/user';
import { Login, LoginPageState } from '../store';

@Component({
  selector: 'bc-login-page',
  template: `
    <bc-login-form
      (submitted)="onSubmit($event)"
      [pending]="pending$ | async"
      [errorMessage]="error$ | async">
    </bc-login-form>
  `,
  styles: [],
})
export class LoginPageComponent implements OnInit {
  @Select(LoginPageState.getPending) pending$: Observable<boolean>;
  @Select(LoginPageState.getError) error$: Observable<string>;

  constructor(private store: Store) {}

  ngOnInit() {}

  onSubmit($event: Authenticate) {
    this.store.dispatch(new Login($event));
  }
}
