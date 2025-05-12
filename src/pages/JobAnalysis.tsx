import { useState, useRef } from 'react';
import { AlertTriangle, CheckCircle, SendHorizonal } from 'lucide-react';
import { motion } from 'framer-motion';
import PageTransition from '@/components/PageTransition';
import Navbar from '@/components/Navbar';
import DragDropUploader from '../components/DragDropUploader'; // adjust path if needed
import { useToast } from '@/hooks/use-toast';
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

  // Simulate the analyzeJob function with mock predictions
  const analyzeJob = () => {
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

    // Simulate result after 2 seconds based on job description
    setTimeout(() => {
      // Simulate a fake job description result
      if (jobDescription.toLowerCase().includes('no experience')) {
        setResult({
          isFake: true,
          reasons: ['Requires no experience', 'Salary is too high for the role'],
          score: 75,
        });
      } else {
        setResult({
          isFake: false,
          reasons: [],
          score: 90,
        });
      }

      scrollToResult();
      setIsAnalyzing(false);
    }, 2000);
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
                <div className="md:w-2/5">
                  <h2 className="text-md font-semibold mb-2 text-gray-700 dark:text-gray-300">
                    Upload a Job Description File
                  </h2>
                  <DragDropUploader onExtractedText={(text: string) => setJobDescription(text)} />
                  <div className="mt-4 p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 text-sm text-blue-800 dark:text-blue-200">
                    <p className="mb-2 font-medium">👉 How to Scan a Job Description:</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Upload a <strong>.txt</strong> or <strong>.pdf</strong> file with the job description.</li>
                      <li>Or paste the job details in the textbox on the right.</li>
                      <li>Then click <strong>“Analyze Job”</strong> to detect potential scams.</li>
                    </ul>
                  </div>
                </div>

                <div className="mb-6 md:w-3/5">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Job Description
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
                  {result.isFake ? 'Potential Scam Detected!' : 'This Job Appears Le// filepath: c:\Users\GAGAN\Desktop\fake job detection\JOB-OR-JOKE\src\pages\JobAnalysis.tsximate'}
                </h2>
              </div>

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
                        <p>{reason}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No suspicious signs detected in this job description.</p>
                )}

                {result.score && (
                  <div className="mt-4">
                    <h4 className="text-sm font-semibold">Scam Probability:</h4>
                    <div className="text-lg font-semibold">{result.score}%</div>
                  </div>
                )}
              </div>
            </motion.div>
          )}

           {/* How the Detector Works Section */}
           <section className="mt-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="glass-card p-8 rounded-2xl"
            >
              <h2 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">
                🛡️ How the Detector Works
              </h2>

              <div className="grid md:grid-cols-3 gap-8 text-gray-700 dark:text-gray-300">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-full mb-4">
                    <svg className="w-8 h-8 text-blue-500 dark:text-blue-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M9 12l2 2l4 -4" />
                      <path d="M20 12a8 8 0 1 1 -16 0a8 8 0 0 1 16 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Keyword Highlighting</h3>
                  <p>We search for suspicious keywords often found in scams like “urgent,” “click here,” or “easy money.”</p>
                </div>

                <div className="flex flex-col items-center text-center">
                  <div className="bg-yellow-100 dark:bg-yellow-900 p-4 rounded-full mb-4">
                    <svg className="w-8 h-8 text-yellow-500 dark:text-yellow-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M12 9v2m0 4h.01M12 19a7 7 0 1 1 0-14a7 7 0 0 1 0 14z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">ML-Based Detection</h3>
                  <p>Using NLP and machine learning, we evaluate sentence patterns and word choices to determine credibility.</p>
                </div>

                <div className="flex flex-col items-center text-center">
                  <div className="bg-green-100 dark:bg-green-900 p-4 rounded-full mb-4">
                    <svg className="w-8 h-8 text-green-500 dark:text-green-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Confidence Scoring</h3>
                  <p>Each result comes with a confidence score to indicate how likely a job is a scam based on the model’s prediction.</p>
                </div>
              </div>
            </motion.div>
          </section>
        </div>
      </section>
    </PageTransition>
  );
}
