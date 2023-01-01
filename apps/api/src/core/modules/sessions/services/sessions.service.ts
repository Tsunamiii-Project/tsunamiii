import { Injectable } from '@nestjs/common';

import { AuthenticatedSocket } from '@/utils/interfaces';
import { ISessionsService } from '../interfaces';

@Injectable()
export class SessionsService implements ISessionsService {
  private readonly sessions: Map<string, AuthenticatedSocket> = new Map();

  getUserSession(id: string): AuthenticatedSocket {
    return this.sessions.get(id);
  }

  addUserSession(userId: string, socket: AuthenticatedSocket): void {
    this.sessions.set(userId, socket);
  }

  removeUserSession(userId: string): void {
    this.sessions.delete(userId);
  }

  getSessions(): Map<string, AuthenticatedSocket> {
    return this.sessions;
  }
}
