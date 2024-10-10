import { FC } from "react";
import { SubscriptionSquare } from "@/components/SubscriptionSquare";
import { SquareContent } from "@/components/SquareContent";
import { IoIosSearch } from "react-icons/io";
import { SubscriptionBaseType } from "@/types/SubscriptionBaseType";

type Props = {
  listOfSubscriptions: SubscriptionBaseType[];
};

/**
 * サブスクの検索・追加をするボード
 */
export const AddSubscriptionBoard: FC<Props> = ({ listOfSubscriptions }) => {
  return (
    <div className='flex space-x-2 overflow-x-auto'>
      <a href={"/search"}>
        <SquareContent
          label={`サブスクを検索`}
          color='#FFFFFF'
          icon={<IoIosSearch size='25px' />}
        />
      </a>
      {listOfSubscriptions.map((subscriptionItem, index) => {
        return (
          <SubscriptionSquare
            key={subscriptionItem.subscriptionId}
            label={subscriptionItem.subscriptionName}
            color={subscriptionItem.color}
            iconUrl={subscriptionItem.icon}
            index={index}
          />
        );
      })}
    </div>
  );
};
