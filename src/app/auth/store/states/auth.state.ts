import { State } from '@ngxs/store';

import { LoginPageState } from './login-page.state';
import { AuthStatusState } from './auth-status.state';

@State({
  name: 'auth',
  children: [AuthStatusState, LoginPageState],
})
export class AuthState {}
