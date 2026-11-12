import { expect, test } from '../fixtures/fixtures';

test.describe('User registration', () => {
  test('AC-1: registration autofills the address and redirects to the login page', async ({
    page,
    registerPage,
    user,
  }) => {
    await test.step('Open the registration page and fill the personal data', async () => {
      await registerPage.goto();
      await registerPage.fillPersonalData(user);
    });

    await test.step('Select the country and fill the postal code and house number', async () => {
      await registerPage.fillAddress(user);
    });

    await test.step('Verify the autofilled address', async () => {
      const address = registerPage.captureAddress();
      await expect(address.street).toHaveValue(user.street);
      await expect(address.city).toHaveValue(user.city);
      await expect(address.state).toHaveValue(user.state);
    });

    await test.step('Fill the contact data and submit the registration', async () => {
      await registerPage.fillContact(user);
      await registerPage.submit();
    });

    await test.step('Verify the redirection to the login page', async () => {
      await expect(page).toHaveURL('/auth/login');
    });
  });
});
