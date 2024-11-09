import { UserType } from '@/types/domain/UserType';
import { atom } from 'jotai';

export const initialUserData = {
  userId: '',
  icon: '',
};

/**
 * TODO: userIdの初期値を仮で設定している
 */
export const userAtom = atom<UserType>(initialUserData);
