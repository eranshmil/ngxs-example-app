import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Search, SearchComplete, SearchError } from '../actions/book.actions';

export interface SearchStateModel {
  ids: string[];
  loading: boolean;
  error: string;
  query: string;
}

@State<SearchStateModel>({
  name: 'search',
  defaults: {
    ids: [],
    loading: false,
    error: '',
    query: '',
  },
})
export class SearchState {
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

  @Action(Search)
  search({ patchState }: StateContext<SearchStateModel>, action: Search) {
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
