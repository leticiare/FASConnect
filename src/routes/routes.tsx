import { useRoutes } from "react-router-dom";
import { Concert } from "../pages/Concerts";
import { Stages } from "../pages/Stages";

export const AppRoutes = () => {
  return useRoutes([
    { path: "/shows", element: <Concert /> },
    { path: "/palcos", element: <Stages /> },
  ]);
};
