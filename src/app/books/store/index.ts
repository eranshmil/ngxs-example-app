import { BooksState } from './states/books.state';
import { SearchState } from './states/search.state';
import { CollectionState } from './states/collection.state';

export const BooksStates = [BooksState, SearchState, CollectionState];

export * from './states/books.state';
export * from './states/search.state';
export * from './states/collection.state';
export * from './actions/book.actions';
export * from './actions/collection.actions';
export * from './actions/search.actions';
