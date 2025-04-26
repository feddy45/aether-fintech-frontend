import { Component, inject, input, model, output } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { Button } from 'primeng/button';
import { Router } from '@angular/router';

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
  router = inject(Router);

  dialogVisible = model.required<boolean>();
  headerText = input.required<string>();
  bodyText = input.required<string>();
  primaryButtonText = input.required<string>();
  newOperationClicked = output();

  goToOperationList() {
    this.router.navigate(['/operations']).then();
  }
}
