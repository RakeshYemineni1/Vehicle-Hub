import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { GlobalLayout } from '@/components/layout/GlobalLayout';
import Dashboard from '@/pages/Dashboard';
import Login from '@/pages/Login';
import Fleet from '@/pages/Fleet';
import Trips from '@/pages/Trips';
import Maintenance from '@/pages/Maintenance';
import Analytics from '@/pages/Analytics';
import Drivers from '@/pages/Drivers';
import Incidents from '@/pages/Incidents';
import Settings from '@/pages/Settings';
import { FleetProvider } from '@/contexts/FleetContext';
import { Toaster } from 'sonner';


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <FleetProvider>
          <Routes>
            <Route path="/login" element={<Login />} />

            <Route path="/" element={
              <ProtectedRoute>
                <GlobalLayout />
              </ProtectedRoute>
            }>
              <Route index element={<Dashboard />} />

              <Route path="fleet" element={
                <ProtectedRoute allowedRoles={['Manager', 'Dispatcher']}>
                  <Fleet />
                </ProtectedRoute>
              } />

              <Route path="trips" element={
                <ProtectedRoute allowedRoles={['Manager', 'Dispatcher', 'Financial Analyst']}>
                  <Trips />
                </ProtectedRoute>
              } />

              <Route path="drivers" element={
                <ProtectedRoute allowedRoles={['Manager', 'Safety Officer']}>
                  <Drivers />
                </ProtectedRoute>
              } />

              <Route path="maintenance" element={
                <ProtectedRoute allowedRoles={['Manager', 'Dispatcher', 'Safety Officer']}>
                  <Maintenance />
                </ProtectedRoute>
              } />

              <Route path="analytics" element={
                <ProtectedRoute allowedRoles={['Manager', 'Financial Analyst', 'Dispatcher']}>
                  <Analytics />
                </ProtectedRoute>
              } />

              <Route path="incidents" element={
                <ProtectedRoute allowedRoles={['Manager', 'Safety Officer']}>
                  <Incidents />
                </ProtectedRoute>
              } />

              <Route path="settings" element={
                <ProtectedRoute allowedRoles={['Manager', 'Safety Officer', 'Financial Analyst']}>
                  <Settings />
                </ProtectedRoute>
              } />
            </Route>

            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </FleetProvider>
      </AuthProvider>
      <Toaster position="top-right" richColors />
    </BrowserRouter>
  );
}

export default App;
