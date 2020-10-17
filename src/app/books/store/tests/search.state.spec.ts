import { waitForAsync, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';

import { NgxsModule, Store } from '@ngxs/store';

import { Book, generateMockBook } from '../../models/book';
import { GoogleBooksService } from '../../../core/services/google-books.service';

import { Search } from '../actions/search.actions';
import { SearchState, searchStateDefaults } from '../states/search.state';

describe('Books State', () => {
  let store: Store;
  let googleBooksService: GoogleBooksService;

  const book1: Book = generateMockBook();

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [NgxsModule.forRoot([SearchState])],
        providers: [
          {
            provide: GoogleBooksService,
            useValue: { searchBooks: jest.fn() },
          },
        ],
      }).compileComponents();

      store = TestBed.inject(Store);
      store.reset({ search: searchStateDefaults });
      googleBooksService = TestBed.inject(GoogleBooksService);
    })
  );

  it(
    '[action] it should search a book',
    waitForAsync(() => {
      const response = of([book1]);
      googleBooksService.searchBooks = jest.fn(() => response);

      store.dispatch(new Search('title'));

      const actualIds = store.selectSnapshot((state) => state.search.ids);
      expect(actualIds).toEqual([book1.id]);
    })
  );

  it(
    '[action] it should search and throw error',
    waitForAsync(() => {
      const expectedError = 'error message';
      const response = throwError({
        error: { error: { message: expectedError } },
      });
      googleBooksService.searchBooks = jest.fn(() => response);

      store.dispatch(new Search('title'));

      const actualError = store.selectSnapshot((state) => state.search.error);
      expect(actualError).toEqual(expectedError);
    })
  );
});
