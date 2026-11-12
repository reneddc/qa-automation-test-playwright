import { expect, test } from "../fixtures/fixtures";

test.describe("User login", () => {
  test(
    "AC-1: a registered user logs in and sees their name in the account menu",
    { tag: "@registered-user" },
    async ({ loginPage, user }) => {
      await test.step("Open the login page", async () => {
        await loginPage.goto();
      });

      await test.step("Log in with the registered user", async () => {
        await loginPage.login(user);
      });

      await test.step("Verify the user name in the account menu", async () => {
        await expect(loginPage.accountMenu()).toHaveText(
          `${user.firstName} ${user.lastName}`,
        );
      });
    },
  );
});
