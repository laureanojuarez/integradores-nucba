import {Navigate, useLocation} from "react-router-dom";
import {useAuth} from "../context/AuthProvider";
export default function ProtectedRoute({children}) {
  const {isAuthenticated, loading} = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div>
        <div>Cargando</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{from: location}} replace />;
  }

  return children;
}
