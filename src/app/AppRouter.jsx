import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import LoginPage from "../pages/Login";
import ProtectedRoute from "../components/ui/ProtectedRoute"; // Impor ProtectedRoute
import { useAuth } from "../context/useAuth"; // Impor useAuth


export default function AppRouter() {
  const { user } = useAuth(); // Ambil data user dari context

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      {/* Rute Admin yang Dilindungi */}
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute user={user} role="admin">
            <MainLayout />
          </ProtectedRoute>
        }
      />

      {/* Rute Guru yang Dilindungi */}
      <Route
        path="/guru/*"
        element={
          <ProtectedRoute user={user} role="guru">
            <MainLayout />
          </ProtectedRoute>
        }
      />
      
      {/* Rute Ortu yang Dilindungi */}
      <Route
        path="/ortu/*"
        element={
          <ProtectedRoute user={user} role="ortu">
            <MainLayout />
          </ProtectedRoute>
        }
      />

      {/* Redirect default ke halaman yang sesuai atau ke login */}
      <Route 
        path="*" 
        element={<Navigate to={user ? `/${user.role}/dashboard` : "/login"} />} 
      />
    </Routes>
  );
}
