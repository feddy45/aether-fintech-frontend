import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { providePrimeNG } from 'primeng/config';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AefTheme } from '../styles/app-theme';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), providePrimeNG({
    theme: {
      preset: AefTheme,
      options: {
        prefix: 'aef',
        darkModeSelector: '.aef-app-dark',
      },
    },
  }), provideAnimationsAsync()],
};


