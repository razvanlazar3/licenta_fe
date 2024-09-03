import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BanksAdditionComponent} from "./components/banks-addition/banks-addition.component";
import {LoginPageComponent} from "./components/login-page/login-page.component";
import {NewsPageComponent} from './components/news-page/news-page.component';
import {RegisterPageComponent} from "./components/register-page/register-page.component";
import {BanksOverviewPageComponent} from "./components/banks-overview-page/banks-overview-page.component";
import {CryptoAdditionPageComponent} from "./components/crypto-addition-page/crypto-addition-page.component";
import {CryptoOverviewPageComponent} from "./components/crypto-overview-page/crypto-overview-page.component";

const routes: Routes = [
  {path: '', component: LoginPageComponent},
  {path: 'bank-addition', component: BanksAdditionComponent},
  {path: 'bank-overview', component: BanksOverviewPageComponent},
  {path: 'crypto-addition', component: CryptoAdditionPageComponent},
  {path: 'crypto-overview', component: CryptoOverviewPageComponent},
  {path: 'news', component: NewsPageComponent},
  {path: 'register', component: RegisterPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
