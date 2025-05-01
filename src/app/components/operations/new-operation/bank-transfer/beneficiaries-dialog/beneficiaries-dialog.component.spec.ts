import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneficiariesDialogComponent } from './beneficiaries-dialog.component';
import { provideHttpClient } from '@angular/common/http';
import { ContactsService } from '../../../../../services/contacts/contacts.service';
import { mockedContacts } from '../../../../../mocks/contact';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('BeneficiariesDialogComponent', () => {
  let component: BeneficiariesDialogComponent;
  let fixture: ComponentFixture<BeneficiariesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BeneficiariesDialogComponent],
      providers: [provideHttpClient(), {
        provide: ContactsService,
        useValue: { getAll: jest.fn().mockReturnValue(of(mockedContacts)) },
      }, provideAnimations()],
    })
      .compileComponents();

    fixture = TestBed.createComponent(BeneficiariesDialogComponent);
    fixture.componentRef.setInput('showDialog', true);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it.each(mockedContacts)('should emit contact on clicking on button', (contact) => {
    const spyOnEmit = jest.spyOn(component.selectBeneficiary, 'emit');

    const beneficiaryButton = fixture.debugElement.query(By.css(`[data-testid="btn-beneficiary-${contact.id}"]`)).query(By.css('button')).nativeElement;
    beneficiaryButton.click();

    expect(spyOnEmit).toHaveBeenCalledWith(contact);
  });
});
