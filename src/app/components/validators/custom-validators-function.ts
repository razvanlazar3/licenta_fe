import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";
import {CustomFormControlErrorsEnum} from "./form-control-enum";

interface CustomValidatorFn extends ValidatorFn {
  (control: AbstractControl): ValidationErrors | null;
}

export const CUSTOM_VALIDATORS: { [key: string]: CustomValidatorFn } = {
  MINIMUM_1_UPPERCASE_LETTER: uppercaseCharacterValidator(),
  MINIMUM_1_LOWERCASE_LETTER: lowercaseCharacterValidator(),
  MINIMUM_1_SPECIAL_CHARACTER: specialCharacterValidator(),
  MINIMUM_1_NUMERIC_CHARACTER: min1NumericCharacterValidator(),
  NUMERICAL: numericalCharacterValidator(),
};

export const DYNAMIC_VALIDATORS: { [key: string]: (...args: any[]) => ValidatorFn } = {
  LESS_THAN_VALUE: lessThanValueValidator
};

function uppercaseCharacterValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const hasUppercase = /[A-Z]/.test(control.value);
    return hasUppercase ? null : {MINIMUM_1_UPPERCASE_LETTER: CustomFormControlErrorsEnum.MINIMUM_1_UPPERCASE_LETTER};
  }
}

function lowercaseCharacterValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const hasLowercase = /[a-z]/.test(control.value);
    return hasLowercase ? null : {MINIMUM_1_LOWERCASE_LETTER: CustomFormControlErrorsEnum.MINIMUM_1_LOWERCASE_LETTER};
  }
}

function specialCharacterValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const hasSpecialCharacter = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(control.value);
    return hasSpecialCharacter ? null : {MINIMUM_1_SPECIAL_CHARACTER: CustomFormControlErrorsEnum.MINIMUM_1_SPECIAL_CHARACTER};
  }
}

function min1NumericCharacterValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const hasNumericCharacter = /\d/.test(control.value);
    return hasNumericCharacter ? null : {MINIMUM_1_NUMERIC_CHARACTER: CustomFormControlErrorsEnum.MINIMUM_1_NUMERIC_CHARACTER};
  }
}

function numericalCharacterValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const isNumber = /^\d+$/.test(control.value);
    return isNumber ? null : {NUMERIC_CHARACTER: CustomFormControlErrorsEnum.NUMERIC_CHARACTER};
  };
}

function lessThanValueValidator(maxValue: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = parseFloat(control.value);
    if (!isNaN(value)) {
      return value <= maxValue ? null : {LESS_THAN_VALUE: CustomFormControlErrorsEnum.LESS_THAN_VALUE};
    }
    return null;
  }
}
