import { Component, forwardRef, inject, input } from '@angular/core';
import { BankAccountService } from '../../../../services/bank-account/bank-account.service';
import { CurrencyPipe } from '@angular/common';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { InputLabelComponent } from '../../../shared/input-label/input-label.component';
import { PrimeTemplate } from 'primeng/api';
import { Select } from 'primeng/select';
import { BankAccount } from '../../../../models/bank-account';

@Component({
  selector: 'aef-bank-account-select',
  imports: [
    CurrencyPipe,
    FormsModule,
    InputLabelComponent,
    PrimeTemplate,
    ReactiveFormsModule,
    Select,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BankAccountSelectComponent),
      multi: true,
    },
  ],
  templateUrl: './bank-account-select.component.html',
  styleUrl: './bank-account-select.component.css',
})
export class BankAccountSelectComponent implements ControlValueAccessor {
  bankAccountService = inject(BankAccountService);

  formControlName = input.required<string>();
  selectId = input.required<string>();
  label = input.required<string>();

  value: BankAccount | undefined;
  disabled = false;

  onChange?: (value: BankAccount | undefined) => void;
  onTouched?: () => void;

  writeValue(value: BankAccount | undefined): void {
    this.value = value;
  }

  registerOnChange(fn: (value: BankAccount | undefined) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onSelectChange(value: BankAccount) {
    this.value = value;
    this.onChange?.(this.value);
    this.onTouched?.();
  }
}
