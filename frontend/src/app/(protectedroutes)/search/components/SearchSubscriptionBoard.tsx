import { FC, useEffect, useState } from 'react';
import { SubscriptionSquare } from '@/components/SubscriptionSquare';
import { SubscriptionBaseType } from '@/types/SubscriptionBaseType';
import { BoardWrapper } from '@/components/BoardWrapper';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { IoMdSearch } from 'react-icons/io';

type Props = {
  listOfSubscriptions: SubscriptionBaseType[];
};

export const SearchSubscriptionBoard: FC<Props> = ({
  listOfSubscriptions,
}) => {
  const [searchText, setSearchText] = useState<string>('');
  const [searchResults, setSearchResults] = useState<
    SubscriptionBaseType[]
  >([]);
  const [
    selectedSubscriptionPlanId,
    setSelectedSubscriptionPlanId,
  ] = useState<string | null>(null);

  const searchHandler = () => {
    const searchTextLowerCase = searchText.toLowerCase();
    if (searchText === '') {
      setSearchResults(listOfSubscriptions);
      return;
    }
    const newSearchResults = listOfSubscriptions.filter(
      (data) =>
        data.subscriptionName
          .toLowerCase()
          .includes(searchTextLowerCase)
    );
    setSearchResults(newSearchResults);
  };

  // inputでEnterを押した時に検索を実行
  const handleKeyDown = (e: string) => {
    if (e === 'Enter') {
      searchHandler();
    }
  };

  useEffect(() => {
    setSearchResults(listOfSubscriptions);
  }, [listOfSubscriptions]);

  return (
    <BoardWrapper>
      <div className="flex justify-center items-center relative">
        <button
          onClick={() => searchHandler()}
          className="absolute left-2"
        >
          <IoMdSearch size="20px" />
        </button>
        <Input
          type="search"
          value={searchText}
          onKeyDown={(event) => handleKeyDown(event.key)}
          onChange={(event) =>
            setSearchText(event.target.value)
          }
          placeholder="サブスクリプションを検索"
          className="w-[100%] pl-8"
        />
      </div>
      {searchResults.length === 0 &&
      listOfSubscriptions.length === 0 &&
      searchText !== '' ? (
        <p className="m-3">
          該当するサブスクリプションは見つかりませんでした
        </p>
      ) : (
        <ScrollArea className="my-4">
          <div className="grid grid-cols-3 gap-1">
            {searchResults.map(
              (subscriptionItem, index) => {
                return (
                  <Drawer
                    key={subscriptionItem.subscriptionId}
                  >
                    <DrawerTrigger asChild>
                      <SubscriptionSquare
                        label={
                          subscriptionItem.subscriptionName
                        }
                        color="#FFFFFF"
                        iconUrl={subscriptionItem.icon}
                        index={index}
                      />
                    </DrawerTrigger>
                    <DrawerContent>
                      <p className="mx-5 pb-2">
                        新しいサブスクリプションを追加
                      </p>
                      <div className="border-b flex gap-2 mx-5 pb-2">
                        <Image
                          src={subscriptionItem.icon}
                          alt={'サブスクアイコン'}
                          width={24}
                          height={24}
                        />
                        <p>
                          {
                            subscriptionItem.subscriptionName
                          }
                        </p>
                      </div>
                      <div className="flex flex-col items-center gap-4 p-5">
                        <div className="w-full flex flex-col justify-center gap-2">
                          <Button
                            className=""
                            onClick={() => {}}
                          >
                            プラン1
                          </Button>
                          <Button>プラン2</Button>
                          <Button>プラン3</Button>
                        </div>
                        <DrawerClose className="w-full flex justify-center gap-4">
                          <Button
                            variant="outline"
                            className="w-[30%]"
                          >
                            キャンセル
                          </Button>
                          <Button
                            disabled={
                              selectedSubscriptionPlanId ===
                              null
                            }
                            onClick={() => {}}
                            className="w-[30%]"
                          >
                            追加する
                          </Button>
                        </DrawerClose>
                      </div>
                    </DrawerContent>
                  </Drawer>
                );
              }
            )}
          </div>
        </ScrollArea>
      )}
    </BoardWrapper>
  );
};
