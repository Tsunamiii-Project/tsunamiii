import { UseGuards } from '@nestjs/common';
import { AuthGuard as AuthGuardLocal } from '@/guards';

export const AuthGuard = () => UseGuards(AuthGuardLocal);
