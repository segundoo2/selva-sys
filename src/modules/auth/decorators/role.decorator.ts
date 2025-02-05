import { SetMetadata } from '@nestjs/common';

// Defined the key used in metadata
export const ROLES_KEY = 'roles';

// Create one decorator for defined roles permitted
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
