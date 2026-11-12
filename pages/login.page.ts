import type { Locator, Page } from '@playwright/test';
import type { Credentials } from '../entities/credentials';

export class LoginPage {
  private readonly page: Page;
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly accountMenuLocator: Locator;
  private readonly loginErrorLocator: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByTestId('email');
    this.passwordInput = page.getByTestId('password');
    this.loginButton = page.getByTestId('login-submit');
    this.accountMenuLocator = page.getByTestId('nav-menu');
    this.loginErrorLocator = page.getByTestId('login-error');
  }

  async goto(): Promise<void> {
    await this.page.goto('/auth/login');
  }

  async login(credentials: Credentials): Promise<void> {
    await this.emailInput.fill(credentials.email);
    await this.passwordInput.fill(credentials.password);
    await this.loginButton.click();
  }

  accountMenu(): Locator {
    return this.accountMenuLocator;
  }

  loginError(): Locator {
    return this.loginErrorLocator;
  }
}
