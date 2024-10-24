import { FC } from 'react';

type Props = {
  children: string;
};

/**
 * 改行文字を含んだ文字列を改行して表示するコンポーネント
 *
 * @param text 改行したい文字列
 * @returns 改行が含まれた文字列
 */
export const LineBreak: FC<Props> = ({ children }) => {
  const arrayLength = children.length;

  return (
    <>
      {children.split('\n').map((line, index) => {
        const ifEmptyTargetLine = index === 0 ? children[arrayLength] : children[index - 1];
        const isEmptyLine = line === '';
        const isStartOrLastLine = index === arrayLength - 1 || index === 0;

        const key = isEmptyLine ? ifEmptyTargetLine : line;

        if (isStartOrLastLine && isEmptyLine) return null;
        return (
          <p key={key}>
            {line}
            <br />
          </p>
        );
      })}
    </>
  );
};
