import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ManagerPageComponent } from './components/manager-page/manager-page.component';
import { ClientPageComponent } from './components/client-page/client-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { ToViewComponent } from './components/to-view/to-view.component';
import { ToRowComponent } from './components/to-row/to-row.component';
import { AddManagerModalComponent } from './components/add-manager-modal/add-manager-modal.component';
import { AddToModalComponent } from './components/add-to-modal/add-to-modal.component';
import { HttpClientModule } from '@angular/common/http';
import { ChooseStatusModalComponent } from './components/choose-status-modal/choose-status-modal.component';
import { DatePipe } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { FormsModule } from '@angular/forms';

registerLocaleData(localeRu, 'ru');

@NgModule({
  declarations: [
    AppComponent,
    ManagerPageComponent,
    ClientPageComponent,
    LoginPageComponent,
    ToViewComponent,
    ToRowComponent,
    AddManagerModalComponent,
    AddToModalComponent,
    ChooseStatusModalComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [DatePipe, { provide: LOCALE_ID, useValue: 'ru' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
