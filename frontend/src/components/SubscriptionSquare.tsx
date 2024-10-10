import Image, { StaticImageData } from 'next/image';
import { FC } from 'react';
import { SquareContent } from './SquareContent';

type Props = {
  index: number;
  label: string;
  color: string;
  iconUrl: string | StaticImageData;
  onClick?: (index: number) => void;
};

/**
 * 四角でサブスクを表示するコンポーネント
 */
export const SubscriptionSquare: FC<Props> = ({
  index,
  label,
  color,
  iconUrl,
  onClick,
}) => {
  return (
    <SquareContent
      index={index}
      label={label}
      color={color}
      icon={
        <div className="rounded-full bg-gray-100 p-1">
          <Image
            src={iconUrl}
            alt={label}
            width={25}
            height={25}
          />
        </div>
      }
      onClick={onClick}
    />
  );
};
