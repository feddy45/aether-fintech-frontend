import { Component, inject, signal } from '@angular/core';
import { TransferService } from '../../../../services/transfer/transfer.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BankAccount } from '../../../../models/bank-account';
import { InternalTransferCreate } from '../../../../models/internal-transfer';
import { Button } from 'primeng/button';
import { InputLabelComponent } from '../../../shared/input-label/input-label.component';
import { InputNumber } from 'primeng/inputnumber';
import { Textarea } from 'primeng/textarea';
import { SuccessDialogComponent } from '../../../success-dialog/success-dialog.component';
import { BankAccountSelectComponent } from '../bank-account-select/bank-account-select.component';
import { Router } from '@angular/router';

@Component({
  selector: 'aef-internal-transfer',
  imports: [
    Button,
    FormsModule,
    InputLabelComponent,
    InputNumber,
    ReactiveFormsModule,
    Textarea,
    SuccessDialogComponent,
    BankAccountSelectComponent,
  ],
  templateUrl: './internal-transfer.component.html',
  styleUrl: './internal-transfer.component.css',
})
export class InternalTransferComponent {
  transferService = inject(TransferService);
  router = inject(Router);

  internalTransferForm = new FormGroup({
    originBankAccount: new FormControl<BankAccount | undefined>(undefined, Validators.required),
    destinationBankAccount: new FormControl<BankAccount | undefined>(undefined, Validators.required),
    amount: new FormControl<number | undefined>(undefined, Validators.required),
    description: new FormControl<string | undefined>(undefined, Validators.required),
  });

  successDialogVisible = signal<boolean>(false);

  newOperation() {
    this.successDialogVisible.set(false);
    this.internalTransferForm.reset();
  }

  goToOperationList() {
    this.router.navigate(['/operations']);
  }

  onSubmit() {
    if (this.internalTransferForm.valid) {
      const internalTransferCreate: InternalTransferCreate = {
        originBankAccountId: this.internalTransferForm.value.originBankAccount?.id,
        destinationBankAccountId: this.internalTransferForm.value.destinationBankAccount?.id,
        amount: this.internalTransferForm.value.amount!,
        description: this.internalTransferForm.value.description!,
      };

      this.transferService.addInternalTransfer(internalTransferCreate).subscribe(() =>
        this.successDialogVisible.set(true),
      );
    }
  }

}
