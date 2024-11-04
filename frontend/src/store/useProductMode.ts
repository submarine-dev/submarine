import { localStorageKeys } from '@/const/localStorageKeys';
import { ProductModeEnum } from '@/types/domain/ProductModeEnum';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { productModeAtom } from './atom/productModeAtom';

export const useProductMode = (): {
  productMode: ProductModeEnum;
  forAuthGetProductMode: () => ProductModeEnum;
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
   * localStorageから現在のproductModeを取得
   * @returns ProductModeEnum
   */
  const getCurrentProductMode = (): ProductModeEnum => {
    const productMode = localStorage.getItem(localStorageKeys.PRODUCT_MODE_KEY);
    switch (productMode) {
      case ProductModeEnum.DEMO:
        return ProductModeEnum.DEMO;
      case ProductModeEnum.PRODUCTION:
        return ProductModeEnum.PRODUCTION;
      default:
        return ProductModeEnum.NONE_SELECTED;
    }
  };

  /**
   * 初回ロード時のみlocalStorageから取得
   */
  useEffect(() => {
    const currentProductMode = getCurrentProductMode();
    handleChangeProductMode(currentProductMode);
  }, []);

  return {
    productMode,
    forAuthGetProductMode: getCurrentProductMode,
    changeToDemo: () => {
      handleChangeProductMode(ProductModeEnum.DEMO);
    },
    changeToProduction: () => {
      handleChangeProductMode(ProductModeEnum.PRODUCTION);
    },
  };
};
