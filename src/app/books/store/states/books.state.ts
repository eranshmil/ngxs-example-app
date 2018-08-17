import { Action, Selector, State, StateContext } from '@ngxs/store';

import { Book } from '../../models/book';
import { SearchState, SearchStateModel } from './search.state';
import { CollectionState, CollectionStateModel } from './collection.state';
import { Load, Select } from '../actions/book.actions';
import { SearchComplete } from '../actions/search.actions';

export const arrayToObject = entities => {
  return entities.reduce((obj, book: Book) => {
    return { ...obj, [book.id]: book };
  }, {});
};

export interface BooksStateModel {
  ids: string[];
  entities: {
    [id: string]: Book;
  };
  selectedBookId: string | null;
}

export const booksStateDefaults: BooksStateModel = {
  ids: [],
  entities: {},
  selectedBookId: null,
};

@State<BooksStateModel>({
  name: 'books',
  defaults: booksStateDefaults,
  children: [SearchState, CollectionState],
})
export class BooksState {
  @Selector()
  static getEntities(state: BooksStateModel) {
    return state.entities;
  }

  @Selector()
  static getSelectedId(state: BooksStateModel) {
    return state.selectedBookId;
  }

  @Selector()
  static getSelectedBook(state: BooksStateModel) {
    return state.selectedBookId && state.entities[state.selectedBookId];
  }

  @Selector([CollectionState])
  static isSelectedBookInCollection(
    state: BooksStateModel,
    collectionState: CollectionStateModel
  ) {
    return collectionState.ids.indexOf(state.selectedBookId) > -1;
  }

  @Selector([CollectionState])
  static getBookCollection(
    state: BooksStateModel,
    collectionState: CollectionStateModel
  ): Book[] {
    const entities = state.entities;
    const ids = [...collectionState.ids];

    return ids.map(id => entities[id]);
  }

  @Selector([SearchState])
  static getSearchResults(
    state: BooksStateModel,
    searchState: SearchStateModel
  ) {
    const searchIds = [...searchState.ids];
    const books = state.entities;

    return searchIds.map(id => books[id]);
  }

  @Action(Load)
  load({ getState, patchState }: StateContext<BooksStateModel>, action: Load) {
    const state = getState();
    const book = action.payload;

    patchState({
      ids: [...state.ids, book.id],
      entities: { ...state.entities, [book.id]: book },
    });
  }

  @Action(Select)
  select({ patchState }: StateContext<BooksStateModel>, action: Select) {
    patchState({ selectedBookId: action.payload });
  }

  @Action(SearchComplete)
  searchComplete(
    { getState, patchState }: StateContext<BooksStateModel>,
    action: SearchComplete
  ) {
    const state = getState();
    const ids = action.payload.map<string>(book => book.id);
    const entities = arrayToObject(action.payload);

    patchState({
      ids: [...state.ids, ...ids],
      entities: { ...state.entities, ...entities },
    });
  }
}
