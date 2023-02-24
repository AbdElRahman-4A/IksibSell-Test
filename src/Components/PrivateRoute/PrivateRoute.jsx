import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { DataContext } from "../../Context/DataStore";

const PrivateRoutes = ({ children, ...rest }) => {
  const { token } = useContext(DataContext);

  if (!token) return <Navigate to="/login" />;

  return children;
};

export default PrivateRoutes;
