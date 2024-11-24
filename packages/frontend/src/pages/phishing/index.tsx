import { Route } from "react-router-dom";
import { ListScreen } from "./screens/list.screen";

export const phishingRoute = (
  <Route path="/phishing">
    <Route index element={<ListScreen />} />
  </Route>
);
