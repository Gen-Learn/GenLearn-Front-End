import { useState } from "react";
import { Link } from "react-router-dom";
type Notification = {
  id: string;
  title: string;
  message: string;
  createdAt: string;
  read: boolean;
  type?: "social" | "warning" | "success" | "message";
};

type Props = {
  notifications: Notification[];
  onMarkAllRead?: () => void;
  onViewAll?: () => void;
};

const iconMap: Record<
  NonNullable<Notification["type"]>,
  { icon: string; bgClass: string; textClass: string }
> = {
  social:  { icon: "👤", bgClass: "bg-[#CECBF6]", textClass: "text-[#3C3489]" },
  warning: { icon: "⚠️", bgClass: "bg-[#FAC775]", textClass: "text-[#633806]" },
  success: { icon: "✓",  bgClass: "bg-[#9FE1CB]", textClass: "text-[#085041]" },
  message: { icon: "💬", bgClass: "bg-[#F5C4B3]", textClass: "text-[#712B13]" },
};

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hr ago`;
  const days = Math.floor(hrs / 24);
  if (days === 1) return "Yesterday";
  return `${days} days ago`;
}

const BellIcon = () => (
  <svg
    width="17" height="17" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round"
    className="text-gray-400 shrink-0" aria-hidden="true"
  >
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

export default function NotificationPanel({ notifications, onMarkAllRead, onViewAll }: Props) {
  const [items, setItems] = useState<Notification[]>(notifications);

  const unreadCount = items.filter((n) => !n.read).length;

  const handleMarkAllRead = () => {
    setItems((prev) => prev.map((n) => ({ ...n, read: true })));
    onMarkAllRead?.();
  };

  const handleMarkRead = (id: string) => {
    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  return (
    <div className="absolute top-14 right-0 w-[360px] bg-white rounded-2xl border border-black/10 shadow-[0_8px_32px_rgba(0,0,0,0.10),0_2px_8px_rgba(0,0,0,0.06)] z-50 overflow-hidden">

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-black/[0.08] bg-gray-50">
        <div className="flex items-center gap-2">
          <BellIcon />
          <span className="text-sm font-medium text-gray-900">Notifications</span>
          {unreadCount > 0 && (
            <span className="bg-[#534AB7] text-[#EEEDFE] text-[11px] font-medium px-[7px] py-px rounded-full leading-[18px]">
              {unreadCount}
            </span>
          )}
        </div>
        {unreadCount > 0 && (
          <button
            onClick={handleMarkAllRead}
            className="text-xs text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
          >
            Mark all read
          </button>
        )}
      </div>

      {/* List */}
      <div className="max-h-[340px] overflow-y-auto">
        {items.length === 0 ? (
          <div className="flex flex-col items-center py-10 px-4">
            <svg
              width="32" height="32" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="1.5"
              className="text-gray-300 mb-2" aria-hidden="true"
            >
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            <p className="text-[13px] text-gray-400">No notifications yet.</p>
          </div>
        ) : (
          items.map((notification) => {
            const { icon, bgClass, textClass } = iconMap[notification.type ?? "social"];
            return (
              <Link
              to ="/courses"
                key={notification.id}
                role="button"
                tabIndex={0}
                onClick={() => handleMarkRead(notification.id)}
                onKeyDown={(e) => e.key === "Enter" && handleMarkRead(notification.id)}
                aria-label={`Notification: ${notification.title}${notification.read ? "" : ", unread"}`}
                className={[
                  "flex items-start gap-3 px-4 py-[13px] border-b border-black/[0.07] cursor-pointer transition-colors duration-150 last:border-b-0",
                  notification.read
                    ? "bg-white hover:bg-gray-50"
                    : "bg-[#EEEDFE] hover:bg-[#CECBF6]",
                ].join(" ")}
              >
                {/* Unread dot */}
                <div
                  className={[
                    "w-[7px] h-[7px] rounded-full shrink-0 mt-[5px]",
                    notification.read ? "bg-transparent" : "bg-[#534AB7]",
                  ].join(" ")}
                  aria-hidden="true"
                />

                {/* Icon avatar */}
                <div
                  className={`w-[34px] h-[34px] rounded-full flex items-center justify-center shrink-0 text-[15px] font-medium ${bgClass} ${textClass}`}
                  aria-hidden="true"
                >
                  {icon}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-medium text-gray-900 mb-0.5">{notification.title}</p>
                  <p className="text-xs text-gray-500 mb-1 truncate leading-relaxed">{notification.message}</p>
                  <span className="text-[11px] text-gray-300">{timeAgo(notification.createdAt)}</span>
                </div>
              </Link>
            );
          })
        )}
      </div>

      {/* Footer */}
      {items.length > 0 && (
        <div className="px-4 py-[10px] border-t border-black/[0.08] text-center">
          <button
            onClick={onViewAll}
            className="text-xs font-medium text-[#534AB7] hover:text-[#3C3489] transition-colors cursor-pointer"
          >
            View all notifications →
          </button>
        </div>
      )}
    </div>
  );
}