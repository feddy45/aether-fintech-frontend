import { definePreset } from '@primeng/themes';
import aefTheme from './presets/aef-theme';

export const AefTheme = {
  preset: definePreset(aefTheme),
  options: {
    prefix: 'aef',
    darkModeSelector: '.dark',
  },
};
