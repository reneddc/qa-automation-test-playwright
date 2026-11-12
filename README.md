# QA Automation with Playwright

End-to-end test suite for the purchase flow of [Practice Software Testing](https://practicesoftwaretesting.com), built with [Playwright Test](https://playwright.dev) and TypeScript using the Page Object Model.

> **Status:** work in progress. The project scaffolding is in place; scenarios are being added incrementally.

## Scenarios

1. **User registration** – register a new user with dynamically generated data and land on the login page.
2. **Login** – sign in with the newly created user and verify the session is active.
3. **Add products to the cart** – search products, check name and price in the detail page, add them and verify the cart.
4. **Invalid login (negative case)** – wrong credentials show an error and do not grant access.

## Requirements

- [Node.js](https://nodejs.org) 18 or later
- npm (bundled with Node.js)

## Installation

```bash
npm install
npx playwright install --with-deps
```

## Environment variables

Test data is read from a `.env` file (ignored by git). Create it from the example and adjust the values:

```bash
cp .env.example .env
```

| Variable | Description |
|---|---|
| `CANDIDATE_EMAIL` | Email used to register. `+<browser>-<timestamp>` is added to the local part on every run so it is unique. |
| `USER_FIRST_NAME`, `USER_LAST_NAME` | Base names; a short suffix (2 letters of the browser + `MMddHHmmss`) is appended on every run. The result is capped at 20 characters. |
| `USER_DOB`, `USER_PHONE` | Fixed date of birth (`YYYY-MM-DD`) and phone. |
| `USER_PASSWORD` | Base password; the last 4 digits of the timestamp are appended. |
| `REGISTER_COUNTRY`, `REGISTER_POSTCODE`, `REGISTER_HOUSE_NUMBER` | Country (ISO code), postal code and house number used in the registration. |
| `REGISTER_EXPECTED_STREET`, `REGISTER_EXPECTED_CITY`, `REGISTER_EXPECTED_STATE` | Values the app autofills for the data above. |

Notes about the site:

- The address autofill only works when the postal code is valid for the selected country. With `0000`, Bolivia (`BO`) and Argentina (`AR`) work; the United States and Spain do not.
- The registration form rejects names longer than 20 characters (`The last name field must not be greater than 20 characters.`), even though nothing in the form shows that limit up front.
- The site has no way for a customer to delete an account, so every run leaves new users behind (one per browser and per test that registers).
- Tests tagged `@logged-in-user` also get a registered user and are logged in before the test starts.
- Expected products and prices live in `data/products.json`; if the site changes them, update that file.
- The tests run with the `es-ES` locale, so the confirmation message is `Producto añadido al carrito.` (`data/messages.json`).
- Tests tagged `@registered-user` get a freshly registered user as a precondition (done through the UI by a fixture), so they never depend on the data created by another test.
- The site is sometimes slow to load, which can cause occasional timeouts.

## Running the tests

```bash
# Run the whole suite (chromium, firefox and webkit)
npx playwright test

# Run a single browser
npx playwright test --project=chromium

# Run a single file
npx playwright test tests/<file>.spec.ts

# Run in headed mode
npx playwright test --headed

# Open the HTML report
npx playwright show-report
```

Type check:

```bash
npm run typecheck
```

## Project structure

```
.
├── data/                  # Test data (no hardcoded values in tests)
├── pages/                 # Page Objects (locators + actions, no assertions)
├── tests/                 # Test specs
├── playwright.config.ts   # baseURL, reporters, trace/screenshot, browsers
└── .github/workflows/     # CI workflow
```

## Conventions

- Page Object Model: locators and actions live in the page classes; assertions live in the tests.
- Web-first assertions only (`toBeVisible`, `toHaveText`, `toHaveURL`, …); no fixed waits.
- Independent tests that can run in any order.

## Assumptions, limitations and improvements

_To be completed as the implementation progresses. Unexpected behaviors found in the site will be documented here._

## Video walkthrough

_Link pending._
