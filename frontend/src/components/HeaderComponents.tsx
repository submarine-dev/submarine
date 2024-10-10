/* eslint-disable @next/next/no-img-element */
'use client';

import { FC } from 'react';
import { H2 } from './Typography';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { usePathname, useRouter } from 'next/navigation';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Button } from './ui/button';
import { logout } from '@/lib/firebase/auth';
import { useAuth } from './functions/context/auth';

/**
 * ヘッダー
 */
export const HeaderComponents: FC = () => {
  const { fbUser } = useAuth();
  const router = useRouter();
  const pathName = usePathname();

  /**
   * 戻るボタンクリック
   */
  const handleClickBackScreen = (): void => {
    router.back();
  };

  /**
   * ホーム以外のパスかどうか
   * - ホーム以外の場合にはbackボタンを表示する
   */
  const isNotHomePath = pathName !== '/home';

  return (
    <header className="grid grid-cols-12 justify-center items-center pb-3 pr-4">
      <button
        onClick={handleClickBackScreen}
        type="button"
        className="col-span-1"
        disabled={!isNotHomePath}
      >
        {isNotHomePath ? (
          <IoMdArrowRoundBack className="p-1 w-full h-full bg-white rounded-full" />
        ) : null}
      </button>
      <div className="col-span-10">
        <H2 isCenter color="white" className="text-white">
          Submarine
        </H2>
      </div>
      <Drawer>
        <DrawerTrigger asChild>
          <Button size="icon" className="col-span-1">
            <img
              src={fbUser?.photoURL ?? ''}
              alt={fbUser?.displayName ?? 'userName'}
              width={35}
              height={35}
              className="rounded-full"
            />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <p className="border-b mx-5 pb-2">ログアウト</p>
          <div className="flex flex-col items-center gap-4 p-5">
            <Button onClick={logout} className="w-[50%]">
              ログアウト
            </Button>
            <DrawerClose className="w-[50%]">
              <Button variant="outline" className="w-full">
                キャンセル
              </Button>
            </DrawerClose>
          </div>
        </DrawerContent>
      </Drawer>
    </header>
  );
};
