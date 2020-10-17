import { TestBed } from '@angular/core/testing';

import { cold } from 'jasmine-marbles';

import { NgxsModule, Store } from '@ngxs/store';

import { AuthGuard } from './auth-guard.service';
import { AuthStates, LoginSuccess } from '../store';
import { AuthService } from './auth.service';

describe('Auth Guard', () => {
  let guard: AuthGuard;
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot(AuthStates)],
      providers: [AuthGuard, AuthService],
    });

    store = TestBed.inject(Store);
    spyOn(store, 'dispatch').and.callThrough();
    guard = TestBed.inject(AuthGuard);
  });

  it('should return false if the user state is not logged in', () => {
    const expected = cold('(a|)', { a: false });

    expect(guard.canActivate()).toBeObservable(expected);
  });

  it('should return true if the user state is logged in', () => {
    const user: any = {};
    const action = new LoginSuccess({ user });
    store.dispatch(action);

    const expected = cold('(a|)', { a: true });

    expect(guard.canActivate()).toBeObservable(expected);
  });
});
