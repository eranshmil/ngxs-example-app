import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';

import { NgxsModule, Store } from '@ngxs/store';

import { CoreModule } from '../../core/core.module';
import { CollectionPageComponent } from './collection-page.component';
import { BookPreviewListComponent } from '../components/book-preview-list.component';
import { BookPreviewComponent } from '../components/book-preview.component';
import { EllipsisPipe } from '../../shared/pipes/ellipsis.pipe';
import { AddCommasPipe } from '../../shared/pipes/add-commas.pipe';
import { BookAuthorsComponent } from '../components/book-authors.component';
import { BooksStates } from '../store';

describe('Collection Page', () => {
  let fixture: ComponentFixture<CollectionPageComponent>;
  let store: Store;
  let instance: CollectionPageComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CoreModule.forRoot(),
        HttpClientModule,
        NoopAnimationsModule,
        NgxsModule.forRoot(BooksStates),
        MatCardModule,
        MatInputModule,
        RouterTestingModule,
      ],
      declarations: [
        CollectionPageComponent,
        BookPreviewListComponent,
        BookPreviewComponent,
        BookAuthorsComponent,
        AddCommasPipe,
        EllipsisPipe,
      ],
    });

    fixture = TestBed.createComponent(CollectionPageComponent);
    instance = fixture.componentInstance;
    store = TestBed.inject(Store);

    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should compile', () => {
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });
});
