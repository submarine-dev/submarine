/**
 * 背景のカラーコードから、テキストが白か黒かを判定する
 *
 * @param backGroundColor バックエンドのカラーコード
 * @returns isBlack テキストが黒か
 */
export const getTextColor = (
  backGroundColor: string
): boolean => {
  // カラーコードからRGB値を抽出
  const r = parseInt(backGroundColor.slice(1, 3), 16);
  const g = parseInt(backGroundColor.slice(3, 5), 16);
  const b = parseInt(backGroundColor.slice(5, 7), 16);

  // RGB値から輝度を計算
  const brightness = 0.299 * r + 0.587 * g + 0.114 * b;

  // 輝度が中間値より高ければ黒、そうでなければ白を返す
  return brightness > 186;
};
