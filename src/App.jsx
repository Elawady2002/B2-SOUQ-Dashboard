import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './components/layout/DashboardLayout';
import AuthLayout from './layouts/AuthLayout';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Dashboard Pages
import Home from './pages/Home';
import SellerProfile from './pages/SellerProfile';
import StoreProfile from './pages/StoreProfile';
import Products from './pages/Products';
import Orders from './pages/Orders';
import Inventory from './pages/Inventory';
import Returns from './pages/Returns';
import Campaigns from './pages/Campaigns';
import Ads from './pages/Ads';
import Reports from './pages/Reports';
import Employees from './pages/Employees';
import ActivityLog from './pages/ActivityLog';
import Messages from './pages/Messages';
import Reviews from './pages/Reviews';

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
      <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
        <Route path="/" element={<Home />} />
        <Route path="/seller-profile" element={<SellerProfile />} />
        <Route path="/store-profile" element={<StoreProfile />} />
        <Route path="/products" element={<Products />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/returns" element={<Returns />} />
        <Route path="/campaigns" element={<Campaigns />} />
        <Route path="/ads" element={<Ads />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/activity-log" element={<ActivityLog />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/reviews" element={<Reviews />} />
        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
