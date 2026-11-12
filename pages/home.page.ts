import type { Locator, Page } from '@playwright/test';

export class HomePage {
  private readonly page: Page;
  private readonly searchInput: Locator;
  private readonly searchButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.getByTestId('search-query');
    this.searchButton = page.getByTestId('search-submit');
  }

  async goto(): Promise<void> {
    await this.page.goto('/');
  }

  async search(productName: string): Promise<void> {
    await this.searchInput.fill(productName);
    await this.searchButton.click();
  }

  async openProduct(productName: string): Promise<void> {
    await this.page.getByRole('link', { name: productName }).click();
  }
}
