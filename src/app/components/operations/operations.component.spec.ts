import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationsComponent } from './operations.component';
import { provideHttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { TransferService } from '../../services/transfer/transfer.service';
import { of } from 'rxjs';
import { bankTransfersMock } from '../../mocks/bank-transfer';

describe('OperationsComponent', () => {
  let fixture: ComponentFixture<OperationsComponent>;
  let router: Router;
  let component: OperationsComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OperationsComponent],
      providers: [provideHttpClient(), {
        provide: Router,
        useValue: { navigate: jest.fn() },
      }, { provide: TransferService, useValue: { getAll: jest.fn().mockReturnValue(of(bankTransfersMock)) } },
      ],
    })
      .compileComponents();
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(OperationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should navigate to new operation on button click', () => {
    const navigateSpy = jest.spyOn(router, 'navigate');
    const newOperationButton = fixture.debugElement.query(By.css('[data-testid="btn-new-operation"')).query(By.css('button')).nativeElement;
    newOperationButton.click();
    fixture.detectChanges();
    expect(navigateSpy).toHaveBeenCalledWith(['/operations/new-operation']);
  });

  it('should set transfers from transfer service request', () => {
    fixture.detectChanges();
    expect(component.transfers()).toBe(bankTransfersMock);
  });
});
