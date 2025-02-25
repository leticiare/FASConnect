import { useRoutes } from "react-router-dom";
import { Concert } from "../pages/Concerts";
import { Stages } from "../pages/Stages";
import { Mapa } from "../pages/Map";
import { LandingPage } from "../pages/LandingPage";

export const AppRoutes = () => {
  return useRoutes([
    { path: "/", element: <LandingPage /> },
    { path: "/shows", element: <Concert /> },
    { path: "/palcos", element: <Stages /> },
    { path: "/map", element: <Mapa /> },
  ]);
};
