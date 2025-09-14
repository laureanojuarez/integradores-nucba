import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoute({ children }) {
  const { token, loading } = useSelector((s) => s.auth);
  const isAuthenticated = Boolean(token);
  const location = useLocation();

  if (loading) {
    return (
      <div>
        <div>Cargando</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}
