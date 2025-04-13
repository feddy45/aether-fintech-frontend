import { Component, inject, OnInit, signal } from '@angular/core';
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
import { CardService } from '../../../../services/card/card.service';
import { Card } from '../../../../models/card';
import { DropdownModule } from 'primeng/dropdown';
import { Select } from 'primeng/select';
import { BeneficiariesDialogComponent } from './beneficiaries-dialog/beneficiaries-dialog.component';
import { Contact } from '../../../../models/contact';
import { BankTransferCreate } from '../../../../models/bank-transfer';
import { Dialog } from 'primeng/dialog';
import { Router } from '@angular/router';

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
    Select,
    BeneficiariesDialogComponent,
    Dialog,
  ],
  templateUrl: './bank-transfer.component.html',
  styleUrl: './bank-transfer.component.css',
})
export class BankTransferComponent implements OnInit {
  transferService = inject(TransferService);
  cardService = inject(CardService);
  router = inject(Router);

  bankTransferForm = new FormGroup({
    card: new FormControl<Card | undefined>(undefined, Validators.required),
    iban: new FormControl<string | undefined>(undefined, [Validators.required, this.italianIbanValidator()]),
    beneficiary: new FormControl<string | undefined>(undefined, Validators.required),
    amount: new FormControl<number | undefined>(undefined, Validators.required),
    description: new FormControl<string | undefined>(undefined, Validators.required),
  });

  cards = signal<Card[]>([]);
  showBeneficiaryDialog = signal<boolean>(false);
  dialogVisible = signal<boolean>(false);

  ngOnInit(): void {
    this.cardService.getAll().subscribe(cards => {
      this.cards.set(cards);
      this.bankTransferForm.patchValue({ card: cards[0] });
    });
  }

  newOperation() {
    this.bankTransferForm.reset();
    this.dialogVisible.set(false);
  }

  goToOperationList() {
    this.router.navigate(['/operations']).then();
  }

  onSubmit() {
    if (this.bankTransferForm.value) {
      const cardRequest: BankTransferCreate = {
        cardId: this.bankTransferForm.value.card?.id,
        iban: this.bankTransferForm.value.iban!,
        beneficiary: this.bankTransferForm.value.beneficiary!,
        amount: this.bankTransferForm.value.amount!,
        description: this.bankTransferForm.value.description!,
      };

      this.transferService.addBankTransfer(cardRequest).subscribe(() =>
        this.dialogVisible.set(true),
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
