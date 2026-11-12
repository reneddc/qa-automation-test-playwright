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
