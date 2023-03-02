import { Navigate, Outlet } from "react-router";
import { Layout } from "../components";
import { useAuth } from "../hooks/useAuth";

export const Flats = () => {
  const { user } = useAuth();

  if (!user?.flat) return <Navigate to="/" />;

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};
