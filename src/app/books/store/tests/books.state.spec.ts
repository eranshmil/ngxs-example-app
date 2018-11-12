import { async, TestBed } from '@angular/core/testing';

import { NgxsModule, Store } from '@ngxs/store';
import { MockProvider } from 'ngx-mock-provider';

import { Book, generateMockBook } from '../../models/book';
import { GoogleBooksService } from '../../../core/services/google-books.service';

import {
  Load,
  Select,
  BooksState,
  booksStateDefaults,
  BooksStates,
  collectionStateDefaults,
  CollectionStateModel,
  SearchComplete,
  searchStateDefaults,
} from '../';

describe('Books State', () => {
  let store: Store;

  const book1: Book = generateMockBook();
  const book2: Book = { ...generateMockBook(), id: '2' };

  const ids: string[] = [book1.id, book2.id];
  const entities: { [id: string]: Book } = {
    [book1.id]: book1,
    [book2.id]: book2,
  };

  const collection: CollectionStateModel = {
    ...collectionStateDefaults,
    ids: ['1'],
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot(BooksStates)],
      providers: [
        MockProvider({
          provider: GoogleBooksService,
        }),
      ],
    }).compileComponents();

    store = TestBed.get(Store);
    store.reset({ books: booksStateDefaults });
  }));

  it('[action] it should load a book', async(() => {
    store.dispatch(new Load(book1));

    const actualEntities = store.selectSnapshot(state => state.books.entities);

    expect(actualEntities).toEqual({
      [book1.id]: book1,
    });
  }));

  it('[action] it should select a book', async(() => {
    store.dispatch(new Select(book2.id));

    const actualSelectedBookId = store.selectSnapshot(
      state => state.books.selectedBookId
    );
    expect(actualSelectedBookId).toEqual(book2.id);
  }));

  it('[action] it should fill entities on search complete', async(() => {
    store.dispatch(new SearchComplete([book1, book2]));

    const actualState = store.selectSnapshot(state => state.books);
    expect(actualState.ids).toEqual(ids);
    expect(actualState.entities).toEqual(entities);
  }));

  it('[selector] it should get selected book', () => {
    const selector = BooksState.getSelectedBook({
      ids,
      entities,
      selectedBookId: '2',
    });

    expect(selector).toEqual(book2);
  });

  it('[selector] it should check if selected book in collection', () => {
    const selector1 = BooksState.isSelectedBookInCollection(
      { ids, entities, selectedBookId: '1' },
      collection
    );
    const selector2 = BooksState.isSelectedBookInCollection(
      { ids, entities, selectedBookId: '2' },
      collection
    );

    expect(selector1).toBe(true);
    expect(selector2).toBe(false);
  });

  it('[selector] it should get book collection', () => {
    const selector = BooksState.getBookCollection(
      { ...booksStateDefaults, ids, entities },
      collection
    );
    const expected = [book1];

    expect(selector).toEqual(expected);
  });

  it('[selector] it should get search results', () => {
    const selector = BooksState.getSearchResults(
      { ...booksStateDefaults, ids, entities },
      { ...searchStateDefaults, ids: ['2'] }
    );
    const expected = [book2];

    expect(selector).toEqual(expected);
  });
});
