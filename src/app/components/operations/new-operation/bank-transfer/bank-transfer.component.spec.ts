import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankTransferComponent } from './bank-transfer.component';
import { provideHttpClient } from '@angular/common/http';
import { mockedBankAccounts } from '../../../../mocks/bank-account';
import { By } from '@angular/platform-browser';
import { TransferService } from '../../../../services/transfer/transfer.service';
import { of } from 'rxjs';

describe('BankTransferComponent', () => {
  let component: BankTransferComponent;
  let fixture: ComponentFixture<BankTransferComponent>;
  const mockAddBankTransfer = jest.fn().mockReturnValue(of());


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BankTransferComponent],
      providers: [provideHttpClient(), {
        provide: TransferService,
        useValue: { addBankTransfer: mockAddBankTransfer },
      }],
    })
      .compileComponents();

    fixture = TestBed.createComponent(BankTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should initialize the form with empty values', () => {
    expect(component.bankTransferForm.value.bankAccount).toBeNull();
    expect(component.bankTransferForm.value.iban).toBeNull();
    expect(component.bankTransferForm.value.beneficiary).toBeNull();
    expect(component.bankTransferForm.value.amount).toBeNull();
    expect(component.bankTransferForm.value.description).toBeNull();
  });

  it('should call addBankTransfer when form is valid and is submitted', () => {
    const button = fixture.debugElement.query(
      By.css('[data-testid="btn-submit-bank-transfer"] button'),
    ).nativeElement;
    component.bankTransferForm.get('bankAccount')?.setValue(mockedBankAccounts[0]);
    component.bankTransferForm.get('iban')?.setValue('IT60X0542811101000000123461');
    component.bankTransferForm.get('beneficiary')?.setValue('Marco Rossi');
    component.bankTransferForm.get('amount')?.setValue(1000);
    component.bankTransferForm.get('description')?.setValue('test bonifico');
    fixture.detectChanges();
    expect(component.bankTransferForm.invalid).toBeFalsy();
    button.click();
    fixture.detectChanges();
    expect(mockAddBankTransfer).toHaveBeenCalledWith({
      amount: 1000,
      bankAccountId: mockedBankAccounts[0].id,
      beneficiary: 'Marco Rossi',
      description: 'test bonifico',
      iban: 'IT60X0542811101000000123461',
    });
  });

  it('should invalid form if the iban inserted is not correct', () => {
    component.bankTransferForm.get('bankAccount')?.setValue(mockedBankAccounts[0]);
    component.bankTransferForm.get('iban')?.setValue('Iban Not correct');
    component.bankTransferForm.get('beneficiary')?.setValue('Marco Rossi');
    component.bankTransferForm.get('amount')?.setValue(1000);
    component.bankTransferForm.get('description')?.setValue('test bonifico');
    fixture.detectChanges();
    expect(component.bankTransferForm.invalid).toBeTruthy();
  });

  it('should invalid form if at least one field is missing', () => {
    component.bankTransferForm.get('bankAccount')?.setValue(mockedBankAccounts[0]);
    component.bankTransferForm.get('amount')?.setValue(1000);
    component.bankTransferForm.get('description')?.setValue('test bonifico');
    fixture.detectChanges();
    expect(component.bankTransferForm.invalid).toBeTruthy();
  });
});
