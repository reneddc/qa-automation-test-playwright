import type { Locator, Page } from '@playwright/test';

export class HeaderComponent {
  private readonly cartQuantity: Locator;
  private readonly cartLink: Locator;

  constructor(page: Page) {
    this.cartQuantity = page.getByTestId('cart-quantity');
    this.cartLink = page.getByTestId('nav-cart');
  }

  cartCount(): Locator {
    return this.cartQuantity;
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }
}
