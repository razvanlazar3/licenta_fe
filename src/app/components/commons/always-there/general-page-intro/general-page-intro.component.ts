import {Component, Input} from '@angular/core';
import {GeneralPageOptionsEnum} from "../../../../models/enums/GeneralPageOptionEnum";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-general-intro',
  templateUrl: './general-page-intro.component.html',
  styleUrls: ['./general-page-intro.component.scss']
})
export class GeneralPageIntroComponent {
  @Input() selectedOption!: GeneralPageOptionsEnum;

  readonly OVERVIEW_ICON = "../../../assets/general//always-there-icons/eye_icon.png";
  readonly ADD_ICON = "../../../assets/general//always-there-icons/add-icon.png";
  readonly generalOptionsIcons = [this.OVERVIEW_ICON, this.ADD_ICON];
  readonly generalPageOptions = Object.values(GeneralPageOptionsEnum);

  constructor(private route: ActivatedRoute, private router: Router) {}

  selectOption(option: GeneralPageOptionsEnum) {
    if (this.router.url.includes('crypto')) {
      option === GeneralPageOptionsEnum.OVERVIEW ? this.router.navigate(['crypto-overview'])
        : this.router.navigate(['crypto-addition']);
    } else if (this.router.url.includes('bank')) {
      option === GeneralPageOptionsEnum.OVERVIEW ? this.router.navigate(['bank-overview'])
        : this.router.navigate(['bank-addition']);
    } else this.router.navigate(['news']);
  }
}
