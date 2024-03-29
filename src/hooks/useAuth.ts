import React from "react";
import { useNavigate } from "react-router";
import { User } from "../model";

export const useAuth = () => {
  const navigate = useNavigate();
  const [user, setUser] = React.useState<User>(() => {
    try {
      const userData = sessionStorage.getItem("user");
      if (userData) {
        return JSON.parse(userData);
      }
      return null;
    } catch (err) {
      return err;
    }
  });

  const login = (data: any) => {
    sessionStorage.setItem("user", JSON.stringify(data));
    setUser(data);
    navigate("/apartments/dashboard");
  };

  const logout = () => {
    sessionStorage.setItem("user", "");
    navigate("/");
  };

  const value = React.useMemo(() => ({ user, login, logout }), [user]);

  return value;
};
