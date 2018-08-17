import { Book } from '../../models/book';

export class Load {
  static readonly type = '[Book] Load';

  constructor(public payload: Book) {}
}

export class Select {
  static readonly type = '[Book] Select';

  constructor(public payload: string) {}
}
