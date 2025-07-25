
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Github, Calendar, Tag, Star } from "lucide-react";
import GlassCard from "./GlassCard";

interface Project {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  startDate: string;
  endDate: string;
  technologies: string[];
  category: string;
  image: string;
  liveUrl?: string;
  sourceUrl?: string;
  features: string[];
  stats: { label: string; value: string }[];
}

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal = ({ project, isOpen, onClose }: ProjectModalProps) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            className="max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <GlassCard hover={false} className="relative">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors z-10"
              >
                <X size={24} className="text-white" />
              </button>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Project Image */}
                <div className="space-y-6">
                  <div className="relative rounded-xl overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-64 md:h-80 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>

                  {/* Project Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    {project.stats.map((stat, index) => (
                      <div key={index} className="text-center">
                        <div className="text-2xl font-bold text-purple-400 mb-1">
                          {stat.value}
                        </div>
                        <div className="text-sm text-gray-400">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Project Details */}
                <div className="space-y-6">
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2">{project.name}</h2>
                    <div className="flex items-center space-x-2 text-gray-400 mb-4">
                      <Calendar size={16} />
                      <span>{project.startDate} - {project.endDate}</span>
                    </div>
                    <p className="text-gray-300 leading-relaxed">{project.description}</p>
                  </div>

                  {/* Technologies */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                      <Tag size={18} className="mr-2" />
                      Technologies
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm font-medium border border-purple-500/30"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Features */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                      <Star size={18} className="mr-2" />
                      Key Features
                    </h3>
                    <ul className="space-y-2">
                      {project.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-gray-300">
                          <div className="w-2 h-2 bg-purple-400 rounded-full mr-3" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-4 pt-4">
                    {project.liveUrl && (
                      <motion.a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 flex items-center justify-center space-x-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-green-500/30"
                      >
                        <ExternalLink size={20} />
                        <span>Live Demo</span>
                      </motion.a>
                    )}
                    
                    {project.sourceUrl && (
                      <motion.a
                        href={project.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 flex items-center justify-center space-x-3 bg-white/10 text-white py-3 px-6 rounded-lg font-semibold border border-white/20 transition-all duration-300 hover:bg-white/20"
                      >
                        <Github size={20} />
                        <span>Source Code</span>
                      </motion.a>
                    )}
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
