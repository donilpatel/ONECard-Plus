import React, { createContext, useState, useEffect, ReactNode } from "react";
import * as SecureStore from "expo-secure-store";

interface AuthContextType {
  userToken: string | null;
  loading: boolean;
  signIn: () => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync("authToken");
      setUserToken(token);
      setLoading(false);
    };

    loadToken();
  }, []);

  const signIn = () => {
    setUserToken("dummyToken"); // Simulate successful login
    SecureStore.setItemAsync("authToken", "dummyToken");
  };

  const signOut = () => {
    setUserToken(null); // Clear the token
    SecureStore.deleteItemAsync("authToken");
  };

  return (
    <AuthContext.Provider value={{ userToken, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
