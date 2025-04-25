import { Component, inject, OnInit, signal } from '@angular/core';
import { TransferService } from '../../../../services/transfer/transfer.service';
import { BankAccountService } from '../../../../services/bank-account/bank-account.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BankAccount } from '../../../../models/bank-account';
import { InternalTransferCreate } from '../../../../models/internal-transfer';
import { Button } from 'primeng/button';
import { CurrencyPipe } from '@angular/common';
import { Dialog } from 'primeng/dialog';
import { InputLabelComponent } from '../../../shared/input-label/input-label.component';
import { InputNumber } from 'primeng/inputnumber';
import { PrimeTemplate } from 'primeng/api';
import { Select } from 'primeng/select';
import { Textarea } from 'primeng/textarea';

@Component({
  selector: 'aef-internal-transfer',
  imports: [
    Button,
    CurrencyPipe,
    Dialog,
    FormsModule,
    InputLabelComponent,
    InputNumber,
    PrimeTemplate,
    ReactiveFormsModule,
    Select,
    Textarea,
  ],
  templateUrl: './internal-transfer.component.html',
  styleUrl: './internal-transfer.component.css',
})
export class InternalTransferComponent implements OnInit {
  transferService = inject(TransferService);
  bankAccountService = inject(BankAccountService);
  router = inject(Router);

  internalTransferForm = new FormGroup({
    originBankAccount: new FormControl<BankAccount | undefined>(undefined, Validators.required),
    destinationBankAccount: new FormControl<BankAccount | undefined>(undefined, Validators.required),
    amount: new FormControl<number | undefined>(undefined, Validators.required),
    description: new FormControl<string | undefined>(undefined, Validators.required),
  });

  bankAccounts = signal<BankAccount[]>([]);
  dialogVisible = signal<boolean>(false);

  ngOnInit(): void {
    this.bankAccountService.getAll().subscribe(accounts => {
      this.bankAccounts.set(accounts);
      this.internalTransferForm.patchValue({ originBankAccount: accounts[0], destinationBankAccount: accounts[1] });
    });
  }

  newOperation() {
    this.internalTransferForm.reset();
  }

  goToOperationList() {
    this.router.navigate(['/operations']).then();
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
        this.dialogVisible.set(true),
      );
    }
  }
}
