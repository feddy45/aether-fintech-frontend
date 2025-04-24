import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankAccountsSliderComponent } from './bank-accounts-slider.component';

describe('CardsSliderComponent', () => {
  let component: BankAccountsSliderComponent;
  let fixture: ComponentFixture<BankAccountsSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BankAccountsSliderComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(BankAccountsSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
