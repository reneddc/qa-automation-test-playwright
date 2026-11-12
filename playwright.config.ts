import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import type { TestOptions } from './fixtures/fixtures';

dotenv.config({ quiet: true });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig<TestOptions>({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* HTML report (never opened automatically) plus console progress. */
  reporter: [['html', { open: 'never' }], ['list']],
  use: {
    /* Allows page.goto('/path') instead of absolute URLs. */
    baseURL: 'https://practicesoftwaretesting.com',
    apiBaseURL: 'https://api.practicesoftwaretesting.com',

    /* The app marks its elements with data-test, not data-testid. */
    testIdAttribute: 'data-test',

    locale: 'es-ES',

    /* Evidence kept only when a test fails. */
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
