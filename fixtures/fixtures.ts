import { test as base } from '@playwright/test';
import { UserClient } from '../clients/user.client';
import { createUser } from '../data/user.factory';
import type { User } from '../entities/user';
import { CartPage } from '../pages/cart.page';
import { HeaderComponent } from '../pages/header.component';
import { HomePage } from '../pages/home.page';
import { LoginPage } from '../pages/login.page';
import { ProductPage } from '../pages/product.page';
import { RegisterPage } from '../pages/register.page';

export type TestOptions = {
  apiBaseURL: string;
};

type Fixtures = {
  registerPage: RegisterPage;
  loginPage: LoginPage;
  homePage: HomePage;
  productPage: ProductPage;
  cartPage: CartPage;
  header: HeaderComponent;
  userClient: UserClient;
  user: User;
  registeredUser: User;
  loggedInUser: User;
};

export const test = base.extend<Fixtures & TestOptions>({
  apiBaseURL: ['', { option: true }],
  registerPage: async ({ page }, use) => {
    await use(new RegisterPage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  productPage: async ({ page }, use) => {
    await use(new ProductPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  header: async ({ page }, use) => {
    await use(new HeaderComponent(page));
  },
  userClient: async ({ playwright, apiBaseURL }, use) => {
    const request = await playwright.request.newContext({ baseURL: apiBaseURL });
    await use(new UserClient(request));
    await request.dispose();
  },
  user: async ({}, use, testInfo) => {
    await use(createUser(testInfo.project.name));
  },
  registeredUser: [
    async ({ user, userClient }, use, testInfo) => {
      if (testInfo.tags.includes('@registered-user')) {
        await userClient.register(user);
      }
      await use(user);
    },
    { auto: true },
  ],
  loggedInUser: [
    async ({ registeredUser, loginPage, page }, use, testInfo) => {
      if (testInfo.tags.includes('@logged-in-user')) {
        await loginPage.goto();
        await loginPage.login(registeredUser);
        await page.waitForURL('/account');
      }
      await use(registeredUser);
    },
    { auto: true },
  ],
});

export { expect } from '@playwright/test';
