import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalTransferComponent } from './internal-transfer.component';
import { provideHttpClient } from '@angular/common/http';
import { TransferService } from '../../../../services/transfer/transfer.service';
import { By } from '@angular/platform-browser';
import { mockedBankAccounts } from '../../../../mocks/bank-account';
import { of } from 'rxjs';

describe('InternalTransferComponent', () => {
  let component: InternalTransferComponent;
  let fixture: ComponentFixture<InternalTransferComponent>;
  const mockAddInternalTransfer = jest.fn().mockReturnValue(of());

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InternalTransferComponent],
      providers: [provideHttpClient(), {
        provide: TransferService,
        useValue: { addInternalTransfer: mockAddInternalTransfer },
      }],
    })
      .compileComponents();

    fixture = TestBed.createComponent(InternalTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should initialize the form with empty values', () => {
    expect(component.internalTransferForm.value.originBankAccount).toBeNull();
    expect(component.internalTransferForm.value.destinationBankAccount).toBeNull();
    expect(component.internalTransferForm.value.amount).toBeNull();
    expect(component.internalTransferForm.value.description).toBeNull();
  });

  it('should call addBankTransfer when form is valid and is submitted', () => {
    const button = fixture.debugElement.query(
      By.css('[data-testid="btn-submit-internal-transfer"] button'),
    ).nativeElement;
    component.internalTransferForm.get('originBankAccount')?.setValue(mockedBankAccounts[0]);
    component.internalTransferForm.get('destinationBankAccount')?.setValue(mockedBankAccounts[1]);
    component.internalTransferForm.get('amount')?.setValue(2000);
    component.internalTransferForm.get('description')?.setValue('test giroconto');
    fixture.detectChanges();
    expect(component.internalTransferForm.invalid).toBeFalsy();
    button.click();
    fixture.detectChanges();
    expect(mockAddInternalTransfer).toHaveBeenCalledWith({
      amount: 2000,
      description: 'test giroconto',
      destinationBankAccountId: '2',
      originBankAccountId: '1',
    });
  });


  it('should invalid form if at least one field is missing', () => {
    component.internalTransferForm.get('originBankAccount')?.setValue(mockedBankAccounts[0]);
    component.internalTransferForm.get('destinationBankAccount')?.setValue(mockedBankAccounts[1]);
    component.internalTransferForm.get('description')?.setValue('test giroconto');
    fixture.detectChanges();
    expect(component.internalTransferForm.invalid).toBeTruthy();
  });
});
