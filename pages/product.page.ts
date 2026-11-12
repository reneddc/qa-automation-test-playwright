import type { Locator, Page } from '@playwright/test';

export class ProductPage {
  private readonly productName: Locator;
  private readonly unitPrice: Locator;
  private readonly quantityInput: Locator;
  private readonly addToCartButton: Locator;
  private readonly addedToCartToast: Locator;

  constructor(page: Page) {
    this.productName = page.getByTestId('product-name');
    this.unitPrice = page.getByTestId('unit-price');
    this.quantityInput = page.getByTestId('quantity');
    this.addToCartButton = page.getByTestId('add-to-cart');
    this.addedToCartToast = page.getByRole('alert').last();
  }

  name(): Locator {
    return this.productName;
  }

  price(): Locator {
    return this.unitPrice;
  }

  addedToCartMessage(): Locator {
    return this.addedToCartToast;
  }

  async addToCart(quantity: number): Promise<void> {
    await this.quantityInput.fill(String(quantity));
    await this.addToCartButton.click();
  }
}
