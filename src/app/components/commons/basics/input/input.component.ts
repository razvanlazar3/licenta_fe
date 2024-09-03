import {Component, EventEmitter, forwardRef, Input, Output} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => InputComponent),
    },
  ]
})
export class InputComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() icon: string = '';
  @Input() type: string = 'text';
  @Input() isTextArea = false;
  @Input() hide = false;
  @Input() errors: string[] = [];
  @Input() readonly = false;
  @Output() clickEvent = new EventEmitter<string>;

  valueControl: FormControl = new FormControl();
  textAreaValue: any;

  onChange: (value: string) => void = () => {
  };
  onTouched: () => void = () => {
  };

  writeValue(value: any) {
    if (this.isTextArea) {
      this.valueControl = value;
    } else {
      this.valueControl.setValue(value);
    }
  }

  registerOnChange(onChange: any) {
    if (this.isTextArea) {
      this.onChange = onChange;
    } else {
      this.valueControl.valueChanges.subscribe((value) => {
        onChange(value);
        this.clickEvent.emit(value);
      });
    }
  }

  registerOnTouched(onTouched: any) {
    if (this.isTextArea) {
      this.onTouched = onTouched;
    } else {
      this.valueControl.valueChanges.subscribe(() => onTouched());
    }
  }

  modifyTextAreaValue($event: Event) {
    const div = event?.target as HTMLDivElement;
    this.textAreaValue = div.innerText;

    this.onChange(this.textAreaValue);
    this.onTouched();

    setTimeout(() => {
      div.focus();
      const range = document.createRange();
      const sel = window.getSelection();
      range.selectNodeContents(div);
      range.collapse(false);
      sel?.removeAllRanges();
      sel?.addRange(range);
    });
  }
}
