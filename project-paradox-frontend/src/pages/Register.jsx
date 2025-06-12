import React, { useState } from 'react';
import axiosInstance from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';


function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axiosInstance.post('/api/register/', {
        username,
        email,
        password,
      });
      alert('🎉 Registration successful! Please login now.');
      navigate('/login');
    } catch (err) {
      alert('⚠️ Registration failed. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div 
  className="min-h-screen flex items-center justify-center bg-cover bg-center" 
  style={{ backgroundImage: "url('/bg-login.jpg')" }}
>
      <form onSubmit={handleRegister} className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md space-y-8">
        <h2 className="text-4xl font-extrabold text-center text-blue-600 drop-shadow-sm">
          Create <span className="text-blue-800">Account</span>
        </h2>

        <div className="flex flex-col space-y-5">
        <input
  type="text"
  placeholder="Username"
  required
  value={username}
  onChange={(e) => setUsername(e.target.value)}
  className="h-14 appearance-none border-2 border-gray-300 rounded-full px-5 text-base focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
/>

<input
  type="email"
  placeholder="Email"
  required
  autoComplete="off"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  className="appearance-none h-14 w-full px-5 py-4 text-base leading-none border-2 border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
/>

<div className="relative">
  <input
    type={showPassword ? "text" : "password"}
    placeholder="Password"
    required
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    className="appearance-none h-14 w-full px-5 pr-12 py-4 text-base leading-none border-2 border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
  />
  <div
    className="absolute right-1/20 top-1/2 transform -translate-y-1/2 text-gray-600 cursor-pointer"
    onClick={() => setShowPassword(!showPassword)}
  >
    {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
  </div>
</div>



        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 mt-6 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-full font-semibold text-lg shadow-md transform transition-transform duration-300 ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:scale-105"
          }`}
        >
          {loading ? "Registering..." : "Register"}
        </button>
        <div className="text-center">
          <br />
  <p className="text-gray-600">Already have an account?</p>
  <button
    type="button"
    onClick={() => navigate('/login')}
    className="mt-2 text-blue-600 hover:underline font-semibold"
  >
    Login
  </button>
</div>

      </form>
    </div>
  );
}

export default Register;
