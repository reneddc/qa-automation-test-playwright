import { env } from '../config/env';
import type { User } from '../entities/user';

export function createUser(projectName: string): User {
  const project = projectName.toLowerCase();
  const stamp = new Date().toISOString().replace(/\D/g, '');
  const suffix = project.slice(0, 2) + stamp.slice(4, 14);
  const uniqueName = (base: string) => (base + suffix).slice(-20);
  const [localPart, domain] = env.candidateEmail.split('@');

  return {
    firstName: uniqueName(env.user.firstName),
    lastName: uniqueName(env.user.lastName),
    dateOfBirth: env.user.dateOfBirth,
    country: env.register.country,
    postalCode: env.register.postalCode,
    houseNumber: env.register.houseNumber,
    street: env.register.expectedAddress.street,
    city: env.register.expectedAddress.city,
    state: env.register.expectedAddress.state,
    phone: env.user.phone,
    email: `${localPart}+${project}-${stamp}@${domain}`,
    password: env.user.password + stamp.slice(-4),
  };
}
