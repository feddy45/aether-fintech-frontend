import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopbarButtonComponent } from './topbar-button.component';
import { By } from '@angular/platform-browser';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { provideHttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { provideAnimations } from '@angular/platform-browser/animations';
import { signal } from '@angular/core';
import { User } from '../../../models/user';
import { userMock } from '../../../mocks/user';

describe('TopbarButtonComponent', () => {
  let component: TopbarButtonComponent;
  let fixture: ComponentFixture<TopbarButtonComponent>;
  let authenticationService: AuthenticationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopbarButtonComponent],
      providers: [AuthenticationService, provideHttpClient(), MessageService, provideAnimations()],
    })
      .compileComponents();

    authenticationService = TestBed.inject(AuthenticationService);
    fixture = TestBed.createComponent(TopbarButtonComponent);
    component = fixture.componentInstance;

    authenticationService.user = signal<User>(userMock);

    fixture.detectChanges();
  });

  it('should logout on open menu and press logout button', () => {
    const logoutSpy = jest.spyOn(authenticationService, 'logout');

    const btnMenu = fixture.debugElement.query(By.css('[data-testid="btn-topbar-menu"] button')).nativeElement;
    btnMenu.click();
    fixture.detectChanges();

    const menuitems = fixture.debugElement.queryAll(By.css('.p-menu-item-link'));
    menuitems[0].nativeElement.click();
    fixture.detectChanges();

    expect(logoutSpy).toHaveBeenCalled();
  });

  it('should getUserLabel return first letter of first name and last name', () => {
    expect(component.getUserLabel()).toEqual('MR');
  });
});
