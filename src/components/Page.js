import React from 'react';
import { Container } from 'react-bootstrap';
import NotificationsSystem, { wyboTheme, useNotifications } from 'reapop';
import Appbar from './Appbar';
import AuthModal from './AuthModal';

const Page = ({ children }) => {
  const { notifications, dismissNotification } = useNotifications();
  return (
    <>
      <NotificationsSystem
        notifications={notifications}
        dismissNotification={(id) => dismissNotification(id)}
        theme={wyboTheme}
      />
      <AuthModal />
      <Appbar />
      <Container className="my-5">{children}</Container>
    </>
  );
};

export default Page;
