import { Action, Selector, State, StateContext } from '@ngxs/store';

import { AddBook, RemoveBook } from '../actions/collection.actions';

export interface CollectionStateModel {
  loaded: boolean;
  loading: boolean;
  ids: string[];
}

@State<CollectionStateModel>({
  name: 'collection',
  defaults: {
    loaded: false,
    loading: false,
    ids: [],
  },
})
export class CollectionState {
  @Selector()
  static getLoaded(state: CollectionStateModel) {
    return state.loaded;
  }

  @Selector()
  static getLoading(state: CollectionStateModel) {
    return state.loading;
  }

  @Selector()
  static getIds(state: CollectionStateModel) {
    return state.ids;
  }

  @Action(AddBook)
  addBook(
    { getState, patchState }: StateContext<CollectionStateModel>,
    action: AddBook
  ) {
    const state = getState();

    if (state.ids.indexOf(action.payload.id) === -1) {
      patchState({ ids: [...state.ids, action.payload.id] });
    }
  }

  @Action(RemoveBook)
  removeBook(
    { getState, patchState }: StateContext<CollectionStateModel>,
    action: RemoveBook
  ) {
    const state = getState();

    patchState({ ids: state.ids.filter(id => id !== action.payload.id) });
  }
}
