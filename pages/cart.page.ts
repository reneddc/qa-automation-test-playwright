import type { Locator, Page } from '@playwright/test';

export interface CartItem {
  title: Locator;
  quantity: Locator;
  price: Locator;
}

export class CartPage {
  private readonly page: Page;
  private readonly itemTitles: Locator;

  constructor(page: Page) {
    this.page = page;
    this.itemTitles = page.getByTestId('product-title');
  }

  cartItems(): Locator {
    return this.itemTitles;
  }

  getItemByProductName(productName: string): CartItem {
    const itemRow = this.page
      .getByRole('row')
      .filter({ has: this.itemTitles.filter({ hasText: productName }) });
    return {
      title: itemRow.getByTestId('product-title'),
      quantity: itemRow.getByTestId('product-quantity'),
      price: itemRow.getByTestId('product-price'),
    };
  }
}
