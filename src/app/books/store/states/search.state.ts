import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

import { Action, Selector, State, StateContext } from '@ngxs/store';

import { Search, SearchComplete, SearchError } from '../actions/search.actions';
import { Book } from '../../models/book';
import { GoogleBooksService } from '../../../core/services/google-books.service';

export interface SearchStateModel {
  ids: string[];
  loading: boolean;
  error: string;
  query: string;
}

export const searchStateDefaults: SearchStateModel = {
  ids: [],
  loading: false,
  error: '',
  query: '',
};

@State<SearchStateModel>({
  name: 'search',
  defaults: searchStateDefaults,
})
export class SearchState {
  constructor(private googleBooks: GoogleBooksService) {}

  @Selector()
  static getIds(state: SearchStateModel) {
    return state.ids;
  }

  @Selector()
  static getQuery(state: SearchStateModel) {
    return state.query;
  }

  @Selector()
  static getLoading(state: SearchStateModel) {
    return state.loading;
  }

  @Selector()
  static getError(state: SearchStateModel) {
    return state.error;
  }

  @Action(Search, { cancelUncompleted: true })
  search(
    { dispatch, patchState }: StateContext<SearchStateModel>,
    action: Search
  ) {
    const query = action.payload;

    if (query === '') {
      patchState({
        ids: [],
        loading: false,
        error: '',
        query,
      });
    }

    patchState({
      loading: true,
      error: '',
      query,
    });

    return this.googleBooks.searchBooks(action.payload).pipe(
      map((books: Book[]) => dispatch(new SearchComplete(books))),
      catchError(err => {
        dispatch(new SearchError(err.error.error.message));

        return of(new SearchError(err));
      })
    );
  }

  @Action(SearchComplete)
  searchComplete(
    { patchState }: StateContext<SearchStateModel>,
    action: SearchComplete
  ) {
    patchState({
      ids: action.payload.map(book => book.id),
      loading: false,
      error: '',
    });
  }

  @Action(SearchError)
  searchError(
    { patchState }: StateContext<SearchStateModel>,
    action: SearchError
  ) {
    patchState({
      loading: false,
      error: action.payload,
    });
  }
}
