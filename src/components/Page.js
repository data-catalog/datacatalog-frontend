import React from 'react';
import { Container } from 'react-bootstrap';
import NotificationsSystem, { useNotifications, wyboTheme } from 'reapop';
import Appbar from './Appbar';

export default function Page({ children, docs }) {
  const { notifications, dismissNotification } = useNotifications();
  return (
    <>
      <NotificationsSystem
        notifications={notifications}
        dismissNotification={(id) => dismissNotification(id)}
        theme={wyboTheme}
      />
      <Appbar docs={docs} />
      {docs ? children : <Container className="my-5">{children}</Container>}
    </>
  );
}
