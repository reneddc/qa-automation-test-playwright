import type { APIRequestContext } from '@playwright/test';
import type { User } from '../entities/user';

export class UserClient {
  private readonly request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async register(user: User): Promise<void> {
    const response = await this.request.post('/users/register', {
      maxRetries: 3,
      data: {
        first_name: user.firstName,
        last_name: user.lastName,
        dob: user.dateOfBirth,
        phone: user.phone,
        email: user.email,
        password: user.password,
        address: {
          street: user.street,
          house_number: user.houseNumber,
          city: user.city,
          state: user.state,
          country: user.country,
          postal_code: user.postalCode,
        },
      },
    });

    if (!response.ok()) {
      throw new Error(
        `User registration failed with status ${response.status()}: ${await response.text()}`,
      );
    }
  }
}
