import { Outlet } from 'react-router-dom';
import { Header } from '../common/Header/Header';
import { Footer } from '../common/Footer/Footer';
import { LayoutContainer, MainContent } from './CustomerLayout.sc';

export const CustomerLayout = () => {
  return (
    <LayoutContainer>
      <Header variant="customer" />
      <MainContent>
        <Outlet />
      </MainContent>
      <Footer />
    </LayoutContainer>
  );
};
