import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessDialogComponent } from './success-dialog.component';
import { By } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';

describe('SuccessDialogComponent', () => {
  let component: SuccessDialogComponent;
  let fixture: ComponentFixture<SuccessDialogComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuccessDialogComponent],
      providers: [provideAnimations(), {
        provide: Router,
        useValue: { navigate: jest.fn() },
      }],
    })
      .compileComponents();

    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(SuccessDialogComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('dialogVisible', true);
    fixture.componentRef.setInput('headerText', 'Successo');
    fixture.componentRef.setInput('bodyText', 'Inserito con successo');
    fixture.componentRef.setInput('primaryButtonText', 'Nuova operazione');

    fixture.detectChanges();
  });

  it('should emit new operation on click', () => {
    const spyOnNewOperation = jest.spyOn(component.newOperationClicked, 'emit');
    const newOperationBtn = fixture.debugElement.query(By.css('[data-testid="btn-new-operation"] button')).nativeElement;
    newOperationBtn.click();
    fixture.detectChanges();

    expect(spyOnNewOperation).toHaveBeenCalled();
  });

  it('should navigate to operation list if operation list button has clicked', () => {
    const navigateSpy = jest.spyOn(router, 'navigate');
    const operationListButton = fixture.debugElement.query(By.css('[data-testid="btn-go-to-operation-list"] button')).nativeElement;
    operationListButton.click();
    fixture.detectChanges();

    expect(navigateSpy).toHaveBeenCalledWith(['/operations']);
  });
});
