import { Component, input } from '@angular/core';

@Component({
  selector: 'aef-input-label',
  imports: [],
  templateUrl: './input-label.component.html',
  styleUrl: './input-label.component.css',
})
export class InputLabelComponent {
  inputId = input.required<string>();
  label = input.required <string>();
}
