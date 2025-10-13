import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Report from './pages/Report';
import Browse from './pages/Browse';
import Notifications from './pages/Notifications';
import Profile from './pages/Profile';
import ItemDetails from './pages/ItemDetails';
import Login from './pages/Login';
import PrivacySettings from './pages/PrivacySettings';
import EditProfile from './pages/EditProfile';
import HelpSupport from './pages/HelpSupport';
import NotificationPreferences from './pages/NotificationPreferences';
import UserGuide from './pages/UserGuide';
import TermsOfService from './pages/Terms0fService';
import PrivacyPolicy from './pages/PrivacyPolicy';
import './index.css';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Login Route */}
        <Route path="/login" element={<Login />} />
        
        {/* Protected Routes with MainLayout */}
        <Route path="/" element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
          <Route index element={<Home />} />
          <Route path="report" element={<Report />} />
          <Route path="browse" element={<Browse />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        
        {/* Standalone protected routes without MainLayout */}
        <Route path="/privacy-settings" element={<ProtectedRoute><PrivacySettings /></ProtectedRoute>} />
        <Route path="/edit-profile" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
        <Route path="/notification-preferences" element={<ProtectedRoute><NotificationPreferences /></ProtectedRoute>} />
        <Route path="/help-support" element={<ProtectedRoute><HelpSupport /></ProtectedRoute>} />
        <Route path="/user-guide" element={<ProtectedRoute><UserGuide /></ProtectedRoute>} />
        <Route path="/terms-of-service" element={<ProtectedRoute><TermsOfService /></ProtectedRoute>} />
        <Route path="/privacy-policy" element={<ProtectedRoute><PrivacyPolicy /></ProtectedRoute>} />
        <Route path="/item/:id" element={<ProtectedRoute><ItemDetails /></ProtectedRoute>} />
        
        {/* Catch all - redirect to login or home based on auth status */}
        <Route
          path="*"
          element={
            localStorage.getItem('isLoggedIn') === 'true'
              ? <Navigate to="/" replace />
              : <Navigate to="/login" replace />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;