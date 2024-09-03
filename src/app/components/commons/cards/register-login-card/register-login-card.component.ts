import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {getErrors} from '../../../validators/form-control-errors';
import {CUSTOM_VALIDATORS} from "../../../validators/custom-validators-function";
import {User} from "../../../../models/UserModel";
import {UserService} from "../../../../services/UserService";

@Component({
  selector: 'register-login-card',
  templateUrl: './register-login-card.component.html',
  styleUrls: ['./register-login-card.component.scss']
})
export class RegisterLoginCardComponent implements OnInit {
  readonly WELCOME_TEXT = "WELCOME";
  readonly WELCOME_BACK_TEXT = "WELCOME BACK";
  readonly USERNAME_TEXT = "Username";
  readonly PASSWORD_TEXT = "Password";
  readonly EMAIL_TEXT = "Email";
  readonly NO_ACCOUNT = "Don't have an account yet?";
  readonly LOGIN = "SignUp";
  readonly PASSWORD = "password";
  readonly EMAIL = "email";
  readonly NAME = "name";

  readonly PASSWORD_ICON = "assets/general/cards/register-login-card/password_icon.png";
  readonly USERNAME_ICON = "assets/general/cards/register-login-card/user_icon.png";
  readonly EMAIL_ICON = "assets/general/cards/register-login-card/email-icon.png";
  readonly REGISTER_ICON = "../../../../../assets/general/always-there-icons/money_bag.png";
  readonly FINANCE_ICON ="../../../../../assets/general/always-there-icons/finance_icon.png";

  @Input() isSignUp = true;

  login_or_signup = 'SignUp';
  form!: FormGroup;
  welcomeText!: string;

  constructor(private router: Router,
              private fb: FormBuilder,
              private userService: UserService) {
  }

  ngOnInit() {
    if (!this.isSignUp) {
      this.login_or_signup = 'Login';
      this.welcomeText = this.WELCOME_BACK_TEXT;
    } else {
      this.welcomeText = this.WELCOME_TEXT;
    }
    this.initForm();
  }

  initForm(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required,
        Validators.minLength(8),
        CUSTOM_VALIDATORS['MINIMUM_1_UPPERCASE_LETTER'],
        CUSTOM_VALIDATORS['MINIMUM_1_LOWERCASE_LETTER'],
        CUSTOM_VALIDATORS['MINIMUM_1_SPECIAL_CHARACTER'],
        CUSTOM_VALIDATORS['MINIMUM_1_NUMERIC_CHARACTER']
      ]]
    });

    if (this.isSignUp) {
      this.form.addControl('name', this.fb.control('', [Validators.required]));
    } else this.form.removeControl('name');
  }

  getErrors(formControlName: string): string[] {
    const control = this.form.get(formControlName);
    if (control) {
      return getErrors(control);
    } else {
      return [];
    }
  }

  private clearForm() {
    this.form.controls?.['name']?.setValue('');
    this.form.controls?.['email'].setValue('');
    this.form.controls?.['password'].setValue('');
  }

  redirectToSignUp() {
    this.router.navigate(['register']);
  }

  registerOrLogin() {
    if (this.form.valid) {
      if (this.isSignUp) {
        const user = new User(this.form.value.email, this.form.value.password, this.form.value.name);
        this.userService.signup(user).subscribe
        (() => {
          this.router.navigate(['news']);
        });
      } else {
        const user = new User(this.form.value.email, this.form.value.password);
        this.userService.login(user).subscribe
        ((response) => {
          sessionStorage.setItem("token", response.token);
          this.router.navigate(['news']);
        });
      }
      this.clearForm();
    } else {
      this.form.markAllAsTouched();
    }
  }
}
