import { FC } from 'react';
import ProtectedRoutesLayout from '../layout';
import HomeContainer from './components/HomeContainer';

/**
 * ホーム
 */
const HomePage: FC = () => {
  return (
    <ProtectedRoutesLayout>
      <HomeContainer />
    </ProtectedRoutesLayout>
  );
};

export default HomePage;
