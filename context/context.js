import React, { useState, useContext, createContext } from "react";

const authContext = createContext();
export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}
export const useContextData = () => {
  console.log("useAuth");
  return useContext(authContext);
};
function useProvideAuth() {
  const [context, setContext] = useState(null);
  return {
    context,
    setContext,
  };
}
