import { TestBed, ComponentFixture } from '@angular/core/testing';
import { MatInputModule, MatCardModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { NgxsModule, Store } from '@ngxs/store';

import { LoginPageComponent } from './login-page.component';
import { LoginFormComponent } from '../components/login-form.component';
import { AuthStates, Login } from '../store';
import { AuthService } from '../services/auth.service';

describe('Login Page', () => {
  let fixture: ComponentFixture<LoginPageComponent>;
  let store: Store;
  let instance: LoginPageComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        NgxsModule.forRoot(AuthStates),
        MatInputModule,
        MatCardModule,
        ReactiveFormsModule,
      ],
      declarations: [LoginPageComponent, LoginFormComponent],
      providers: [AuthService],
    });

    fixture = TestBed.createComponent(LoginPageComponent);
    instance = fixture.componentInstance;
    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();
  });

  /**
   * Container components are used as integration points for connecting
   * the store to presentational components and dispatching
   * actions to the store.
   *
   * Container methods that dispatch events are like a component's output observables.
   * Container properties that select state from store are like a component's input properties.
   * If pure components are functions of their inputs, containers are functions of state
   *
   * Traditionally you would query the components rendered template
   * to validate its state. Since the components are analogous to
   * pure functions, we take snapshots of these components for a given state
   * to validate the rendered output and verify the component's output
   * against changes in state.
   */
  it('should compile', () => {
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should dispatch a login event on submit', () => {
    const $event: any = {};
    const action = new Login($event);

    instance.onSubmit($event);

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });
});
