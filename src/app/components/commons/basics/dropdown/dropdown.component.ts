import {Component, forwardRef, Input} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator
} from "@angular/forms";
import {DropdownItem} from "../../../../models/DropdownItem";

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DropdownComponent),
      multi: true,
    }
  ]
})
export class DropdownComponent implements ControlValueAccessor, Validator {
  @Input() options: DropdownItem[] = [];
  @Input() icon: string = ''
  @Input() errors: string[] = [];
  @Input() wasTouched = false;

  selectedOption?: string;
  showDropdown = false;

  onChange: (value: number | undefined) => void = () => {
  };
  onTouched: () => void = () => {
  };

  writeValue(value: string): void {
    this.selectedOption = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
    this.onTouched();
  }

  selectOption(option: DropdownItem): void {
    this.selectedOption = option.label;
    this.showDropdown = false;
    this.onChange(option.id);
    this.onTouched();
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return !this.selectedOption ? {'required': true} : null;
  }
}
