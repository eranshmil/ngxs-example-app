import { Book } from '../../models/book';

export class AddBook {
  static readonly type = '[Collection] Add Book';

  constructor(public payload: Book) {}
}

export class RemoveBook {
  static readonly type = '[Collection] Remove Book';

  constructor(public payload: Book) {}
}
