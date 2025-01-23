import { useRoutes } from "react-router-dom";
import { Artists } from "../pages/Artists";
import { Stages } from "../pages/Stages";

export const AppRoutes = () => {
  return useRoutes([
    { path: "/artistas", element: <Artists /> },
    { path: "/palcos", element: <Stages /> },
  ]);
};
