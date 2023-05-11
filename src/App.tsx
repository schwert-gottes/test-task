import routes from "./routes";
import { useRoutes } from "react-router-dom";

const App = (): React.ReactElement<
  any,
  string | React.JSXElementConstructor<any>
> | null => {
  const content = useRoutes(routes);
  return content;
};
export default App;
