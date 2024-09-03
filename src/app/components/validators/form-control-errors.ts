import {AbstractControl} from '@angular/forms';
import {CUSTOM_VALIDATORS} from "./custom-validators-function";
import {BasicFormControlErrorsEnum, CustomFormControlErrorsEnum} from "./form-control-enum";

export function hasErrors(formControl: AbstractControl) {
  return formControl.invalid && (formControl.dirty || formControl.touched);
}

export function hasError(formControl: AbstractControl, type: string): boolean {
  return formControl.errors ? formControl.errors[type] : false;
}

export function hasCustomError(formControl: AbstractControl): string[] {
  if (!formControl.errors) {
    return [];
  }

  const errors: string[] = [];

  Object.keys(formControl.errors).forEach(error => {

    if (Object.keys(CustomFormControlErrorsEnum).includes(error)) {

      Object.keys(CUSTOM_VALIDATORS).forEach((key) => {
        if (formControl.hasValidator(CUSTOM_VALIDATORS[key])) {
        }
      });
      const errorKey = error as keyof typeof CustomFormControlErrorsEnum;
      if (CustomFormControlErrorsEnum[errorKey]) {
        errors.push(CustomFormControlErrorsEnum[errorKey]);
      }
    }

    if (error.includes('required')) {
      errors.push(BasicFormControlErrorsEnum.REQUIRED);
    } else if (error.includes('minlength')) {
      const requiredMinimumLength = formControl.getError('minlength').requiredLength;
      errors.push("Minimum number of characters is " + requiredMinimumLength);
    } else if (error.includes('email')) {
      errors.push(BasicFormControlErrorsEnum.INVALID_EMAIL_ADDRESS);
    }
  });

  return errors.length > 0 ? [errors[0]] : [];
}

export function getErrors(formControl: AbstractControl): string[] {
  let errors: string[] = [];
  if (hasErrors(formControl)) {
    errors = hasCustomError(formControl);
  }
  return errors;
}
