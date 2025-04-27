import type { Config } from 'jest';
import presets from 'jest-preset-angular/presets';

export default {
  ...presets.createCjsPreset(),
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
} satisfies Config;
