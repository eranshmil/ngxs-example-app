import { async, TestBed } from '@angular/core/testing';

import { NgxsModule, Store } from '@ngxs/store';

import { Book, generateMockBook } from '../../models/book';

import {
  collectionStateDefaults,
  CollectionState,
  RemoveBook,
  AddBook,
} from '../';

describe('Collection State', () => {
  let store: Store;

  const book: Book = generateMockBook();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([CollectionState])],
    }).compileComponents();

    store = TestBed.get(Store);
  }));

  it('[action] it should add book', async(() => {
    store.reset({ collection: collectionStateDefaults });

    store.dispatch(new AddBook(book));

    const actualIds = store.selectSnapshot(state => state.collection.ids);
    expect(actualIds).toEqual([book.id]);
  }));

  it('[action] it should remove book', async(() => {
    store.reset({ collection: { ...collectionStateDefaults, ids: [book.id] } });

    store.dispatch(new RemoveBook(book));

    const actualIds = store.selectSnapshot(state => state.collection.ids);
    expect(actualIds).toEqual([]);
  }));
});
