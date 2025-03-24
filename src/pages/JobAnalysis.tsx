import { useState } from 'react';
import { AlertTriangle, CheckCircle, SendHorizonal } from "lucide-react";
import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/Navbar";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import Lottie from "lottie-react";
import sampleAnimation from "./Animation - 1742720713095.json";

export default function JobAnalysis() {
  const [jobDescription, setJobDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<null | { isFake: boolean; reasons: string[] }>(null);
  const { toast } = useToast();

  const analyzeJob = async () => {
    if (!jobDescription.trim()) {
      toast({
        title: "Error",
        description: "Please enter a job description to analyze.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    setResult(null);

    try {
      // Send the job description to Flask API
      const response = await axios.post("http://127.0.0.1:5000/predict", {
        description: jobDescription,
      });

      // Parse the API response
      const data = response.data;
      setResult({
        isFake: data.isFake,
        reasons: data.reasons || [],
      });

    } catch (error) {
      console.error('Error analyzing job:', error);
      toast({
        title: "Analysis failed",
        description: "There was an error analyzing the job description. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <PageTransition transition="slide-left">
      <Navbar />
      
      <div className="pt-24 pb-8 md:pt-32 md:pb-16 px-6">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white flex items-center justify-center gap-4"
            >
              Job Scam Detector
              <Lottie animationData={sampleAnimation} loop={true} className="w-16 md:w-24" />
            </motion.h1>
          </div>
        </div>
      </div>
      
      <section className="py-8 px-6">
        <div className="container mx-auto max-w-3xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-card rounded-2xl p-8 relative overflow-hidden"
          >
            <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-gradient-to-br from-primary/20 to-blue-400/20 blur-xl"></div>
            
            <div className="relative z-10">
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Job Description
                </label>
                <textarea 
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-primary min-h-[200px] transition-all duration-200"
                  placeholder="Paste the job description here..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  rows={8}
                ></textarea>
              </div>
              
              <div className="flex justify-center">
                <button 
                  onClick={analyzeJob}
                  disabled={isAnalyzing}
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isAnalyzing ? (
                    <>Analyzing...<motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="ml-2 h-5 w-5 border-2 border-white border-t-transparent rounded-full"
                    /></>
                  ) : (
                    <>Analyze Job <SendHorizonal className="ml-2 h-5 w-5" /></>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
          
          {result && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={`mt-8 glass-card rounded-2xl p-8 ${
                result.isFake 
                  ? 'border-2 border-red-400 dark:border-red-600' 
                  : 'border-2 border-green-400 dark:border-green-600'
              }`}
            >
              <div className="flex items-center mb-4">
                {result.isFake ? (
                  <AlertTriangle className="h-8 w-8 text-red-500 mr-3" />
                ) : (
                  <CheckCircle className="h-8 w-8 text-green-500 mr-3" />
                )}
                <h2 className="text-2xl font-bold">
                  {result.isFake 
                    ? 'Potential Scam Detected!' 
                    : 'This job appears legitimate'}
                </h2>
              </div>
              
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Analysis Results:</h3>
                <ul className="space-y-2">
                  {result.reasons.map((reason, index) => (
                    <li key={index} className="flex items-start">
                      <span className={`inline-block w-2 h-2 mt-2 mr-2 rounded-full ${
                        result.isFake ? 'bg-red-500' : 'bg-green-500'
                      }`}></span>
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {result.isFake && (
                <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-100 dark:border-red-800">
                  <p className="text-red-800 dark:text-red-200 font-medium">
                    This job posting shows multiple warning signs of a potential scam. Be cautious and consider avoiding this opportunity.
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </section>
    </PageTransition>
  );
}
