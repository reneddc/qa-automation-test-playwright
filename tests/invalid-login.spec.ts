import { expect, test } from '../fixtures/fixtures';

const invalidCredentials = {
  email: 'invalid.user@example.com',
  password: 'WrongPass#123',
};
const invalidCredentialsMessage = 'Invalid email or password';

test.describe('Invalid login', () => {
  test('AC-1: invalid credentials show an error and do not grant access', async ({
    page,
    loginPage,
  }) => {
    await test.step('Open the login page', async () => {
      await loginPage.goto();
    });

    await test.step('Log in with invalid credentials', async () => {
      await loginPage.login(invalidCredentials);
    });

    await test.step('Verify the error message', async () => {
      await expect(loginPage.loginError()).toBeVisible();
      await expect(loginPage.loginError()).toHaveText(invalidCredentialsMessage);
    });

    await test.step('Verify the user did not access the account', async () => {
      await expect(page).toHaveURL('/auth/login');
      await expect(loginPage.accountMenu()).toHaveCount(0);
    });
  });
});
