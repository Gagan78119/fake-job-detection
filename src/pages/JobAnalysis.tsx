import { useState, useRef } from 'react';
import { AlertTriangle, CheckCircle, SendHorizonal } from 'lucide-react';
import { motion } from 'framer-motion';
import PageTransition from '@/components/PageTransition';
import Navbar from '@/components/Navbar';
import DragDropUploader from '../components/DragDropUploader'; // adjust path if needed
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';
import Lottie from 'lottie-react';
import detective from './Animation - 1742720713095.json';
import { useDropzone } from 'react-dropzone';
import * as pdfjsLib from 'pdfjs-dist';

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.js`;

export default function JobAnalysis() {
  const [jobDescription, setJobDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<null | { isFake: boolean; reasons: string[]; score?: number }>(null);
  const { toast } = useToast();
  const resultRef = useRef<HTMLDivElement>(null);

  const keywords = ['payment', 'urgent', 'wire transfer', 'no experience', 'personal info', 'limited time', 'click here', 'easy money'];

  const highlightKeywords = (text: string) => {
    let highlighted = text;
    keywords.forEach((word) => {
      const regex = new RegExp(`\\b(${word})\\b`, 'gi');
      highlighted = highlighted.replace(regex, `<mark class="bg-yellow-200 dark:bg-yellow-700 rounded px-1">${word}</mark>`);
    });
    return highlighted;
  };

  const scrollToResult = () => {
    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  const analyzeJob = async () => {
    if (!jobDescription.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter a job description to analyze.',
        variant: 'destructive',
      });
      return;
    }

    setIsAnalyzing(true);
    setResult(null);

    try {
      const response = await axios.post('http://127.0.0.1:5000/predict', {
        description: jobDescription,
      });

      const data = response.data;

      setResult({
        isFake: data.isFake,
        reasons: data.reasons || [],
        score: data.score,
      });

      scrollToResult();
    } catch (error) {
      console.error('Error analyzing job:', error);
      toast({
        title: 'Analysis failed',
        description: 'There was an error analyzing the job description. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handlePDF = async (file: File) => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      let text = '';
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const strings = content.items.map((item: any) => item.str).join(' ');
        text += strings + '\n';
      }
      setJobDescription(text);
      toast({ title: 'Success', description: 'PDF content added!', variant: 'default' });
    } catch {
      toast({ title: 'PDF Error', description: 'Failed to read PDF file.', variant: 'destructive' });
    }
  };

  const handleText = async (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const text = reader.result as string;
      setJobDescription(text);
      toast({ title: 'Success', description: 'Text file uploaded!', variant: 'default' });
    };
    reader.readAsText(file);
  };

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    const isPDF = file.type === 'application/pdf';
    const isText = file.type === 'text/plain';

    if (isPDF) handlePDF(file);
    else if (isText) handleText(file);
    else {
      toast({ title: 'Unsupported File', description: 'Upload .txt or .pdf only.', variant: 'destructive' });
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <PageTransition transition="slide-left">
      <Navbar />

      <div className="pt-24 pb-8 md:pt-32 md:pb-16 px-6">
      <div className="container mx-auto text-center max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white flex items-center justify-center gap-4"
          >
            Job Scam Detector
            <Lottie animationData={detective} loop className="w-16 md:w-24" />
          </motion.h1>
        </div>
      </div>

      <section className="py-8 px-6">
      <div className="container mx-auto max-w-6xl">
      <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-card rounded-2xl p-8 relative overflow-hidden"
          >
            <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-gradient-to-br from-primary/20 to-blue-400/20 blur-xl"></div>

            <div className="relative z-10">
            <div className="mb-6 flex flex-col md:flex-row gap-6">
  {/* Drag & Drop Section */}
<div className="md:w-2/5">
  <h2 className="text-md font-semibold mb-2 text-gray-700 dark:text-gray-300">
    Upload a Job Description File
  </h2>
  
  <DragDropUploader onExtractedText={(text: string) => setJobDescription(text)} />

  {/* Instruction block */}
  <div className="mt-4 p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 text-sm text-blue-800 dark:text-blue-200">
    <p className="mb-2 font-medium">👉 How to Scan a Job Description:</p>
    <ul className="list-disc list-inside space-y-1">
      <li>Upload a <strong>.txt</strong> or <strong>.pdf</strong> file with the job description.</li>
      <li>Or paste the job details in the textbox on the right.</li>
      <li>Then click <strong>“Analyze Job”</strong> to detect potential scams.</li>
    </ul>
  </div>
</div>


  {/* Textarea Section */}
  <div className="mb-6 md:w-3/5">
  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
   JobDescription
  </label>
  <textarea
  className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-primary min-h-[300px] md:min-w-[100%] transition-all duration-200"
  placeholder="Paste the job description here..."
    value={jobDescription}
    onChange={(e) => setJobDescription(e.target.value)}
  />
</div>

</div>


              <div className="flex justify-center">
                <button
                  onClick={analyzeJob}
                  disabled={isAnalyzing}
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isAnalyzing ? (
                    <>
                      Analyzing...
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="ml-2 h-5 w-5 border-2 border-white border-t-transparent rounded-full"
                      />
                    </>
                  ) : (
                    <>
                      Analyze Job <SendHorizonal className="ml-2 h-5 w-5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>

          {result && (
            <motion.div
              ref={resultRef}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className={`mt-8 glass-card rounded-2xl p-8 ${
                result.isFake ? 'border-2 border-red-400 dark:border-red-600' : 'border-2 border-green-400 dark:border-green-600'
              }`}
            >
              <div className="flex items-center mb-4">
                {result.isFake ? (
                  <AlertTriangle className="h-8 w-8 text-red-500 mr-3" />
                ) : (
                  <CheckCircle className="h-8 w-8 text-green-500 mr-3" />
                )}
                <h2 className="text-2xl font-bold">
                  {result.isFake ? 'Potential Scam Detected!' : 'This Job Appears Legitimate'}
                </h2>
              </div>

              {result.score !== undefined && (
                <p className="text-sm mb-4 text-gray-600 dark:text-gray-400">
                  🔍 Confidence Score: <span className="font-medium">{(result.score * 100).toFixed(1)}%</span>
                </p>
              )}

              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">
                  {result.reasons.length > 0 ? '🧠 Analysis Insights:' : 'No suspicious signs detected.'}
                </h3>

                {result.reasons.length > 0 ? (
                  <ul className="space-y-3">
                    {result.reasons.map((reason, index) => (
                      <li key={index} className="flex items-start text-base">
                        <span
                          className={`inline-block w-2 h-2 mt-2 mr-2 rounded-full ${
                            result.isFake ? 'bg-red-500' : 'bg-green-500'
                          }`}
                        ></span>
                        <span dangerouslySetInnerHTML={{ __html: highlightKeywords(reason) }} />
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-700 dark:text-gray-300">
                    This job description does not contain any obvious scam indicators.
                  </p>
                )}
              </div>

              {result.isFake && (
                <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-100 dark:border-red-800">
                  <p className="text-red-800 dark:text-red-200 font-medium">
                    🚨 This job posting shows multiple red flags. We recommend avoiding this opportunity.
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