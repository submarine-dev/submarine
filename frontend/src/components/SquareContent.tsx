import { BodyTypo } from '@/components/Typography';
import { LineBreak } from '@/util/LineBreak';
import { getTextColor } from '@/util/getTextColor';
import { FC, ReactNode } from 'react';

type Props = {
  label: string;
  color: string;
  icon: ReactNode;
  index?: number;
  onClick?: (index: number) => void;
};

/**
 * 四角表示するコンポーネント
 */
export const SquareContent: FC<Props> = ({
  index,
  label,
  color,
  icon,
  onClick,
}) => {
  const textColor = getTextColor(color) ? 'black' : 'white';
  return (
    <button
      onClick={onClick && (() => onClick(index ?? 0))}
      type="button"
      className="rounded-lg p-2 space-y-3 w-24 h-24 aspect-square shadow-md"
      style={{
        backgroundColor: color,
      }}
    >
      <BodyTypo
        isCenter
        color={textColor}
        style={{
          height: '2.2rem',
          width: '100%',
          overflow: 'hidden',
        }}
      >
        {label}
      </BodyTypo>
      <div className="flex justify-center">{icon}</div>
    </button>
  );
};
