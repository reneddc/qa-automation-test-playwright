import type { Locator, Page } from '@playwright/test';
import type { User } from '../entities/user';

export class LoginPage {
  private readonly page: Page;
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly accountMenuLocator: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByTestId('email');
    this.passwordInput = page.getByTestId('password');
    this.loginButton = page.getByTestId('login-submit');
    this.accountMenuLocator = page.getByTestId('nav-menu');
  }

  async goto(): Promise<void> {
    await this.page.goto('/auth/login');
  }

  async login(user: User): Promise<void> {
    await this.emailInput.fill(user.email);
    await this.passwordInput.fill(user.password);
    await this.loginButton.click();
  }

  accountMenu(): Locator {
    return this.accountMenuLocator;
  }
}
