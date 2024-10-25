import type { UserType } from '@/types/domain/auth/UserType';
import { atom } from 'jotai';

export const userAtom = atom<UserType>({ userId: '' });
