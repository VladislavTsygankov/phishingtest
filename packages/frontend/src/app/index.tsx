import { Refine } from "@refinedev/core";
import { DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbarProvider } from "@refinedev/kbar";
import { notificationProvider, RefineSnackbarProvider } from "@refinedev/mui";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import routerBindings, {
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { BrowserRouter } from "react-router-dom";
import { authProvider } from "./auth-provider";
import { ColorModeContextProvider } from "../contexts/color-mode";
import { routes } from "../routes";
import { dataProvider } from "./data-provider";

function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <CssBaseline />
          <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
          <RefineSnackbarProvider>
            <DevtoolsProvider>
              <Refine
                dataProvider={dataProvider}
                notificationProvider={notificationProvider}
                routerProvider={routerBindings}
                authProvider={authProvider}
                resources={[
                  {
                    name: "phishing",
                    list: "/phishing",
                    meta: {
                      canDelete: true,
                    },
                  },
                ]}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  useNewQueryKeys: true,
                }}>
                {routes}
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
            </DevtoolsProvider>
          </RefineSnackbarProvider>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
