import { Authenticate, User } from '../../models/user';

export class Login {
  static readonly type = '[Auth] Login';

  constructor(public payload: Authenticate) {}
}

export class LoginSuccess {
  static readonly type = '[Auth] Login Success';

  constructor(public payload: { user: User }) {}
}

export class LoginFailure {
  static readonly type = '[Auth] Login Failure';

  constructor(public payload: any) {}
}

export class LoginRedirect {
  static readonly type = '[Auth] Login Redirect';
}

export class Logout {
  static readonly type = '[Auth] Logout';
}
