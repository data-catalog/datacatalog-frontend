import { useNotifications } from 'reapop';

export default function useNotify() {
  const { notify } = useNotifications();

  return (message, status, options) => notify({ message, status, ...options });
}
