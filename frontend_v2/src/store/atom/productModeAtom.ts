import { ProductModeEnum } from '@/types/domain/ProductModeEnum';
import { atom } from 'jotai';

export const productModeAtom = atom<ProductModeEnum>(ProductModeEnum.TRIAL);
