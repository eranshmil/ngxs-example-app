import { Action, Selector, State, StateContext } from '@ngxs/store';

import { AddBook, RemoveBook } from '../actions/collection.actions';

export interface CollectionStateModel {
  loaded: boolean;
  loading: boolean;
  ids: string[];
}

export const collectionStateDefaults: CollectionStateModel = {
  loaded: false,
  loading: false,
  ids: [],
};

@State<CollectionStateModel>({
  name: 'collection',
  defaults: collectionStateDefaults,
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
    const bookId = action.payload.id;

    if (state.ids.indexOf(action.payload.id) === -1) {
      patchState({ ids: [...state.ids, bookId] });
    }
  }

  @Action(RemoveBook)
  removeBook(
    { getState, patchState }: StateContext<CollectionStateModel>,
    action: RemoveBook
  ) {
    const state = getState();
    const bookId = action.payload.id;

    patchState({ ids: state.ids.filter(id => id !== bookId) });
  }
}
