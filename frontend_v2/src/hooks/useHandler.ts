import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';

export type UseHandlerType<T> = [
  T,
  Dispatch<SetStateAction<T>>,
  (e: ChangeEvent<{ value: T }>) => void,
];

/**
 * 入力をハンドリングするhooks
 */
const useHandler = <T>(obj: T): UseHandlerType<T> => {
  const [data, setData] = useState<T>(obj);

  const handler = (e: ChangeEvent<{ value: T }>) => {
    const val = e.target.value;
    setData(val);
  };

  return [data, setData, handler];
};

export default useHandler;
