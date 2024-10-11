import { FC } from 'react';
import IndexContainer from './components/IndexContainer';
import RootLayout from './layout';

/**
 * ログイントップ
 */
const IndexPage: FC = () => {
  return (
    <RootLayout>
      <IndexContainer />
    </RootLayout>
  );
};

export default IndexPage;
