import {
  createContext,
  useContext,
  useMemo,
  useState,
  ReactNode,
} from "react";

type Notification = {
  id: string;
  title: string;
  message: string;
  createdAt: string;
  read: boolean;
  courseId?: string; // Optional field to link to a specific course
};

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  courseID: string | null;
  addNotification: (notification: Omit<Notification, "id" | "createdAt" | "read">) => void;
  markAllRead: () => void;
  clearNotifications: () => void;
  setCourseID: (courseId: string | null) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [courseID, setCourseID] = useState<string | null>(null);
  const unreadCount = useMemo(
    () => notifications.filter((notification) => !notification.read).length,
    [notifications]
  );

  const addNotification = (notification: Omit<Notification, "id" | "createdAt" | "read">) => {
    setNotifications((prev) => [
      {
        id: `${Date.now()}-${prev.length}`,
        createdAt: new Date().toISOString(),
        read: false,
        ...notification,
      },
      ...prev,
    ]);
  };

  const markAllRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        courseID,
        addNotification,
        markAllRead,
        clearNotifications,
        setCourseID
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification must be used inside <NotificationProvider>");
  }
  return context;
};
