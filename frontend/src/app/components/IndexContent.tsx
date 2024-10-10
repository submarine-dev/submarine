'use client';

import { H1 } from '@/components/Typography';
import UnauthenticatedLayout from '@/components/functions/auth/UnauthenticatedLayout';
import { Button } from '@/components/ui/button';
import { login } from '@/lib/firebase/auth';
import Image from 'next/image';
import { FC } from 'react';

/**
 * ログイントップ/content
 */
const IndexContent: FC = () => {
  return (
    <div className="flex items-center justify-center w-[100dvw] h-[100dvh] bg-gradient-to-t from-[#0B1C31] to-primary overflow-hidden">
      <div className="h-[80vh] flex flex-col justify-between">
        <H1 color="white" style={{ paddingTop: '20dvh' }}>
          Submarine
        </H1>
        <UnauthenticatedLayout>
          <Button
            variant="outline"
            onClick={login}
            className="my-10"
          >
            <Image
              src={'/google-icon.png'}
              alt={'google icon'}
              width={20}
              height={20}
            />
            &nbsp;&nbsp; Sign With Google
          </Button>
        </UnauthenticatedLayout>
      </div>
    </div>
  );
};

export default IndexContent;
