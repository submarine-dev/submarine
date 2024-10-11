import { FC } from 'react';
import ProtectedRoutesLayout from '../layout';
import SearchSubscriptionContainer from './components/SearchSubscriptionContainer';

/**
 * サブスクリプション検索
 */
const SearchSubscriptionPage: FC = () => {
  return (
    <ProtectedRoutesLayout>
      <SearchSubscriptionContainer />
    </ProtectedRoutesLayout>
  );
};

export default SearchSubscriptionPage;
