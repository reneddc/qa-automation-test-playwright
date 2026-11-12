# QA Automation with Playwright

Automated tests for [Practice Software Testing](https://practicesoftwaretesting.com) built with Playwright Test and TypeScript, using the Page Object Model. They cover user registration, login, adding products to the cart and an invalid login.

## Requirements

- [Node.js](https://nodejs.org) 20 or later (npm is included)
- Internet access: the tests run against the public site and its API (`https://api.practicesoftwaretesting.com`)

## Installation

1. Clone the repository and install the dependencies:

   ```bash
   git clone https://github.com/reneddc/qa-automation-test-playwright.git
   cd qa-automation-test-playwright
   npm install
   ```

2. Install the Playwright browsers (chromium, firefox and webkit). On Linux add `--with-deps` to also install the system libraries:

   ```bash
   npx playwright install
   ```

3. Create the `.env` file from the example. The tests read their data from it and fail with a clear message if it is missing:

   macOS / Linux / Git Bash:

   ```bash
   cp .env.example .env
   ```

   Windows PowerShell:

   ```powershell
   Copy-Item .env.example .env
   ```

   The example values work as they are. Set `CANDIDATE_EMAIL` in `.env` to your own email if you want to register with it; a unique suffix is added to it on every run.

## Running the tests

Run the whole suite (chromium, firefox and webkit):

```bash
npx playwright test
```

Other useful commands:

```bash
npx playwright test --project=chromium
npx playwright test tests/cart.spec.ts
npx playwright test --headed
npx playwright test --ui
npx playwright test --grep @registered-user
npm run typecheck
```

The HTML report is generated in `playwright-report/` after every run. Open it with:

```bash
npx playwright show-report
```

Traces and screenshots of failed tests are included in the report.

## Assumptions and limitations

- **Data:** test data comes from `.env`, made unique on every run with the date/time and the browser. Fixed expected values (products and prices) are in `data/products.json`; if the site changes them, update that file.
- **Preconditions:** tests are tagged. `@registered-user` creates the user through the API and `@logged-in-user` logs that user in through the UI. Every test creates its own user, so they are independent and run in any order.
- **Language:** the tests run with the `es-ES` locale, so the cart confirmation message is `Producto añadido al carrito.`. The login error message is not translated by the site and stays in English (`Invalid email or password`).
- **Address autofill:** it only works when the postal code is valid for the selected country. With `0000`, Bolivia (`BO`) works, and so does Argentina; the United States and Spain do not. The autofilled values for Bolivia (`Rodrigo Avenue`, `Hodkiewiczport`, `South Dakota`) are fixed and set in `.env`.
- **Names:** the registration form rejects names longer than 20 characters, even though the form does not show that limit.
- **Accounts pile up:** a customer cannot delete an account, so every run leaves new users on the site (one or two per test and browser).
- **Site availability:** the site is sometimes slow or resets connections, which can cause an occasional timeout. Re-running the failed test is usually enough; the API registration already retries network resets.
- **CI:** the `.github/workflows/playwright.yml` file is the default Playwright template and does not set the variables from `.env`, so it is not expected to pass yet.

## Improvements with more time

- **Pipeline:** adjust the GitHub Actions workflow to create the `.env` values, run the suite and publish the HTML report.
- **Reuse the session with `storageState`:** log in once and reuse the session instead of logging in through the UI in each test that needs it.
- **Log in through the API:** extend the user client to obtain the session by API and leave the UI login only for the login scenarios.
- **Base classes:** add a `BasePage` for the shared page logic and a `BaseClient` for the shared API logic.
- **BDD:** describe the scenarios in Gherkin (for example with `playwright-bdd`) so they are readable by non-technical people.
