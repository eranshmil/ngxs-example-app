import { TestBed, waitForAsync } from '@angular/core/testing';

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

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [NgxsModule.forRoot([CollectionState])],
      }).compileComponents();

      store = TestBed.inject(Store);
    })
  );

  it(
    '[action] it should add book',
    waitForAsync(() => {
      store.reset({ collection: collectionStateDefaults });

      store.dispatch(new AddBook(book));

      const actualIds = store.selectSnapshot((state) => state.collection.ids);
      expect(actualIds).toEqual([book.id]);
    })
  );

  it(
    '[action] it should remove book',
    waitForAsync(() => {
      store.reset({
        collection: { ...collectionStateDefaults, ids: [book.id] },
      });

      store.dispatch(new RemoveBook(book));

      const actualIds = store.selectSnapshot((state) => state.collection.ids);
      expect(actualIds).toEqual([]);
    })
  );
});
