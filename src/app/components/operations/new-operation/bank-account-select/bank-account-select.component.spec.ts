import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankAccountSelectComponent } from './bank-account-select.component';

describe('BankAccountSelectComponent', () => {
  let component: BankAccountSelectComponent;
  let fixture: ComponentFixture<BankAccountSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BankAccountSelectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BankAccountSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
