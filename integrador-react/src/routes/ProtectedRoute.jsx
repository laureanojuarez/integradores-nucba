import { Navigate } from "react-router";

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useSelector((state) => state.user);

  if (!currentUser) {
    return (
      <Navigate to={redirectTo} state={{ redirectedFromCheckout: true }} />
    );
  }

  return children;
};

export default ProtectedRoute;
