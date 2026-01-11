import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import ManagerDashboard from './pages/manager-dashboard';
import AdminDashboard from './pages/admin-dashboard';
import AIInsightsAnalytics from './pages/ai-insights-analytics';
import AuthenticationLogin from './pages/authentication-login';
import LiveTrackingMap from './pages/live-tracking-map';
import DriverPWAApp from './pages/driver-pwa-app';
import BlockchainVerificationCenter from './pages/blockchain-verification';
import DigitalWalletDashboard from './pages/digital-wallet-dashboard';
import SmartContractManagement from './pages/smart-contract-management';
import AuthenticationSignup from './pages/authentication-signup';
import LandingPage from './pages/landing-page';
import ProtectedRoute from "./components/auth/ProtectedRoute";
import DriverTracker from "./pages/driver-tracker";

// Admin Detailed Pages
import DemandSurgePage from './pages/admin-detailed-views/DemandSurgePage';
import RouteOptimizationPage from './pages/admin-detailed-views/RouteOptimizationPage';
import DelayRiskPage from './pages/admin-detailed-views/DelayRiskPage';
import DriverIntelligencePage from './pages/admin-detailed-views/DriverIntelligencePage';
import ShipmentsPage from './pages/admin-detailed-views/ShipmentsPage';
import VehiclesPage from './pages/admin-detailed-views/VehiclesPage';
import DriversPage from './pages/admin-detailed-views/DriversPage';
import DeliveryPerformancePage from './pages/admin-detailed-views/DeliveryPerformancePage';

const lazyComp = {
  DemandSurgePage,
  RouteOptimizationPage,
  DelayRiskPage,
  DriverIntelligencePage,
  ShipmentsPage,
  VehiclesPage,
  DriversPage,
  DeliveryPerformancePage
};

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/authentication-login" element={<AuthenticationLogin />} />
          <Route path="/authentication-signup" element={<AuthenticationSignup />} />

          {/* Protected Role-Based Routes */}
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/manager-dashboard"
            element={
              <ProtectedRoute allowedRoles={['manager']}>
                <ManagerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/driver-pwa-app"
            element={
              <ProtectedRoute allowedRoles={['driver']}>
                <DriverPWAApp />
              </ProtectedRoute>
            }
          />

          {/* Admin-Only Enterprise Features */}
          <Route
            path="/ai-insights-analytics"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AIInsightsAnalytics />
              </ProtectedRoute>
            }
          />
          <Route
            path="/blockchain-verification-center"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <BlockchainVerificationCenter />
              </ProtectedRoute>
            }
          />
          <Route
            path="/digital-wallet-dashboard"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <DigitalWalletDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/smart-contract-management"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <SmartContractManagement />
              </ProtectedRoute>
            }
          />

          {/* Admin Detailed Views */}
          <Route path="/admin/shipments" element={<ProtectedRoute allowedRoles={['admin']}><React.Suspense fallback={<>Loading...</>}><lazyComp.ShipmentsPage /></React.Suspense></ProtectedRoute>} />
          <Route path="/admin/vehicles" element={<ProtectedRoute allowedRoles={['admin']}><React.Suspense fallback={<>Loading...</>}><lazyComp.VehiclesPage /></React.Suspense></ProtectedRoute>} />
          <Route path="/admin/drivers" element={<ProtectedRoute allowedRoles={['admin']}><React.Suspense fallback={<>Loading...</>}><lazyComp.DriversPage /></React.Suspense></ProtectedRoute>} />
          <Route path="/admin/delivery-performance" element={<ProtectedRoute allowedRoles={['admin']}><React.Suspense fallback={<>Loading...</>}><lazyComp.DeliveryPerformancePage /></React.Suspense></ProtectedRoute>} />
          <Route path="/admin/surges" element={<ProtectedRoute allowedRoles={['admin']}><React.Suspense fallback={<>Loading...</>}><lazyComp.DemandSurgePage /></React.Suspense></ProtectedRoute>} />
          <Route path="/admin/optimization" element={<ProtectedRoute allowedRoles={['admin']}><React.Suspense fallback={<>Loading...</>}><lazyComp.RouteOptimizationPage /></React.Suspense></ProtectedRoute>} />
          <Route path="/admin/risks" element={<ProtectedRoute allowedRoles={['admin']}><React.Suspense fallback={<>Loading...</>}><lazyComp.DelayRiskPage /></React.Suspense></ProtectedRoute>} />
          <Route path="/admin/driver-intelligence" element={<ProtectedRoute allowedRoles={['admin']}><React.Suspense fallback={<>Loading...</>}><lazyComp.DriverIntelligencePage /></React.Suspense></ProtectedRoute>} />

          {/* General Protected Routes (Accessible by Admin and Manager) */}
          <Route
            path="/live-tracking-map"
            element={
              <ProtectedRoute allowedRoles={['admin', 'manager', 'driver']}>
                <LiveTrackingMap />
              </ProtectedRoute>
            }
          />

          <Route
            path="/driver-tracker"
            element={
              <ProtectedRoute allowedRoles={['driver', 'admin']}>
                <DriverTracker />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
