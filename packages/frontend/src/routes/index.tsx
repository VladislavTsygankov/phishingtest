import { Authenticated } from "@refinedev/core";
import { ErrorComponent, ThemedLayoutV2, ThemedSiderV2 } from "@refinedev/mui";
import { Outlet, Route, Routes } from "react-router-dom";
import { Header } from "../components";
import { CatchAllNavigate, NavigateToResource } from "@refinedev/react-router-v6";
import { Login } from "../pages/login";
import { Register } from "../pages/register";
import { phishingRoute } from "../pages/phishing";

export const routes = (
  <Routes>
    <Route
      element={
        <Authenticated key="authenticated-inner" fallback={<CatchAllNavigate to="/login" />}>
          <ThemedLayoutV2
            Header={() => <Header sticky />}
            Sider={(props) => <ThemedSiderV2 {...props} />}>
            <Outlet />
          </ThemedLayoutV2>
        </Authenticated>
      }>
      <Route index element={<NavigateToResource resource="phishing" />} />

      {phishingRoute}

      <Route path="*" element={<ErrorComponent />} />
    </Route>
    <Route
      element={
        <Authenticated key="authenticated-outer" fallback={<Outlet />}>
          <NavigateToResource />
        </Authenticated>
      }>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Route>
  </Routes>
);
