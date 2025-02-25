import { useRoutes } from "react-router-dom";
import { Concert } from "../pages/Concerts";
import { Stages } from "../pages/Stages";

import Favorites from "../pages/Favorites";
import { LandingPage } from "../pages/LandingPage";
import { Mapa } from "../pages/Map";

export const AppRoutes = () => {
  return useRoutes([
    { path: "/", element: <LandingPage /> },
    { path: "/shows", element: <Concert /> },
    { path: "/palcos", element: <Stages /> },
    { path: "/map", element: <Mapa /> },
    { path: "/favoritos", element: <Favorites /> },
  ]);
};
