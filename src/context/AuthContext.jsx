import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // <-- Import axios
import { AuthContext } from './AuthContext';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (savedUser && token) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // DIUBAH: Fungsi login untuk memanggil API
  const login = async (credentials) => {
    try {
      // Panggil API login di backend
      const response = await axios.post('http://localhost:5000/api/auth/login', credentials);
      
      const { token, user: userData } = response.data;

      // Simpan token dan data user
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', token);
      setUser(userData);
      
      // Navigasi berdasarkan role
      switch (userData.role) {
        case 'admin':
          navigate('/admin/dashboard');
          break;
        case 'guru':
          navigate('/guru/dashboard');
          break;
        case 'ortu':
          navigate('/ortu/dashboard');
          break;
        default:
          navigate('/');
      }
    } catch (error) {
      // Tangani error login
      console.error("Login gagal:", error.response?.data?.message || error.message);
      alert(error.response?.data?.message || 'Terjadi kesalahan saat login.');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token'); // <-- Jangan lupa hapus token
    navigate('/login');
  };

  const value = {
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};