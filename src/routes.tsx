import { Suspense, lazy } from "react";
import type { RouteObject } from "react-router";
import { Loader } from "./components";
import { MainLayout } from "./layout";

const Loadable = (Component: any) => (props: JSX.IntrinsicAttributes) =>
  (
    <Suspense fallback={<Loader />}>
      <Component {...props} />
    </Suspense>
  );

// * HOME PAGE
const Home = Loadable(lazy(() => import("./views/notes/main")));

const routes: RouteObject[] = [
  {
    path: "*",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
];

export default routes;
