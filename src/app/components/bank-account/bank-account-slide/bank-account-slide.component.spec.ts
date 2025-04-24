import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankAccountSlideComponent } from './bank-account-slide.component';

describe('BankAccountSlideComponent', () => {
  let component: BankAccountSlideComponent;
  let fixture: ComponentFixture<BankAccountSlideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BankAccountSlideComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BankAccountSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
