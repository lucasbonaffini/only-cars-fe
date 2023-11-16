import React, { createContext, useContext, useState, useEffect } from "react";
import Keycloak from "keycloak-js";
import { useReducer } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const initialState = { favs: JSON.parse(localStorage.getItem("favs")) || [] };

const keycloak = new Keycloak({
  url: import.meta.env.VITE_KEYCLOAK_URL,
  realm: import.meta.env.VITE_KEYCLOAK_REALM,
  clientId: import.meta.env.VITE_KEYCLOAK_CLIENT,
});

const reducer = (state, action) => {
  switch (action.type) {
    case "GET_FAV_LIST":
      return { ...state, favs: [...state.favs, action.payload] };
    case "ADD_FAV":
      return { ...state, favs: [...state.favs, action.payload] };
    case "QUIT_FAV":
      return {
        ...state,
        favs: state.favs.filter((fav) => fav.id != action.payload.id),
      };
    default:
      throw new Error();
  }
};

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    keycloak.init({ onLoad: "check-sso" }).then((authenticated) => {
      setAuthenticated(authenticated);

      if (authenticated) {
        setUser({
          username: keycloak.tokenParsed.preferred_username,
          email: keycloak.tokenParsed.email,
          firstname: keycloak.tokenParsed.given_name,
          lastname: keycloak.tokenParsed.family_name,
        });
      }
    });
  }, []);

  const login = () => {
    keycloak.login();
  };

  const logout = () => {
    console.log(keycloak.tokenParsed);
    keycloak.logout();
  };

  const registration = () => {
    keycloak.register();
  };

  const isAuthenticated = () => {
    return authenticated;
  };

  const isAdmin = () => {
    return keycloak.tokenParsed.realm_access.roles.includes("admin");
  };

  return (
    <AuthContext.Provider
      value={{
        authenticated,
        user,
        login,
        logout,
        registration,
        isAuthenticated,
        isAdmin,
        dispatch,
        state,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
