import { Component, input, model, output } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { Button } from 'primeng/button';

@Component({
  selector: 'aef-success-dialog',
  imports: [
    Dialog,
    Button,
  ],
  templateUrl: './success-dialog.component.html',
  styleUrl: './success-dialog.component.css',
})
export class SuccessDialogComponent {
  dialogVisible = model.required<boolean>();
  headerText = input.required<string>();
  bodyText = input.required<string>();
  primaryButtonText = input.required<string>();
  secondaryButtonText = input.required<string>();
  primaryButtonClicked = output();
  secondaryButtonClicked = output();
}
