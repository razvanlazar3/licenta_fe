import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent {
  @Input() isDropdownVisible = false;

  readonly LOGOUT = "Logout";

  constructor(private router: Router) {
  }

  logout() {
    sessionStorage.setItem("token", '');
    this.router.navigate(['']);
  }
}
