import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaLeaf, FaHandsHelping, FaBookOpen, FaVirus } from "react-icons/fa";
import './Navbar.css';
import Info from './Info';
import Navbar from "./Navbar";

function Home() {
  const navigate = useNavigate();

  const features = [
    {
      title: "Crop Recommendation",
      description: "Get the best crop suggestions based on soil and weather.",
      path: "/recommend-crop",
      icon: <FaLeaf size={50} />,
      color: "from-green-400 to-green-600",
    },
    {
      title: "Guide to Grow Crops",
      description: "Step-by-step guidance to cultivate various crops.",
      path: "/cropguide",
      icon: <FaBookOpen size={50} />,
      color: "from-yellow-400 to-yellow-600",
    },
    {
      title: "Disease Detection",
      description: "Detect plant diseases early and save your crops.",
      url: "https://c190-2409-40f2-47-a457-4d02-1943-553-20e5.ngrok-free.app/", 
      icon: <FaVirus size={50} />,
      color: "from-red-400 to-red-600",
    },
    {
      title: "Our Services",
      description: "Explore our wide range of agricultural services.",
      path: "/services",
      icon: <FaHandsHelping size={50} />,
      color: "from-blue-400 to-blue-600",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 flex flex-col">

        {/* Hero Section */}
        <section className="relative w-full h-[90vh] flex items-center justify-center">
          <img
            src="https://wallpaperaccess.com/full/4301994.jpg"
            alt="Farm Background"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-sm"></div>
          <div className="relative z-10 bg-black/60 backdrop-blur-xl rounded-3xl p-10 md:p-16 text-center mx-4 shadow-2xl">
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6 text-white drop-shadow-2xl">
              Welcome to Project Paradox
            </h1>
            <p className="text-xl md:text-2xl font-medium mb-8 text-white drop-shadow-xl">
              Revolutionizing Smart Farming Solutions
            </p>
            <button
              onClick={() => {
                document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 text-lg"
            >
              Explore Features
            </button>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="features-grid">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="feature-card"
              onClick={() => {
                if (feature.path) {
                  navigate(feature.path);
                } else if (feature.url) {
                  window.open(feature.url, "_blank");
                }
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className={`text-white p-4 rounded-full mb-4 bg-gradient-to-r ${feature.color}`}>
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold text-green-700 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-center">{feature.description}</p>
            </motion.div>
          ))}
        </section>
      </div>
      <Info />
    </>
  );
}

export default Home;
