import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

import { Action, Selector, State, StateContext } from '@ngxs/store';

import { EntityBase, EntityStateModel } from '../../../core/store/entity-base';

import { Book } from '../../models/book';
import { SearchState, SearchStateModel } from './search.state';
import { CollectionState, CollectionStateModel } from './collection.state';
import {
  Load,
  Search,
  SearchComplete,
  SearchError,
  Select,
} from '../actions/book.actions';
import { GoogleBooksService } from '../../../core/services/google-books.service';

export interface BooksStateModel extends EntityStateModel<Book> {
  selectedBookId: string | null;
  search?: SearchStateModel;
  collection?: CollectionStateModel;
}

@State<BooksStateModel>({
  name: 'books',
  defaults: {
    ...BooksState.defaults(),
    selectedBookId: null,
  },
  children: [SearchState, CollectionState],
})
export class BooksState extends EntityBase<Book, BooksStateModel> {
  constructor(private googleBooks: GoogleBooksService) {
    super();
  }

  @Selector()
  static getEntities(state: BooksStateModel) {
    return this.selectEntities(state);
  }

  @Selector()
  static getSelectedId(state: BooksStateModel) {
    return state.selectedBookId;
  }

  @Selector()
  static getSelectedBook(state: BooksStateModel) {
    return state.selectedBookId && state.entities[state.selectedBookId];
  }

  @Selector()
  static isSelectedBookInCollection(state: BooksStateModel) {
    return state.collection.ids.indexOf(state.selectedBookId) > -1;
  }

  @Selector()
  static getBookCollection(state: BooksStateModel) {
    const entities = state.entities;
    const ids = [...state.collection.ids];

    return ids.map(id => entities[id]);
  }

  @Selector()
  static getSearchResults(state: BooksStateModel) {
    const searchIds = [...state.search.ids];
    const books = state.entities;

    return searchIds.map(id => books[id]);
  }

  @Action(Load)
  load(ctx: StateContext<BooksStateModel>, action: Load) {
    return this.addOne(action.payload);
  }

  @Action(Select)
  select({ patchState }: StateContext<BooksStateModel>, action: Select) {
    patchState({ selectedBookId: action.payload });
  }

  @Action(Search, { cancelUncompleted: true })
  search({ dispatch }: StateContext<BooksStateModel>, action: Search) {
    return this.googleBooks.searchBooks(action.payload).pipe(
      map((books: Book[]) => dispatch(new SearchComplete(books))),
      catchError(err => {
        dispatch(new SearchError(err.error.error.message));

        return of(new SearchError(err));
      })
    );
  }

  @Action(SearchComplete)
  searchComplete({  }: StateContext<BooksStateModel>, action: SearchComplete) {
    return this.addMany(action.payload);
  }
}
