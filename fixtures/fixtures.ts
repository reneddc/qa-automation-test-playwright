import { test as base } from '@playwright/test';
import { createUser } from '../data/user.factory';
import type { User } from '../entities/user';
import { RegisterPage } from '../pages/register.page';

type Fixtures = {
  registerPage: RegisterPage;
  user: User;
};

export const test = base.extend<Fixtures>({
  registerPage: async ({ page }, use) => {
    await use(new RegisterPage(page));
  },
  user: async ({}, use, testInfo) => {
    await use(createUser(testInfo.project.name));
  },
});

export { expect } from '@playwright/test';
