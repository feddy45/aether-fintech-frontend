import { Component, inject, signal } from '@angular/core';
import { InputGroup } from 'primeng/inputgroup';
import { InputText } from 'primeng/inputtext';
import { InputGroupAddon } from 'primeng/inputgroupaddon';
import { Button } from 'primeng/button';
import { InputLabelComponent } from '../../../shared/input-label/input-label.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { Textarea } from 'primeng/textarea';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { TransferService } from '../../../../services/transfer/transfer.service';
import { DropdownModule } from 'primeng/dropdown';
import { BeneficiariesDialogComponent } from './beneficiaries-dialog/beneficiaries-dialog.component';
import { Contact } from '../../../../models/contact';
import { BankTransferCreate } from '../../../../models/bank-transfer';
import { Router } from '@angular/router';
import { BankAccountService } from '../../../../services/bank-account/bank-account.service';
import { BankAccount } from '../../../../models/bank-account';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';
import { BankAccountSelectComponent } from '../bank-account-select/bank-account-select.component';

@Component({
  selector: 'aef-bank-transfer',
  imports: [
    InputGroup,
    InputText,
    InputGroupAddon,
    Button,
    InputLabelComponent,
    InputNumberModule,
    Textarea,
    ReactiveFormsModule,
    DropdownModule,
    BeneficiariesDialogComponent,
    SuccessDialogComponent,
    BankAccountSelectComponent,
  ],
  templateUrl: './bank-transfer.component.html',
  styleUrl: './bank-transfer.component.css',
})
export class BankTransferComponent {
  transferService = inject(TransferService);
  bankAccountService = inject(BankAccountService);
  router = inject(Router);

  bankTransferForm = new FormGroup({
    bankAccount: new FormControl<BankAccount | undefined>(undefined, Validators.required),
    iban: new FormControl<string | undefined>(undefined, [Validators.required, this.italianIbanValidator()]),
    beneficiary: new FormControl<string | undefined>(undefined, Validators.required),
    amount: new FormControl<number | undefined>(undefined, Validators.required),
    description: new FormControl<string | undefined>(undefined, Validators.required),
  });

  showBeneficiaryDialog = signal<boolean>(false);
  successDialogVisible = signal<boolean>(false);

  newOperation() {
    this.bankTransferForm.reset();
    this.successDialogVisible.set(false);
  }


  onSubmit() {
    if (this.bankTransferForm.valid) {
      const cardRequest: BankTransferCreate = {
        bankAccountId: this.bankTransferForm.value.bankAccount?.id,
        iban: this.bankTransferForm.value.iban!,
        beneficiary: this.bankTransferForm.value.beneficiary!,
        amount: this.bankTransferForm.value.amount!,
        description: this.bankTransferForm.value.description!,
      };

      this.transferService.addBankTransfer(cardRequest).subscribe(() =>
        this.successDialogVisible.set(true),
      );
    }
  }

  beneficiarySelected(beneficiary: Contact) {
    this.bankTransferForm.patchValue({
      beneficiary: `${beneficiary.firstName} ${beneficiary.lastName}`,
      iban: beneficiary.iban,
    });
  }

  private italianIbanValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const iban = control.value;
      const italianIbanPattern = /^IT\d{2}[A-Z]\d{10}[0-9A-Z]{12}$/;

      if (!iban) {
        return null;
      }

      const valid = italianIbanPattern.test(iban);
      return valid ? null : { invalidIban: true };
    };
  }
}
