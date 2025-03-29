import { Component, inject } from '@angular/core';
import { InputGroup } from 'primeng/inputgroup';
import { InputText } from 'primeng/inputtext';
import { InputGroupAddon } from 'primeng/inputgroupaddon';
import { Button } from 'primeng/button';
import { InputLabelComponent } from '../../shared/input-label/input-label.component';
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
import { TransferService } from '../../../services/transfer/transfer.service';

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
  ],
  templateUrl: './bank-transfer.component.html',
  styleUrl: './bank-transfer.component.css',
})
export class BankTransferComponent {
  transferService = inject(TransferService);

  bankTransferForm = new FormGroup({
    iban: new FormControl(undefined, [Validators.required, this.italianIbanValidator()]),
    beneficiary: new FormControl(undefined, Validators.required),
    amount: new FormControl(undefined, Validators.required),
    description: new FormControl(undefined, Validators.required),
  });

  onSubmit() {
    this.transferService.addBankTransfer(this.bankTransferForm.value);
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
