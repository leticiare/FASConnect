import { Fab } from "@mui/material";
import { useNavigate } from "react-router-dom";
import NavLink from "./NavbarLink";

export default function NavbarLinks() {
  const navigate = useNavigate();
  return (
    <>
      <div className="text-white flex gap-4 items-center">
        <NavLink to="/">Local</NavLink>
        <NavLink to="/palcos">Palco</NavLink>
        <NavLink to="/shows">Shows</NavLink>
        <NavLink to="/Map">Mapa</NavLink>

        <Fab variant="extended" onClick={() => navigate("/")}>
          Minha Programação
        </Fab>
      </div>
    </>
  );
}
