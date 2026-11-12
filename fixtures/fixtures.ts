import { test as base } from '@playwright/test';
import { createUser } from '../data/user.factory';
import type { User } from '../entities/user';
import { LoginPage } from '../pages/login.page';
import { RegisterPage } from '../pages/register.page';

type Fixtures = {
  registerPage: RegisterPage;
  loginPage: LoginPage;
  user: User;
  registeredUser: User;
};

export const test = base.extend<Fixtures>({
  registerPage: async ({ page }, use) => {
    await use(new RegisterPage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  user: async ({}, use, testInfo) => {
    await use(createUser(testInfo.project.name));
  },
  registeredUser: [
    async ({ user, registerPage, page }, use, testInfo) => {
      if (testInfo.tags.includes('@registered-user')) {
        await registerPage.goto();
        await registerPage.fillPersonalData(user);
        await registerPage.fillAddress(user);
        await registerPage.waitForAddressAutofill();
        await registerPage.fillContact(user);
        await registerPage.submit();
        await page.waitForURL('/auth/login');
      }
      await use(user);
    },
    { auto: true },
  ],
});

export { expect } from '@playwright/test';
