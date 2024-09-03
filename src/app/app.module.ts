import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginPageComponent} from './components/login-page/login-page.component';
import {RegisterPageComponent} from './components/register-page/register-page.component';
import {RegisterLoginCardComponent} from './components/commons/cards/register-login-card/register-login-card.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ButtonComponent} from './components/commons/basics/button/button.component';
import {InputComponent} from './components/commons/basics/input/input.component';
import {StickyHeaderComponent} from './components/commons/always-there/sticky-header/sticky-header.component';
import {UserMenuComponent} from './components/commons/always-there/user-menu/user-menu.component';
import {
  GeneralPageIntroComponent
} from './components/commons/always-there/general-page-intro/general-page-intro.component';
import {BankCardComponent} from './components/commons/cards/bank-card/bank-card.component';
import {BanksAdditionComponent} from './components/banks-addition/banks-addition.component';
import {TagComponent} from './components/commons/basics/tag/tag.component';
import {NewsPageComponent} from './components/news-page/news-page.component';
import {NewsCardComponent} from './components/commons/cards/news-card/news-card.component';
import {
  BankAdditionModalComponent
} from './components/commons/modals/bank-addition-modal/bank-addition-modal.component';
import {DropdownComponent} from './components/commons/basics/dropdown/dropdown.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDialogModule} from "@angular/material/dialog";
import {BanksOverviewPageComponent} from './components/banks-overview-page/banks-overview-page.component';
import {NgApexchartsModule} from "ng-apexcharts";
import { TableComponent } from './components/commons/basics/table/table.component';
import { ConfirmationModalComponent } from './components/commons/modals/confirmation-modal/confirmation-modal.component';
import { CryptoAdditionPageComponent } from './components/crypto-addition-page/crypto-addition-page.component';
import { CryptoAdditionModalComponent } from './components/commons/modals/crypto-addition-modal/crypto-addition-modal.component';
import { CryptoOverviewPageComponent } from './components/crypto-overview-page/crypto-overview-page.component';
import { CryptoDeletionModalComponent } from './components/commons/modals/crypto-deletion-modal/crypto-deletion-modal.component';
import { PaginationComponent } from './components/commons/basics/pagination/pagination.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    RegisterPageComponent,
    RegisterLoginCardComponent,
    ButtonComponent,
    InputComponent,
    StickyHeaderComponent,
    UserMenuComponent,
    GeneralPageIntroComponent,
    BankCardComponent,
    BanksAdditionComponent,
    TagComponent,
    NewsPageComponent,
    NewsCardComponent,
    BankAdditionModalComponent,
    DropdownComponent,
    BanksOverviewPageComponent,
    TableComponent,
    ConfirmationModalComponent,
    CryptoAdditionPageComponent,
    CryptoAdditionModalComponent,
    CryptoOverviewPageComponent,
    CryptoDeletionModalComponent,
    PaginationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatDialogModule,
    FormsModule,
    HttpClientModule,
    NgApexchartsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
