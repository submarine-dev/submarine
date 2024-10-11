import { CSSProperties, FC, ReactNode } from 'react';

type ColorString =
  | 'primary'
  | 'secondary'
  | 'secondary-dark'
  | 'white'
  | 'black';

type Props = {
  children: ReactNode;
  color?: ColorString;
  isCenter?: boolean;
  className?: string;
  style?: CSSProperties;
};

const colorFn = (color?: ColorString): string => {
  return color ? `text-${color}` : '';
};

const centerFn = (isCenter?: boolean): string => {
  return isCenter ? 'text-center' : '';
};

/**
 * H1
 */
export const H1: FC<Props> = ({
  children,
  color,
  isCenter,
  className,
  style,
}) => {
  return (
    <h1
      style={{ ...style }}
      className={`scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl ${colorFn(
        color
      )} ${centerFn(isCenter)} ${className}`}
    >
      {children}
    </h1>
  );
};

/**
 * H2
 */
export const H2: FC<Props> = ({
  children,
  color,
  isCenter,
  className,
  style,
}) => {
  return (
    <h2
      style={{ ...style }}
      className={`scroll-m-20 text-xl font-semibold tracking-tight ${colorFn(
        color
      )} ${centerFn(isCenter)} ${className}`}
    >
      {children}
    </h2>
  );
};

/**
 * Body
 */
export const BodyTypo: FC<Props> = ({
  children,
  color,
  isCenter,
  className,
  style,
}) => {
  return (
    <div
      style={{ ...style }}
      className={`text-sm font-bold ${colorFn(
        color
      )} ${centerFn(isCenter)} ${className}`}
    >
      {children}
    </div>
  );
};

/**
 * Body2
 */
export const Body2Typo: FC<Props> = ({
  children,
  color,
  isCenter,
  className,
  style,
}) => {
  return (
    <div
      style={{ ...style }}
      className={`text-sm font-bold text-gray-500 ${colorFn(
        color
      )} ${centerFn(isCenter)} ${className}`}
    >
      {children}
    </div>
  );
};
