import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';

import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';

import { AppStates } from './core/store';
import { AppComponent } from './core/containers/app.component';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AuthModule.forRoot(),
    AppRoutingModule,

    NgxsModule.forRoot(AppStates, {
      developmentMode: !environment.production,
    }),
    /*NgxsStoragePluginModule.forRoot({
      key: ['books'],
    }),*/
    NgxsRouterPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot({
      name: 'Ngxs Book Store DevTools',
      disabled: environment.production,
    }),
    NgxsLoggerPluginModule.forRoot({
      disabled: environment.production,
    }),

    CoreModule.forRoot(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
