import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() text = '';
  @Input() disabled = false;
  @Input() redState = false;
  @Input() link?: string;
}
