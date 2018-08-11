import { State, Action, Selector, StateContext } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';

import { User } from '../../models/user';
import { LoginRedirect, LoginSuccess, Logout } from '../actions/auth.actions';

export interface StatusStateModel {
  loggedIn: boolean;
  user: User | null;
}

const statusStateDefaults: StatusStateModel = {
  loggedIn: false,
  user: null,
};

@State<StatusStateModel>({
  name: 'status',
  defaults: statusStateDefaults,
})
// todo: rename to AuthStatusState
export class StatusState {
  @Selector()
  static getLoggedIn(state: StatusStateModel) {
    return state.loggedIn;
  }

  @Selector()
  static getUser(state: StatusStateModel) {
    return state.user;
  }

  @Action(LoginSuccess)
  loginSuccess(
    { patchState }: StateContext<StatusStateModel>,
    action: LoginSuccess
  ) {
    patchState({
      loggedIn: true,
      user: action.payload.user,
    });
  }

  @Action([Logout, LoginRedirect])
  logout({ dispatch, setState }: StateContext<StatusStateModel>) {
    setState(statusStateDefaults);

    dispatch(new Navigate(['/login']));
  }
}
