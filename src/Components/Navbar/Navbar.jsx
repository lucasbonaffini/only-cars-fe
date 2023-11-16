import React, { useState } from "react";
import { Link } from "react-router-dom";
import { routes } from "../../Utils/routes";
import { Menu, MenuItem } from "@mui/material";
import { useAuth } from "../AuthContext/AuthContext";
import OnlyCars_1 from "../../img/OnlyCars_1.png";
import LoginIcon from "@mui/icons-material/Login";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import LogoutIcon from "@mui/icons-material/Logout";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import "./Navbar.css";

const Navbar = () => {
  const auth = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const goTopSmooth = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleLogin = () => {
    auth.login();
  };

  const handleLogout = () => {
    auth.logout();
  };

  const handleRegistration = () => {
    auth.registration();
  };

  const viewInfo = () => {
    console.log(auth.isAdmin());
  };

  return (
    <nav>
      <div>
        <Link to={routes.home}>
          <img
            style={{
              width: "150px",
              marginLeft: "10px",
              marginTop: "10px",
            }}
            src={OnlyCars_1}
            alt="Logo"
            className="logo"
            onClick={goTopSmooth}
          />
        </Link>
      </div>
      <div className="navButton">
        {auth.isAuthenticated() ? (
          <div style={{ position: "relative" }}>
            <button className="user-btn" onClick={handleMenuClick}>
              <span>
                {auth.user
                  ? auth.user.firstname[0].toUpperCase() +
                    (auth.user.lastname
                      ? auth.user.lastname[0].toUpperCase()
                      : "")
                  : "Usuario"}
                <PersonIcon className="user-icon" />
              </span>
            </button>
            <Menu
              className="menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem className="item-menu" component={Link} to="/">
                <HomeIcon className="icon" />
                Inicio
              </MenuItem>
              <MenuItem
                className="item-menu"
                component={Link}
                to="/administracion"
              >
                <AdminPanelSettingsIcon className="icon" />
                Panel de administrador
              </MenuItem>
              <MenuItem
                className="item-menu"
                component={Link}
                to={routes.profile}
              >
                <ManageAccountsIcon className="icon" />
                Perfil
              </MenuItem>
              <MenuItem
                className="item-menu"
                component={Link}
                to={routes.favorites}
              >
                <FavoriteBorderIcon className="icon" />
                Mis favoritos
              </MenuItem>
              <MenuItem
                className="item-menu"
                component={Link}
                to={routes.reservationsHistory}
              >
                <CalendarMonthIcon className="icon" />
                Mis Reservas
              </MenuItem>
              <MenuItem className="item-menu" onClick={handleLogout}>
                <LogoutIcon className="icon" />
                Cerrar sesión
              </MenuItem>
            </Menu>
          </div>
        ) : (
          <div className="button-container">
            <button onClick={handleLogin}>
              Iniciar sesión
              <LoginIcon className="icon" />
            </button>
            <button onClick={handleRegistration}>
              Crear usuario
              <PersonIcon className="icon" />
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
