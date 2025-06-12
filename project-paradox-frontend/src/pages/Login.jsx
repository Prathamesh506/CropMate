import React, { useState } from 'react';
import axiosInstance from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await axiosInstance.post('/api/token/', { username, password });
      localStorage.setItem('access_token', res.data.access);
      localStorage.setItem('refresh_token', res.data.refresh);
      axiosInstance.defaults.headers['Authorization'] = `Bearer ${res.data.access}`;
      setUsername('');
      setPassword('');
      navigate('/home');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.detail || 'Login failed! Check credentials.');
    } finally {
      setLoading(false);
    }
  };
  const handleRegisterRedirect = () => {
    navigate('/register');
  };
  

  return (
    <div 
  className="min-h-screen flex items-center justify-center bg-cover bg-center" 
  style={{ backgroundImage: "url('/bg-login.jpg')" }}
>

      <form onSubmit={handleLogin} className="bg-white p-10 rounded-3xl shadow-2xl w-[90%] max-w-md space-y-6">
        <h2 className="text-3xl font-extrabold text-center text-green-600">
          Login to <span className="text-green-800">Paradox</span>
        </h2>

        <div className="flex flex-col space-y-4">
          {/* Username Input */}
          <input 
            type="text" 
            placeholder="Username" 
            required 
            value={username}
            onChange={(e) => setUsername(e.target.value)} 
            className="border-2 border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          {/* Password Input with Eye Toggle */}
          <div className="relative">
            <input 
              type={showPassword ? 'text' : 'password'} 
              placeholder="Password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
              className="border-2 border-gray-300 rounded-full px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-green-400 pr-12"
            />
            <div 
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-1/20 top-1/2 transform -translate-y-1/2 text-gray-600 cursor-pointer"
            >
              {showPassword ? <FaEyeSlash size={20}/> : <FaEye size={20}/>}
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-600 text-center">{error}</p>}

        {/* Submit Button */}
        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-full transition duration-300"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <div className="text-center"><br />
  <p className="text-gray-600">Don't have an account?</p>
  <button
    type="button"
    onClick={handleRegisterRedirect}
    className="mt-2 text-green-600 hover:underline font-semibold"
  >
    Register
  </button>
</div>

      </form>
    </div>
    
  );
}

export default Login;
