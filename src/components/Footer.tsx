
import {Heart }from "lucide-react";
import Lottie from "lottie-react"; // Correct Lottie import
import goodbye from "./Animation - 1742345466109.json"; // Replace with your desired animation file

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="mt-8 text-center">
          <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
            Protect Your Job Search Today
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10">
            Join thousands of job seekers who trust Job or Joke to keep their career search safe from scammers.
          </p>
          
        </div>
        </div>
      
       {/* Right Section - Animated Anime Character */}
       <div className="flex justify-center items-center animate-fadeInRight" style={{ animationDelay: "0.4s" }}>
            <Lottie animationData={goodbye} loop={true} className="w-half max-w-xs md:max-w-sm" />
            <p className="text-gray-500 dark:text-gray-400 text-lg flex items-center justify-center">
            Made with <Heart className="h-10 w-10 text-blue-500 mx-3" /> for job seekers around ....
          </p>
          </div>
    </footer>
  );
}
