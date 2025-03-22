import { definePreset } from '@primeng/themes';
import aefTheme from './presets/aef-theme';
import Aura from '@primeng/themes/aura';

export const AefTheme = {
  preset: definePreset(aefTheme, Aura),
  options: {
    prefix: 'aef',
    darkModeSelector: '.dark',
  },
};
