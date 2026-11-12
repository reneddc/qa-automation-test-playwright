import { test as base } from '@playwright/test';
import { createUser } from '../data/user.factory';
import type { User } from '../entities/user';
import { CartPage } from '../pages/cart.page';
import { HeaderComponent } from '../pages/header.component';
import { HomePage } from '../pages/home.page';
import { LoginPage } from '../pages/login.page';
import { ProductPage } from '../pages/product.page';
import { RegisterPage } from '../pages/register.page';

type Fixtures = {
  registerPage: RegisterPage;
  loginPage: LoginPage;
  homePage: HomePage;
  productPage: ProductPage;
  cartPage: CartPage;
  header: HeaderComponent;
  user: User;
  registeredUser: User;
  loggedInUser: User;
};

const REGISTERED_USER_TAG = '@registered-user';
const LOGGED_IN_USER_TAG = '@logged-in-user';

export const test = base.extend<Fixtures>({
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
  user: async ({}, use, testInfo) => {
    await use(createUser(testInfo.project.name));
  },
  registeredUser: [
    async ({ user, registerPage, page }, use, testInfo) => {
      const needsRegistration = [REGISTERED_USER_TAG, LOGGED_IN_USER_TAG].some((tag) =>
        testInfo.tags.includes(tag),
      );
      if (needsRegistration) {
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
  loggedInUser: [
    async ({ registeredUser, loginPage, page }, use, testInfo) => {
      if (testInfo.tags.includes(LOGGED_IN_USER_TAG)) {
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
