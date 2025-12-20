import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './components/layout/DashboardLayout';
import AuthLayout from './layouts/AuthLayout';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Protected Route Component
function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem('isAuthenticated');
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

// Auth Route Component (redirect to home if already logged in)
function AuthRoute({ children }) {
  const isAuthenticated = localStorage.getItem('isAuthenticated');
  return isAuthenticated ? <Navigate to="/" replace /> : children;
}

function App() {
  return (
    <Routes>
      {/* Auth Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<AuthRoute><Login /></AuthRoute>} />
        <Route path="/register" element={<AuthRoute><Register /></AuthRoute>} />
      </Route>

      {/* Dashboard Routes (Protected) */}
      <Route path="/*" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>} />
    </Routes>
  );
}

export default App;
