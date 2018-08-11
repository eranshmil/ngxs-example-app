import { Component, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { Store } from '@ngxs/store';

import { Select } from '../store';

/**
 * Note: Container components are also reusable. Whether or not
 * a component is a presentation component or a container
 * component is an implementation detail.
 *
 * The View Book Page's responsibility is to map router params
 * to a 'Select' book action. Actually showing the selected
 * book remains a responsibility of the
 * SelectedBookPageComponent
 */
@Component({
  selector: 'bc-view-book-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <bc-selected-book-page></bc-selected-book-page>
  `,
})
export class ViewBookPageComponent implements OnDestroy {
  actionsSubscription: Subscription;

  constructor(store: Store, route: ActivatedRoute) {
    this.actionsSubscription = route.params
      .pipe(
        map(params => new Select(params.id)),
        tap((action: Select) => store.dispatch(action))
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.actionsSubscription.unsubscribe();
  }
}
