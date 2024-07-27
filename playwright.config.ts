import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  projects: [
    {
      name: 'Desktop Chrome',
      use: { ...devices['Desktop Chrome'] },
    },
    // {
    //   name: 'Desktop Firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
  ],
  reporter: [['list']],
  retries: 1,
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    actionTimeout: 30000,
  },
});
