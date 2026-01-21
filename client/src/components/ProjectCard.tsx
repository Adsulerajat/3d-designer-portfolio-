import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowRight, Box, Play, Pause } from "lucide-react";
import type { Project } from "@shared/schema";
import { Link } from "wouter";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-rotate images
  useEffect(() => {
    if (!project.images || project.images.length <= 1) return;
    
    // Only auto-rotate if user is NOT hovering (or maybe if they are? requirements said auto-rotate every 5s)
    // Let's stick to simple auto-rotate always, maybe pause on hover? 
    // Requirement: "auto-rotate every 5s"
    const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [project.images]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative bg-muted/40 rounded-xl overflow-hidden border border-white/5 hover:border-primary/50 transition-colors duration-500"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Slider Area */}
      <div className="relative aspect-[16/9] overflow-hidden bg-black/50">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImageIndex}
            src={project.images[currentImageIndex]}
            alt={project.title}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-90" />

        {/* Image Indicators */}
        {project.images.length > 1 && (
          <div className="absolute bottom-4 left-4 right-4 flex justify-center gap-2 z-10">
            {project.images.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentImageIndex(idx);
                }}
                className={`h-1 rounded-full transition-all duration-300 ${
                  idx === currentImageIndex ? "w-8 bg-primary shadow-[0_0_10px_rgba(0,243,255,0.5)]" : "w-2 bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="relative p-6 -mt-12 z-10">
        <div className="mb-4">
          <span className="inline-block px-3 py-1 text-xs font-mono text-primary bg-primary/10 rounded-full border border-primary/20 backdrop-blur-sm">
            {project.category}
          </span>
        </div>

        <h3 className="text-2xl font-bold font-display mb-2 group-hover:text-primary transition-colors duration-300">
          {project.title}
        </h3>
        
        <p className="text-muted-foreground line-clamp-3 mb-6 text-sm leading-relaxed">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags?.slice(0, 3).map((tag, i) => (
            <span key={i} className="text-xs text-white/60 bg-white/5 px-2 py-1 rounded">
              #{tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between mt-auto">
            <Link href={`/projects/${project.id}`}>
              <a className="inline-flex items-center gap-2 text-sm font-bold text-white group-hover:text-primary transition-colors">
                VIEW DETAILS <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Link>
            
            {project.videoUrl && (
               <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-secondary">
                 <Play className="w-4 h-4 fill-current" />
               </div>
            )}
        </div>
      </div>
    </motion.div>
  );
}
