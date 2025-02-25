import { Fab, IconButton, Menu, MenuItem, useMediaQuery } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { useNavigate, Link } from "react-router-dom";
import { useState, MouseEvent } from "react";
import NavLink from "./NavbarLink";
export default function NavbarLinks() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMobile = useMediaQuery("(max-width: 600px)");

  const handleMenuOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="flex items-center">
      {isMobile ? (
        <>
          <IconButton
            edge="start"
            sx={{ color: "white" }}
            aria-label="menu"
            onClick={handleMenuOpen}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem component={Link} to="/palcos" onClick={handleMenuClose}>
              Palco
            </MenuItem>
            <MenuItem component={Link} to="/shows" onClick={handleMenuClose}>
              Shows
            </MenuItem>

            <MenuItem component={Link} to="/map" onClick={handleMenuClose}>
              Mapa
            </MenuItem>

            <MenuItem
              component={Link}
              to="/favoritos"
              onClick={handleMenuClose}
            >
              Minha Programação
            </MenuItem>
          </Menu>
        </>
      ) : (
        <div className="flex gap-4 items-center">
          <NavLink to="/palcos">Palco</NavLink>
          <NavLink to="/shows">Shows</NavLink>

          <NavLink to="/Map">Mapa</NavLink>

          <Fab variant="extended" onClick={() => navigate("/favoritos")}>
            Minha Programação
          </Fab>
        </div>
      )}
    </div>
  );
}
