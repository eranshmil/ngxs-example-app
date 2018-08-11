import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxsModule } from '@ngxs/store';

import { ComponentsModule } from './components';
import { BookExistsGuard } from './guards/book-exists.guard';

import { FindBookPageComponent } from './containers/find-book-page.component';
import { ViewBookPageComponent } from './containers/view-book-page.component';
import { SelectedBookPageComponent } from './containers/selected-book-page.component';
import { CollectionPageComponent } from './containers/collection-page.component';
import { MaterialModule } from '../material';

import { BooksRoutingModule } from './books-routing.module';
import { BooksStates } from './store';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ComponentsModule,
    BooksRoutingModule,

    NgxsModule.forFeature(BooksStates),
  ],
  declarations: [
    FindBookPageComponent,
    ViewBookPageComponent,
    SelectedBookPageComponent,
    CollectionPageComponent,
  ],
  providers: [BookExistsGuard],
})
export class BooksModule {}
