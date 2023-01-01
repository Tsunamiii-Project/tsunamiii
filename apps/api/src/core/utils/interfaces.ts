import type { TUserWithPassword } from '@/modules/users';
import { Socket } from 'socket.io';
import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  user: TUserWithPassword;
}

export interface AuthenticatedSocket extends Socket {
  user?: TUserWithPassword;
}
