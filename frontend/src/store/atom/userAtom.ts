import { UserType } from '@/types/domain/UserType';
import { atom } from 'jotai';

export const initialUserData = {
  userId: 'initialize_user',
  icon: 'https://picsum.photos/300',
};

/**
 * TODO: userIdの初期値を仮で設定している
 */
export const userAtom = atom<UserType>(initialUserData);
