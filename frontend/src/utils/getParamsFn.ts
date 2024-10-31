type GetParamsFn = (targetParams: string[]) => string[];

/**
 * getParamsFn
 * URLからパラメータを取得する関数
 *
 * @targetParams 取得したいパラメータの配列
 * @returns paramsを含んだ配列
 */
export const getParamsFn: GetParamsFn = (targetParams) => {
  const params = new URLSearchParams(window.location.search);

  return targetParams.map((item) => {
    return params.get(item) ?? '';
  });
};
