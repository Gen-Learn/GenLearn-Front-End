import { createRoot } from "react-dom/client";
import { AuthProvider } from "./contexts/AuthContext";
import { NotificationProvider } from "./contexts/NotificationContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import App from "./App";
const rootElement = document.getElementById("root");
const queryClient = new QueryClient();
if (!rootElement) throw new Error("Root element not found");
createRoot(rootElement).render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <NotificationProvider>
        <App />
      </NotificationProvider>
    </AuthProvider>
  </QueryClientProvider>,
);

