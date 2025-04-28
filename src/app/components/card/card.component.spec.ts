import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.component';
import { cardsMock } from '../../mocks/card';
import { By } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { userMock } from '../../mocks/user';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardComponent],
      providers: [provideHttpClient(), {
        provide: AuthenticationService,
        useValue: { user: jest.fn().mockReturnValue(userMock) },
      }],
    })
      .compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('card', cardsMock[0]);

    fixture.detectChanges();
  });

  it('should call carClicked on when card is clicked', () => {
    const cardClickedSpy = jest.spyOn(component.cardClicked, 'emit');
    const cardElement = fixture.debugElement
      .query(By.css('.card'))
      .nativeElement;
    cardElement.click();

    expect(cardClickedSpy).toHaveBeenCalled();
  });

  it('should write in holder firstname and lastname from userservice', () => {
    const holderElement = fixture.debugElement
      .query(By.css('.holder'))
      .nativeElement;

    expect(holderElement.textContent).toContain(`${userMock.firstName} ${userMock.lastName}`);
  });

  it('should format correctly expriration date', () => {
    const expirationDate = fixture.debugElement
      .query(By.css('.expiration'))
      .nativeElement.textContent;

    expect(expirationDate).toBe('12 / 26');
  });

  it('should format correctly card number', () => {
    const cardNumberContainer = fixture.debugElement
      .query(By.css('.card-no'));

    for (let i = 0; i < 4; i++) {
      const cardNumber = cardNumberContainer.children[i].nativeElement.textContent;
      expect(cardNumber).toBe(cardsMock[0].number.slice(i * 4, i * 4 + 4));
    }
  });
});
