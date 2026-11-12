import { products } from '../data/products';
import { expect, test } from '../fixtures/fixtures';

const productAddedMessage = 'Producto añadido al carrito.';

test.describe('Shopping cart', () => {
  test(
    'AC-1: a logged-in user adds products to the cart and finds them with the expected quantity and price',
    { tag: '@logged-in-user' },
    async ({ homePage, productPage, header, cartPage }) => {
      await test.step('Verify the cart icon has no counter yet', async () => {
        await expect(header.cartCount()).toHaveCount(0);
      });

      let unitsInCart = 0;
      for (const product of products) {
        await test.step(`Add ${product.quantity} x ${product.name} to the cart`, async () => {
          await homePage.goto();
          await homePage.search(product.name);
          await homePage.openProduct(product.name);
          await expect(productPage.name()).toContainText(product.name);
          await expect(productPage.price()).toHaveText(product.price);

          await productPage.addToCart(product.quantity);
          await expect(productPage.addedToCartMessage()).toHaveText(productAddedMessage);
          unitsInCart += product.quantity;
          await expect(header.cartCount()).toHaveText(String(unitsInCart));
        });
      }

      await test.step('Open the cart and verify its content', async () => {
        await header.openCart();
        await expect(cartPage.cartItems()).toHaveCount(products.length);//2 products
        for (const product of products) {
          const cartItem = cartPage.getItemByProductName(product.name);
          await expect(cartItem.title).toHaveText(product.name);
          await expect(cartItem.quantity).toHaveValue(String(product.quantity));
          await expect(cartItem.price).toHaveText(`$${product.price}`);
        }
      });
    },
  );
});
