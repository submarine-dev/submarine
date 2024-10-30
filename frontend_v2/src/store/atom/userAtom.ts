import { UserType } from '@/types/domain/UserType';
import { atom } from 'jotai';

/**
 * TODO: userIdの初期値を仮で設定している
 */
export const userAtom = atom<UserType>({ userId: 'demo' });
