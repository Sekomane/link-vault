interface NotificationProps {
  show: boolean;
  message: string;
}

export default function Notification({ show, message }: NotificationProps) {
  return show ? (
    <div className="notification">
      {message}
    </div>
  ) : null;
}