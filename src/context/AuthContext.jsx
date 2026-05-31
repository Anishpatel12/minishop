import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import API from "../services/api";

const AuthContext =
  createContext();

export const AuthProvider = ({
  children,
}) => {
  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  // AUTO LOGIN
  useEffect(() => {
    const loadUser =
      async () => {
        try {
          const token =
            localStorage.getItem(
              "token"
            );

          if (!token) {
            setLoading(false);

            return;
          }

          const { data } =
            await API.get(
              "/auth/profile"
            );

          setUser(data);
        } catch (error) {
          localStorage.removeItem(
            "token"
          );
        } finally {
          setLoading(false);
        }
      };

    loadUser();
  }, []);

  // LOGIN
  const login = (userData) => {
    setUser(userData);
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem(
      "token"
    );

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,

        login,

        logout,

        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () =>
  useContext(AuthContext);