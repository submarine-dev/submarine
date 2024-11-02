import { ProductModeEnum } from '@/types/domain/ProductModeEnum';
import { useAtom } from 'jotai';
import { productModeAtom } from './atom/productModeAtom';
import { localStorageKeys } from '@/const/localStorageKeys';
import { useEffect } from 'react';

export const useProductMode = (): {
  productMode: ProductModeEnum;
  changeToDemo: () => void;
  changeToProduction: () => void;
} => {
  const [productMode, setProductMode] = useAtom(productModeAtom);

  const handleChangeProductMode = (productMode: ProductModeEnum): void => {
    /**
     * state・localStorageに保存
     */
    setProductMode(productMode);
    localStorage.setItem(localStorageKeys.PRODUCT_MODE_KEY, productMode);
  };

  /**
   * 初回ロード時のみlocalStorageから取得
   */
  useEffect(() => {
    const productMode = localStorage.getItem(localStorageKeys.PRODUCT_MODE_KEY);
    switch (productMode) {
      case ProductModeEnum.DEMO:
        handleChangeProductMode(ProductModeEnum.DEMO);
        break;
      case ProductModeEnum.PRODUCTION:
        handleChangeProductMode(ProductModeEnum.PRODUCTION);
        break;
      default:
        handleChangeProductMode(ProductModeEnum.NONE_SELECTED);
        break;
    }
  }, []);

  return {
    productMode,
    changeToDemo: () => {
      handleChangeProductMode(ProductModeEnum.DEMO);
    },
    changeToProduction: () => {
      handleChangeProductMode(ProductModeEnum.PRODUCTION);
    },
  };
};
