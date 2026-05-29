import { useRoute } from "wouter";
import { useProject } from "@/hooks/use-projects";
import { Navbar } from "@/components/Navbar";
import { motion } from "framer-motion";
import { ArrowLeft, Play, Calendar, Tag, ExternalLink } from "lucide-react";
import { Link } from "wouter";

function toYouTubeShortsUrl(embedUrl: string) {
  try {
    const u = new URL(embedUrl);
    const parts = u.pathname.split('/');
    const id = parts[parts.length - 1];
    return `https://youtube.com/shorts/${id}`;
  } catch (e) {
    return embedUrl;
  }
}

export default function ProjectDetails() {
  const [match, params] = useRoute("/projects/:id");
  const id = params?.id ? parseInt(params.id) : 0;
  const { data: project, isLoading, error } = useProject(id);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold mb-4">Project Not Found</h2>
        <Link href="/projects" className="text-primary hover:underline">Back to Projects</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground pb-24">
      <Navbar />

      {/* Hero Header */}
      <div className="relative w-full h-[60vh] bg-black/50">
        <img 
          src={project.images[0]} 
          alt={project.title} 
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full p-4 sm:p-8 md:p-12 lg:p-16">
          <div className="max-w-7xl mx-auto">
            <Link href="/projects">
              <a className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-6 transition-colors">
                <ArrowLeft className="w-4 h-4" /> Back to Projects
              </a>
            </Link>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-4 text-glow"
            >
              {project.title}
            </motion.h1>
            <div className="flex flex-wrap items-center gap-4 text-sm md:text-base">
              <span className="bg-primary/20 text-primary px-3 py-1 rounded-full border border-primary/20 font-mono">
                {project.category}
              </span>
              {project.tags?.map(tag => (
                <span key={tag} className="text-muted-foreground flex items-center gap-1">
                  <Tag className="w-3 h-3" /> {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-12">
          <section>
            <h2 className="text-2xl font-display font-bold mb-6 text-white border-l-4 border-primary pl-4">Overview</h2>
            <div className="prose prose-invert prose-lg max-w-none text-muted-foreground">
              <p>{project.description}</p>
            </div>
          </section>

          {/* Video Section */}
          {project.videoUrls && project.videoUrls.length > 0 && project.category !== "Portfolio" && (
            <section className="space-y-8">
              <h2 className="text-2xl font-display font-bold mb-6 text-white border-l-4 border-secondary pl-4">Demo Videos</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.videoUrls.map((url, idx) => (
                  <div key={idx} className="aspect-video w-full rounded-xl overflow-hidden border border-white/10 bg-black shadow-lg shadow-secondary/5">
                    <div className="relative w-full h-full">
                      <iframe 
                        src={url} 
                        title={`Project Video ${idx + 1}`}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                      <a
                        href={toYouTubeShortsUrl(url)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute right-3 bottom-3 bg-white/10 text-white px-3 py-1 rounded backdrop-blur-sm hover:bg-white/20 transition-colors flex items-center gap-2"
                      >
                        Open on YouTube <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Fallback for single videoUrl if videoUrls is missing or empty */}
          {(!project.videoUrls || project.videoUrls.length === 0) && project.videoUrl && project.category !== "Portfolio" && (
            <section>
              <h2 className="text-2xl font-display font-bold mb-6 text-white border-l-4 border-secondary pl-4">Demo Video</h2>
              <div className="aspect-video w-full rounded-xl overflow-hidden border border-white/10 bg-black relative">
                <iframe 
                  src={project.videoUrl} 
                  title="Project Video"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
                <a
                  href={toYouTubeShortsUrl(project.videoUrl)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute right-3 bottom-3 bg-white/10 text-white px-3 py-1 rounded backdrop-blur-sm hover:bg-white/20 transition-colors flex items-center gap-2"
                >
                  Open on YouTube <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </section>
          )}

          {/* Portfolio Link Section (if video is hidden) */}
          {project.category === "Portfolio" && project.demoUrl && (
            <section className="p-8 rounded-2xl bg-primary/5 border border-primary/20">
              <h2 className="text-2xl font-display font-bold mb-4 text-white">Project Link</h2>
              <p className="text-muted-foreground mb-6">
                Experience the full interactive portfolio and see the robotic architectures in action.
              </p>
              <a 
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-black font-bold rounded-lg hover:shadow-[0_0_20px_rgba(0,243,255,0.4)] transition-all"
              >
                Visit Live Portfolio <ExternalLink className="w-4 h-4" />
              </a>
            </section>
          )}

          {/* Image Gallery */}
          <section>
            <h2 className="text-2xl font-display font-bold mb-6 text-white border-l-4 border-primary pl-4">Gallery</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.images.map((img, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className="rounded-lg overflow-hidden border border-white/5 hover:border-primary/50 transition-colors cursor-zoom-in"
                >
                  <img src={img} alt={`${project.title} view ${idx + 1}`} className="w-full h-64 object-cover hover:scale-110 transition-transform duration-500" />
                </motion.div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar Info */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-muted/20 border border-white/5 rounded-xl p-6 backdrop-blur-sm">
            <h3 className="text-xl font-bold font-display mb-6">Project Details</h3>
            
            <div className="space-y-6">
              <div>
                <span className="block text-sm text-muted-foreground mb-1">Category</span>
                <div className="flex items-center gap-2 text-white font-medium">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  {project.category}
                </div>
              </div>

              <div>
                <span className="block text-sm text-muted-foreground mb-1">Technologies</span>
                <div className="flex flex-wrap gap-2">
                  {project.tags?.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-white/10">
                <a href="/contact" className="w-full btn-primary block text-center py-3 rounded bg-primary text-black font-bold hover:bg-white transition-colors">
                  Inquire About This
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
