import { Action, Selector, State, StateContext } from '@ngxs/store';

import { CloseSidenav, OpenSidenav } from '../actions/layout.actions';

export interface LayoutStateModel {
  showSidenav: boolean;
}

@State<LayoutStateModel>({
  name: 'layout',
  defaults: {
    showSidenav: false,
  },
})
export class LayoutState {
  @Selector()
  static getShowSidenav(state: LayoutStateModel) {
    return state.showSidenav;
  }

  @Action(OpenSidenav)
  openSidenav({ patchState }: StateContext<LayoutStateModel>) {
    patchState({
      showSidenav: true,
    });
  }

  @Action(CloseSidenav)
  closeSidenav({ patchState }: StateContext<LayoutStateModel>) {
    patchState({
      showSidenav: false,
    });
  }
}
