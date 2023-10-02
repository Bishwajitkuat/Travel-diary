/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "logedin":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "logedout":
      return { ...state, user: null, isAuthenticated: false };
  }
};

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { user, isAuthenticated } = state;
  const test_user = {
    name: "Bisso",
    email: "bisso@test.com",
    password: "pass",
    avatar: "https://i.pravatar.cc/100?u=zz",
  };

  const login = (email, password) => {
    if (email === test_user.email && password === test_user.password) {
      dispatch({ type: "logedin", payload: test_user });
    }
  };

  const logout = () => {
    dispatch({ type: "logedout" });
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("useAuth is used outside of it's scope");
  return context;
};

export { AuthContextProvider, useAuth };
