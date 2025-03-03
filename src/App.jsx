import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Toaster as Sonner } from "@/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { PlayerContextProvider } from "./context/PlayerContext";
import { ProgressContextProvider } from "./context/ProgressContext";
import { NetworkStatusContextProvider } from "./context/NetworkStatusContext";
import { ApplicationSettingsProvider } from "./context/ApplicationSettings";
import { PlayerActionsContextProvider } from "./context/PlayerActionsCotext";
import { PlayerControllerContextProvider } from "./context/PlayerControllerContext";
import { PlayerModeContextProvider } from "./context/PlayerModeContext";
import { AuthContextProvider } from "./context/AuthContext";

import AppRoutes from "./AppRoutes";

import "./App.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
      <Sonner />
      <BrowserRouter>
        <AuthContextProvider>
          <NetworkStatusContextProvider>
            <ApplicationSettingsProvider>
              <PlayerContextProvider>
                <PlayerModeContextProvider>
                  <PlayerControllerContextProvider>
                    <PlayerActionsContextProvider>
                      <ProgressContextProvider>
                        <AppRoutes />
                      </ProgressContextProvider>
                    </PlayerActionsContextProvider>
                  </PlayerControllerContextProvider>
                </PlayerModeContextProvider>
              </PlayerContextProvider>
            </ApplicationSettingsProvider>
          </NetworkStatusContextProvider>
        </AuthContextProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
