import type { Locator, Page } from '@playwright/test';
import type { User } from '../entities/user';

export interface AddressLocators {
  street: Locator;
  city: Locator;
  state: Locator;
}

export class RegisterPage {
  private readonly page: Page;
  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly dateOfBirthInput: Locator;
  private readonly countrySelect: Locator;
  private readonly postalCodeInput: Locator;
  private readonly houseNumberInput: Locator;
  private readonly streetInput: Locator;
  private readonly cityInput: Locator;
  private readonly stateInput: Locator;
  private readonly phoneInput: Locator;
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly registerButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.getByTestId('first-name');
    this.lastNameInput = page.getByTestId('last-name');
    this.dateOfBirthInput = page.getByTestId('dob');
    this.countrySelect = page.getByTestId('country');
    this.postalCodeInput = page.getByTestId('postal_code');
    this.houseNumberInput = page.getByTestId('house_number');
    this.streetInput = page.getByTestId('street');
    this.cityInput = page.getByTestId('city');
    this.stateInput = page.getByTestId('state');
    this.phoneInput = page.getByTestId('phone');
    this.emailInput = page.getByTestId('email');
    this.passwordInput = page.getByTestId('password');
    this.registerButton = page.getByTestId('register-submit');
  }

  async goto(): Promise<void> {
    await this.page.goto('/auth/register');
  }

  async fillPersonalData(user: User): Promise<void> {
    await this.firstNameInput.fill(user.firstName);
    await this.lastNameInput.fill(user.lastName);
    await this.dateOfBirthInput.fill(user.dateOfBirth);
  }

  async fillAddress(user: User): Promise<void> {
    await this.countrySelect.selectOption(user.country);
    await this.postalCodeInput.fill(user.postalCode);
    await this.houseNumberInput.fill(user.houseNumber);
  }

  captureAddress(): AddressLocators {
    return {
      street: this.streetInput,
      city: this.cityInput,
      state: this.stateInput,
    };
  }

  async fillContact(user: User): Promise<void> {
    await this.phoneInput.fill(user.phone);
    await this.emailInput.fill(user.email);
    await this.passwordInput.fill(user.password);
  }

  async submit(): Promise<void> {
    await this.registerButton.click();
  }
}
