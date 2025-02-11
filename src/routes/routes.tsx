import { useRoutes } from "react-router-dom";
import { Concert } from "../pages/Concerts";
import { Stages } from "../pages/Stages";
import { Mapa } from "../pages/Map";

export const AppRoutes = () => {
  return useRoutes([
    { path: "/shows", element: <Concert /> },
    { path: "/palcos", element: <Stages /> },
    {path: "/map", element: <Mapa />}
  ]);
};
