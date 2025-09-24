import { useState } from 'react';
import { assets } from '../assets/assets';
import Button from '../components/ui/Button';
import IconInputField from '../components/ui/IconInputField';
import { FaUser, FaLock } from 'react-icons/fa6';
import { useAuth } from '../context/useAuth';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth(); // Ambil fungsi login dari context

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Panggil fungsi login dari context dengan kredensial
    // Fungsi ini sekarang akan mengirim request ke API backend Anda
    login({ username, password }); 
  };

  return (
    <div 
      className="flex items-center justify-center min-h-screen p-4 bg-cover bg-center"
      style={{ backgroundImage: `url(${assets.bgschool})` }}
    >
      <div className="absolute inset-0 bg-slate-800/60 backdrop-blur-sm"></div>

      <div className="relative z-10 w-full max-w-md p-8 space-y-8 bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl">
        <div className="text-center">
          <img src={assets.logo} alt="Logo Sekolah" className="w-24 h-24 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-slate-800">Selamat Datang!</h1>
          <p className="text-slate-500 mt-2">Silakan masuk ke akun Anda</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <IconInputField
            icon={<FaUser className="text-slate-400" />}
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />

          <IconInputField
            icon={<FaLock className="text-slate-400" />}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />

          <Button type="submit" fullWidth size="lg" className="!text-base">
            Login
          </Button>
        </form>
            
        <p className="text-xs text-slate-500 text-center">
          © 2025 Sistem Monitoring Nilai Siswa - SDN 1 Langensari
        </p>
      </div>
    </div>
  );
}