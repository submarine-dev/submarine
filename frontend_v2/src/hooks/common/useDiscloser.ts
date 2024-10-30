import { useState } from 'react';

type UseDiscloserType = [isOpen: boolean, open: () => void, close: () => void, toggle: () => void];

/**
 * 開閉状態などを管理するhooks
 */
const useDiscloser = (initialState = false): UseDiscloserType => {
  const [isOpen, setIsOpen] = useState(initialState);

  const open = (): void => {
    setIsOpen(true);
  };

  const close = (): void => {
    setIsOpen(false);
  };

  const toggle = (): void => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  return [isOpen, open, close, toggle];
};

export default useDiscloser;
