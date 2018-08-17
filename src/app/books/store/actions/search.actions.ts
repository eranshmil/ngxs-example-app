import { Book } from '../../models/book';

export class Search {
  static readonly type = '[Book] Search';

  constructor(public payload: string) {}
}

export class SearchComplete {
  static readonly type = '[Book] Search Complete';

  constructor(public payload: Book[]) {}
}

export class SearchError {
  static readonly type = '[Book] Search Error';

  constructor(public payload: string) {}
}
