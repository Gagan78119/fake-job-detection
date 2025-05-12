import { AlertTriangle, BarChart, Shield, Users } from "lucide-react";
import { Link } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import FeatureCard from "@/components/FeatureCard";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function Index() {
  return (
    <PageTransition transition="fade">
      <Navbar />
      <Hero />
      
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Our Advanced Job Scam Detection Features
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              We use cutting-edge technology to protect job seekers from fraudulent listings.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard 
              title="AI Pattern Recognition"
              description="Our algorithms analyze job listings to detect patterns common in fraudulent postings, flagging suspicious content immediately."
              icon={BarChart}
              delay={0.1}
            />
            <FeatureCard 
              title="Website Verification"
              description="We verify employer websites and contact information against our database of known le// filepath: c:\Users\GAGAN\Desktop\fake job detection\JOB-OR-JOKE\src\pages\Index.tsximate businesses."
              icon={Shield}
              delay={0.2}
            />
            <FeatureCard 
              title="Community Reports"
              description="Our community of users report suspicious listings, enhancing our ability to detect new scam techniques."
              icon={Users}
              delay={0.3}
            />
            <FeatureCard 
              title="Scam Alerts"
              description="Receive instant notifications about emerging job scams in your industry or location."
              icon={AlertTriangle}
              delay={0.4}
            />
            <FeatureCard 
              title="Salary Analysis"
              description="Compare offered salaries against market rates to identify suspiciously high compensation offers."
              icon={BarChart}
              delay={0.5}
            />
            <FeatureCard 
              title="Language Pattern Analysis"
              description="Our system identifies linguistic red flags common in scam job listings, like poor grammar or excessive promises."
              icon={Shield}
              delay={0.6}
            />
          </div>
        </div>
      </section>

      <Footer />
    </PageTransition>
  );
}
