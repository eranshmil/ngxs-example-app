import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';

import { Store, Select } from '@ngxs/store';

import { Book } from '../models/book';
import { AddBook, BooksState, RemoveBook } from '../store';

@Component({
  selector: 'bc-selected-book-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <bc-book-detail
      [book]="book$ | async"
      [inCollection]="isSelectedBookInCollection$ | async"
      (add)="addToCollection($event)"
      (remove)="removeFromCollection($event)"
    >
    </bc-book-detail>
  `,
})
export class SelectedBookPageComponent {
  @Select(BooksState.getSelectedBook) book$: Observable<Book>;
  @Select(BooksState.isSelectedBookInCollection)
  isSelectedBookInCollection$: Observable<boolean>;

  constructor(private store: Store) {}

  addToCollection(book: Book) {
    this.store.dispatch(new AddBook(book));
  }

  removeFromCollection(book: Book) {
    this.store.dispatch(new RemoveBook(book));
  }
}
