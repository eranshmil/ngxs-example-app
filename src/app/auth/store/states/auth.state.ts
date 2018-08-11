import { State } from '@ngxs/store';

import { LoginPageState } from './login-page.state';
import { StatusState } from './status.state';

@State({
  name: 'auth',
  children: [StatusState, LoginPageState],
})
export class AuthState {}
