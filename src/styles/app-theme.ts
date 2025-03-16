import { definePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura';
import aefTheme from './presets/aef-theme';

export const AefTheme = {
  preset: definePreset(Aura, aefTheme),
  options: {
    prefix: 'web',
    darkModeSelector: '.dark',
  },
};
