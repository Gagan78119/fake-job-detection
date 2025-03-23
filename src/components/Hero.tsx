import { ArrowRight, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import animationData from "./Animation - 1742719199461.json"; // Ensure path is correct

export default function Hero() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-gray-900 transition-colors duration-300">
      
      {/* Adaptive Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-900 dark:to-gray-800 z-0 transition-colors duration-300"></div>

      {/* AI Cybersecurity Grid & Particles Background */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        {/* Cybersecurity Grid */}
        <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 gap-1 opacity-10">
          {[...Array(144)].map((_, i) => (
            <motion.div
              key={i}
              className="w-1 h-1 bg-blue-400 dark:bg-green-400 rounded-full transition-colors duration-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: Math.random() * 2 }}
            />
          ))}
        </div>

        {/* Floating AI Data Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-blue-500 dark:bg-green-500 opacity-70 w-1.5 h-1.5 rounded-full transition-colors duration-300"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: [0, 1, 0], y: [-20, 20, -20] }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </motion.div>

      <div className="container mx-auto px-6 relative z-10 py-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">

          {/* Right Section - Animated Lottie Job Detective Character */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex justify-center items-center w-full max-w-xs md:max-w-sm"
          >
            <Lottie animationData={animationData} loop autoplay className="w-full h-auto" />
          </motion.div>

          {/* Left Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1 max-w-2xl"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 border border-blue-300 dark:border-blue-800 mb-6 transition-colors duration-300"
            >
              <ShieldCheck className="w-4 h-4 mr-2 text-blue-700 dark:text-primary" />
              <span className="text-sm font-medium text-blue-700 dark:text-primary">AI-Powered Job Scam Detection</span>
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-white leading-tight transition-colors duration-300">
              Secure Your Career from  
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-green-400 dark:from-primary dark:to-green-300 ml-2 transition-colors duration-300">
                Fake Jobs
              </span>
            </h1>

            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed transition-colors duration-300">
              Our AI-driven system monitors and protects against job fraud, ensuring your job search remains safe and secure.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/job-analysis" className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-blue-500 dark:bg-primary text-white font-medium hover:bg-blue-600 dark:hover:bg-primary/90 transition-colors">
                Get Protected Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link to="/about" className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                Learn More
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
