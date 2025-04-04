import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneficiariesDialogComponent } from './beneficiaries-dialog.component';

describe('BeneficiariesDialogComponent', () => {
  let component: BeneficiariesDialogComponent;
  let fixture: ComponentFixture<BeneficiariesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BeneficiariesDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeneficiariesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
