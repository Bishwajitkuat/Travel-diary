import { createContext, useContext } from "react";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  
  return <AuthContext.Provider value={ }>
    {children}
  </AuthContext.Provider>
}

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error("useAuth is used outside of it's scope");
  return context
}

export { AuthContextProvider, useAuth }