import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-yellow-100 via-green-100 to-blue-100 overflow-hidden font-serif">
  {/* Video Background */}
<video
  autoPlay
  loop
  muted
  playsInline
  className="absolute top-0 left-0 w-full h-full object-cover z-0"
>
  <source src="/background.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>


      {/* Animated Background Elements */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 2 }}
        className="absolute w-[500px] h-[500px] bg-green-200 rounded-full blur-3xl top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2"
      />
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 2.5 }}
        className="absolute w-[400px] h-[400px] bg-yellow-300 rounded-full blur-2xl bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2"
      />

      {/* Main Content */}
      <motion.div 
  initial={{ scale: 0.8, opacity: 0 }}
  animate={{ scale: 1, opacity: 1 }}
  transition={{ duration: 1 }}
  className="z-10 flex flex-col items-center text-center px-4 mt-[-200px]"
>

        <h1 className="text-5xl md:text-6xl font-extrabold text-green-800 mb-6 drop-shadow-5xl">
          Welcome to <span className="text-yellow-700">Project Paradox</span> 🌾
        </h1>
        <p className="text-lg md:text-xl text-green-700 mb-8 max-w-2xl leading-relaxed drop-shadow-md">
          Empowering farmers with knowledge, growth, and innovation 🚜✨
        </p>

        {/* Buttons */}
        <div className="flex flex-row gap-8 mt-12">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/login")}
            className="w-44 h-14 bg-green-700 text-white text-lg font-semibold border-2 border-green-700 hover:bg-transparent hover:text-green-700 transition-all duration-300 uppercase tracking-wider shadow-md hover:shadow-lg"
          >
            Login
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/register")}
            className="w-44 h-14 bg-yellow-400 text-green-900 text-lg font-semibold border-2 border-yellow-400 hover:bg-transparent hover:text-yellow-600 transition-all duration-300 uppercase tracking-wider shadow-md hover:shadow-lg"
          >
            Register
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}

export default LandingPage;
