import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';

import { Select, Store } from '@ngxs/store';

import { Book } from '../models/book';
import { BooksState, SearchState, Search } from '../store';

@Component({
  selector: 'bc-find-book-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <bc-book-search
      [query]="searchQuery$ | async"
      [searching]="loading$ | async"
      [error]="error$ | async"
      (search)="search($event)"
    ></bc-book-search>
    <bc-book-preview-list [books]="books$ | async"></bc-book-preview-list>
  `,
})
export class FindBookPageComponent {
  @Select(SearchState.getQuery) searchQuery$: Observable<string>;
  @Select(BooksState.getSearchResults) books$: Observable<Book[]>;
  @Select(SearchState.getLoading) loading$: Observable<boolean>;
  @Select(SearchState.getError) error$: Observable<string>;

  constructor(private store: Store) {}

  search(query: string) {
    this.store.dispatch(new Search(query));
  }
}
