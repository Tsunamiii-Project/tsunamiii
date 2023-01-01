import { TUser } from '@/modules/users';

export interface IAuthService {
  validateUser: (username: string, password: string) => Promise<TUser | null>;
}
