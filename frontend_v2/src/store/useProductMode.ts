import { ProductModeEnum } from '@/types/domain/ProductModeEnum';
import { useAtom } from 'jotai';
import { productModeAtom } from './atom/productModeAtom';

export const useProductMode = (): {
  productMode: ProductModeEnum;
  changeToTrial: () => void;
} => {
  const [productMode, setProductMode] = useAtom(productModeAtom);

  return {
    productMode,
    changeToTrial: () => {
      setProductMode(ProductModeEnum.TRIAL);
    },
  };
};
