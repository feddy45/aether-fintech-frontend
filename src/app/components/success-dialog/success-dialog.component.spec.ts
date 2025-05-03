import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessDialogComponent } from './success-dialog.component';
import { By } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';

describe('SuccessDialogComponent', () => {
  let component: SuccessDialogComponent;
  let fixture: ComponentFixture<SuccessDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuccessDialogComponent],
      providers: [provideAnimations(), {
        provide: Router,
        useValue: { navigate: jest.fn() },
      }],
    })
      .compileComponents();

    fixture = TestBed.createComponent(SuccessDialogComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('dialogVisible', true);
    fixture.componentRef.setInput('headerText', 'Successo');
    fixture.componentRef.setInput('bodyText', 'Inserito con successo');
    fixture.componentRef.setInput('primaryButtonText', 'Nuova operazione');
    fixture.componentRef.setInput('secondaryButtonText', 'lista operazioni');

    fixture.detectChanges();
  });

  it('should emit primaryButtonClicked operation on click', () => {
    const spyOnPrimaryClick = jest.spyOn(component.primaryButtonClicked, 'emit');
    const newOperationBtn = fixture.debugElement.query(By.css('[data-testid="btn-primary"] button')).nativeElement;
    newOperationBtn.click();
    fixture.detectChanges();

    expect(spyOnPrimaryClick).toHaveBeenCalled();
  });

  it('should emit secondaryButtonClicked if secondaryButton button has clicked', () => {
    const spyOnSecondaryClick = jest.spyOn(component.secondaryButtonClicked, 'emit');
    const newOperationBtn = fixture.debugElement.query(By.css('[data-testid="btn-secondary"] button')).nativeElement;
    newOperationBtn.click();
    fixture.detectChanges();

    expect(spyOnSecondaryClick).toHaveBeenCalled();
  });
});
