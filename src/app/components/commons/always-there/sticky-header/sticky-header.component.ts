import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {HeaderOptionsEnum} from "../../../../models/enums/HeaderOptionsEnum";

@Component({
  selector: 'app-sticky-header',
  templateUrl: './sticky-header.component.html',
  styleUrls: ['./sticky-header.component.scss']
})
export class StickyHeaderComponent {

  readonly LOGO_ICON = "../../../../../assets/general/always-there-icons/finance_icon.png";
  readonly USER_MENU_ICON = "../../../../../assets/general/cards/register-login-card/user_icon.png";
  readonly APP_TITLE = "Coin Buddy";

  dropDownVisible: boolean = false;
  headerOptions = Object.values(HeaderOptionsEnum);

  constructor(private router: Router) {
  }

  changeVisibility() {
    this.dropDownVisible = !this.dropDownVisible;
  }

  navigateToOption(option: string) {
    let pathToNavigate = '';
    switch (option) {
      case(HeaderOptionsEnum.HOME):
        pathToNavigate = 'news';
        break;
      case(HeaderOptionsEnum.BANKS):
        pathToNavigate = 'bank-overview';
        break;
      case(HeaderOptionsEnum.CRYPTO):
        pathToNavigate = 'crypto-overview';
        break;
    }
    this.router.navigate([pathToNavigate]);
  }
}
