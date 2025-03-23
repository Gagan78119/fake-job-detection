
import { motion } from "framer-motion";
interface TeamCardProps {
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  delay?: number;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    website?: string;
  };
}

export default function TeamCard({ 
  name, 
  role, 
  bio, 
  imageUrl, 
  delay = 0,
}: TeamCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="glass-card card-hover rounded-2xl overflow-hidden"
    >
      <div className="relative group">
        <div className="w-full h-60 overflow-hidden">
          <img 
            src={imageUrl} 
            alt={name} 
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
          
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-1 text-gray-900 dark:text-white">{name}</h3>
        <p className="text-primary font-medium mb-3">{role}</p>
        <p className="text-gray-600 dark:text-gray-300 text-sm">{bio}</p>
      </div>
    </motion.div>
  );
}
