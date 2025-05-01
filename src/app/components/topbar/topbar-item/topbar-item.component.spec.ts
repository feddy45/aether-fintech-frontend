import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopbarItemComponent } from './topbar-item.component';
import { mockTopbarItem } from '../../../mocks/topbar';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

describe('TopbarItemComponent', () => {
  let component: TopbarItemComponent;
  let fixture: ComponentFixture<TopbarItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopbarItemComponent],
      providers: [{ provide: Router, useValue: { url: mockTopbarItem[0].routerLink, events: of([]) } }],
    })
      .compileComponents();

    fixture = TestBed.createComponent(TopbarItemComponent);

  });

  it('should emit item when clicking on item', () => {
    fixture.componentRef.setInput('item', mockTopbarItem[0]);
    fixture.detectChanges();

    component = fixture.componentInstance;
    const clickSpy = jest.spyOn(component.clickOnMenuItem, 'emit');

    const button = fixture.debugElement.query(By.css('#bank-account-topbar-item')).nativeElement;
    button.click();
    fixture.detectChanges();

    expect(clickSpy).toHaveBeenCalledWith(mockTopbarItem[0]);
  });

  it('should add class active when the route is same as item routerLink', () => {
    fixture.componentRef.setInput('item', mockTopbarItem[0]);
    fixture.detectChanges();

    const elementWithActiveClass = fixture.debugElement.query(By.css('.active')).nativeElement;
    expect(elementWithActiveClass).toBeTruthy();
  });

  it('should not find class active when the route is different then item routerLink', () => {
    fixture.componentRef.setInput('item', mockTopbarItem[1]);
    fixture.detectChanges();

    const elementWithActiveClass = fixture.debugElement.query(By.css('.active'));
    expect(elementWithActiveClass).toBeFalsy();
  });
});
