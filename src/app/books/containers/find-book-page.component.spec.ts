import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
  MatCardModule,
  MatInputModule,
  MatProgressSpinnerModule,
} from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { cold } from 'jasmine-marbles';
import { NgxsModule, Store } from '@ngxs/store';

import { BookSearchComponent } from '../components/book-search.component';
import { BookPreviewComponent } from '../components/book-preview.component';
import { BookPreviewListComponent } from '../components/book-preview-list.component';
import { RouterTestingModule } from '@angular/router/testing';
import { EllipsisPipe } from '../../shared/pipes/ellipsis.pipe';
import { BookAuthorsComponent } from '../components/book-authors.component';
import { AddCommasPipe } from '../../shared/pipes/add-commas.pipe';
import { FindBookPageComponent } from './find-book-page.component';
import { BooksStates, Search } from '../store';
import { GoogleBooksService } from '../../core/services/google-books.service';

describe('Find Book Page', () => {
  let fixture: ComponentFixture<FindBookPageComponent>;
  let store: Store;
  let googleBooksService: any;
  let instance: FindBookPageComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        NoopAnimationsModule,
        NgxsModule.forRoot(BooksStates),
        RouterTestingModule,
        MatInputModule,
        MatCardModule,
        MatProgressSpinnerModule,
        ReactiveFormsModule,
      ],
      declarations: [
        FindBookPageComponent,
        BookSearchComponent,
        BookPreviewComponent,
        BookPreviewListComponent,
        BookAuthorsComponent,
        AddCommasPipe,
        EllipsisPipe,
      ],
      providers: [
        {
          provide: GoogleBooksService,
          useValue: { searchBooks: jest.fn() },
        },
      ],
    });

    fixture = TestBed.createComponent(FindBookPageComponent);
    instance = fixture.componentInstance;
    store = TestBed.get(Store);
    googleBooksService = TestBed.get(GoogleBooksService);

    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should compile', () => {
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should dispatch a Search action on search', () => {
    const $event: string = 'book name';
    const action = new Search($event);
    const response = cold('-a|', { a: [] });
    googleBooksService.searchBooks = jest.fn(() => response);

    instance.search($event);

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });
});
