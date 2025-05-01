import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopbarComponent } from './topbar.component';
import { provideHttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { mockTopbarItem } from '../../mocks/topbar';
import { of } from 'rxjs';

describe('TopbarComponent', () => {
  let component: TopbarComponent;
  let fixture: ComponentFixture<TopbarComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopbarComponent],
      providers: [provideHttpClient(), MessageService, {
        provide: Router,
        useValue: { navigate: jest.fn(), url: '', events: of([]) },
      }],
    })
      .compileComponents();

    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(TopbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it.each(mockTopbarItem)('should navigate to item routerLink', (item) => {
    const navigateSpy = jest.spyOn(router, 'navigate');
    component.onMenuItemClick(item);

    expect(navigateSpy).toHaveBeenCalledWith([item.routerLink]);
  });
});
