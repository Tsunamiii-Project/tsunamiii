import { AuthenticatedSocket } from '@/utils/interfaces';

export interface ISessionsService {
  getUserSession: (username: string) => AuthenticatedSocket;
  addUserSession: (username: string, socket: AuthenticatedSocket) => void;
  removeUserSession: (username: string) => void;
  getSessions: () => Map<string, AuthenticatedSocket>;
}
