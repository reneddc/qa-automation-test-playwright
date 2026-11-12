function read(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing environment variable ${key}. Copy .env.example to .env and set it.`);
  }
  return value;
}

export const env = {
  candidateEmail: read('CANDIDATE_EMAIL'),
  user: {
    firstName: read('USER_FIRST_NAME'),
    lastName: read('USER_LAST_NAME'),
    dateOfBirth: read('USER_DOB'),
    phone: read('USER_PHONE'),
    password: read('USER_PASSWORD'),
  },
  register: {
    country: read('REGISTER_COUNTRY'),
    postalCode: read('REGISTER_POSTCODE'),
    houseNumber: read('REGISTER_HOUSE_NUMBER'),
    expectedAddress: {
      street: read('REGISTER_EXPECTED_STREET'),
      city: read('REGISTER_EXPECTED_CITY'),
      state: read('REGISTER_EXPECTED_STATE'),
    },
  },
};
