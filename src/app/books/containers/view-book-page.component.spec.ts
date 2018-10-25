import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

import { NgxsModule, Store } from '@ngxs/store';

import { ViewBookPageComponent } from './view-book-page.component';
import { SelectedBookPageComponent } from './selected-book-page.component';
import { BookDetailComponent } from '../components/book-detail.component';
import { BookAuthorsComponent } from '../components/book-authors.component';
import { AddCommasPipe } from '../../shared/pipes/add-commas.pipe';
import { BooksStates, Select } from '../store';
import { GoogleBooksService } from '../../core/services/google-books.service';

describe('View Book Page', () => {
  const params = new BehaviorSubject({});
  let fixture: ComponentFixture<ViewBookPageComponent>;
  let store: Store;
  let instance: ViewBookPageComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatCardModule, NgxsModule.forRoot(BooksStates)],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { params },
        },
        HttpClient,
        {
          provide: GoogleBooksService,
          useValue: { searchBooks: () => {} },
        },
      ],
      declarations: [
        ViewBookPageComponent,
        SelectedBookPageComponent,
        BookDetailComponent,
        BookAuthorsComponent,
        AddCommasPipe,
      ],
    });

    fixture = TestBed.createComponent(ViewBookPageComponent);
    instance = fixture.componentInstance;
    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should compile', () => {
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should dispatch a Select action on init', () => {
    const action = new Select('2');
    params.next({ id: '2' });

    fixture.detectChanges();

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });
});
