import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoutes = ({ isLogin }) =>
  isLogin ? <Outlet /> : <Navigate to="/login" />;

export default PrivateRoutes;
