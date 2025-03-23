import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import sampleAnimation from "./Animation - 1742749560990.json"; // Replace with actual Lottie JSON

import { BarChart3, Lock, Shield, Zap } from "lucide-react";
import {
  FaPython, FaJs, FaHtml5, FaCss3Alt, FaJava, FaDatabase, FaCloud, FaGitAlt, FaLinux, FaWindows, FaAws, FaDocker, FaReact
} from 'react-icons/fa';
import { 
  SiTypescript, SiC, SiSpringboot, SiDjango, SiFlask, SiExpress, SiMongodb, SiPostgresql, SiMysql, SiGooglecloud, SiKubernetes, SiGraphql 
} from 'react-icons/si';

export default function About() {
  return (
    <PageTransition transition="slide-left">
      <Navbar />

      {/* About Section */}
      <div className="pt-24 pb-16 md:pt-32 md:pb-24 px-6">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white"
            >
              About Fake Job Detection
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-gray-600 dark:text-gray-300"
            >
              We are a team of six, dedicated to building an advanced Fake Job Detection system as part of our final year project. Using Natural Language Processing (NLP) and Machine Learning (ML), we aim to detect fraudulent job postings and protect job seekers from scams.
            </motion.p>
          </div>
        </div>
      </div>

      {/* Our Story Section with Lottie Animation */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Side - Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                Our Story
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
                The journey began with a simple idea: to protect job seekers from scams. 
                As fraudulent job postings increased, we took the initiative to develop an 
                AI-powered Fake Job Detection System that ensures safety and transparency.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Today, our system uses Machine Learning, NLP, and real-time analysis to 
                detect and flag suspicious job listings, protecting thousands of users from 
                employment fraud.
              </p>
            </motion.div>

            {/* Right Side - Lottie Animation */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Lottie animationData={sampleAnimation} loop={true} className="w-full max-w-md mx-auto" />
            </motion.div>

          </div>
        </div>
      </section>

      {/* Our Technology Section with Tech Stack Icons */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Our Technology
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Our Fake Job Detection System is built using advanced Machine Learning, NLP, and Web Technologies to ensure accurate scam detection.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            
            {/* Machine Learning & AI */}
            <div className="flex flex-col items-center text-center">
              <FaPython className="text-blue-500 text-5xl mb-4" />
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">Machine Learning & AI</h3>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Our ML models analyze job listings using Natural Language Processing (NLP) to detect fraudulent patterns and suspicious behavior.
              </p>
            </div>

            {/* Backend Development */}
            <div className="flex flex-col items-center text-center">
              <SiFlask className="text-gray-700 dark:text-gray-300 text-5xl mb-4" />
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">Backend Development</h3>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                We use Flask (Python) & Express (Node.js) to develop a scalable and efficient backend API that powers our fraud detection system.
              </p>
            </div>

            {/* Frontend Development */}
            <div className="flex flex-col items-center text-center">
              <FaReact className="text-blue-500 text-5xl mb-4" />
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">Frontend Development</h3>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                The user interface is built with React & TypeScript, providing a modern and responsive experience for job seekers.
              </p>
            </div>

            {/* Database & Storage */}
            <div className="flex flex-col items-center text-center">
              <SiMongodb className="text-green-500 text-5xl mb-4" />
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">Database & Storage</h3>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                We use MongoDB for storing job postings and analytics, ensuring fast and secure data retrieval.
              </p>
            </div>

            {/* Cloud & Deployment */}
            <div className="flex flex-col items-center text-center">
              <SiGooglecloud className="text-yellow-500 text-5xl mb-4" />
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">Cloud & Deployment</h3>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Our system is deployed using Google Cloud, AWS, and Vercel, ensuring high availability and scalability.
              </p>
            </div>

            {/* Security & Authentication */}
            <div className="flex flex-col items-center text-center">
              <Lock className="text-red-500 text-5xl mb-4" />
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">Security & Authentication</h3>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                We implement JWT-based authentication and encryption to protect user data and prevent unauthorized access.
              </p>
            </div>

          </div>
        </div>
      </section>
    </PageTransition>
  );
}
