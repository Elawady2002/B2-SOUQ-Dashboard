import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import DashboardLayout from './components/layout/DashboardLayout';
import AdminDashboardLayout from './components/layout/AdminDashboardLayout';
import AuthLayout from './layouts/AuthLayout';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import AdminLogin from './pages/auth/AdminLogin';
import RoleSelection from './pages/auth/RoleSelection';

// Dashboard Pages
import Home from './pages/Home';
import SellerProfile from './pages/SellerProfile';
import StoreProfile from './pages/StoreProfile';
import Products from './pages/Products';
import AddProduct from './pages/AddProduct';
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

// Admin Pages
import AdminHome from './pages/admin/AdminHome';
import AdminMerchants from './pages/admin/AdminMerchants';
import AdminUsers from './pages/admin/AdminUsers';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';
import AdminReturns from './pages/admin/AdminReturns';
import AdminAds from './pages/admin/AdminAds';
import AdminSupport from './pages/admin/AdminSupport';
import AdminReports from './pages/admin/AdminReports';

// Protected Route Component
function ProtectedRoute({ children, allowedRole = 'merchant' }) {
  const isAuthenticated = localStorage.getItem('isAuthenticated');
  // Default to merchant for legacy support, or check if specific role logic exists
  const userRole = localStorage.getItem('userRole') || 'merchant';
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to role selection, but save the intended location
    return <Navigate to="/role-select" state={{ from: location.pathname + location.search }} replace />;
  }

  // If Admin tries to access Merchant routes
  if (allowedRole === 'merchant' && userRole === 'admin') {
    return <Navigate to="/admin/dashboard" replace />;
  }

  // If Merchant tries to access Admin routes
  if (allowedRole === 'admin' && userRole !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
}

// Auth Route Component (redirect if already logged in)
function AuthRoute({ children }) {
  const isAuthenticated = localStorage.getItem('isAuthenticated');
  const userRole = localStorage.getItem('userRole');

  if (isAuthenticated) {
    if (userRole === 'admin') {
      return <Navigate to="/admin/dashboard" replace />;
    }
    return <Navigate to="/" replace />;
  }

  return children;
}

function App() {
  return (
    <Routes>
      {/* Public Role Selection */}
      <Route path="/role-select" element={<AuthRoute><RoleSelection /></AuthRoute>} />

      {/* Auth Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<AuthRoute><Login /></AuthRoute>} />
        <Route path="/admin/login" element={<AuthRoute><AdminLogin /></AuthRoute>} />
        <Route path="/register" element={<AuthRoute><Register /></AuthRoute>} />
      </Route>

      {/* Admin Dashboard Routes (Protected) */}
      <Route path="/admin" element={<ProtectedRoute allowedRole="admin"><AdminDashboardLayout /></ProtectedRoute>}>
        <Route path="dashboard" element={<AdminHome />} />
        <Route path="merchants" element={<AdminMerchants />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="returns" element={<AdminReturns />} />
        <Route path="ads" element={<AdminAds />} />
        <Route path="support" element={<AdminSupport />} />
        <Route path="reports" element={<AdminReports />} />

        <Route index element={<Navigate to="/admin/dashboard" replace />} />
      </Route>

      {/* Merchant Dashboard Routes (Protected) */}
      <Route element={<ProtectedRoute allowedRole="merchant"><DashboardLayout /></ProtectedRoute>}>
        <Route path="/" element={<Home />} />
        <Route path="/seller-profile" element={<SellerProfile />} />
        <Route path="/store-profile" element={<StoreProfile />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/add" element={<AddProduct />} />
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
