import { Navbar } from "@/components/Navbar";
import { ProjectCard } from "@/components/ProjectCard";
import { useProjects } from "@/hooks/use-projects";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Cpu, Layers, PenTool, Move, Settings, Zap } from "lucide-react";

const tools = [
  { name: "AutoCAD", icon: PenTool, level: "Advanced" },
  { name: "Fusion 360", icon: Layers, level: "Advanced" },
  { name: "SolidWorks", icon: Settings, level: "Learning" },
  { name: "Blender", icon: Box, level: "Learning" },
];

// Helper for icon component in tools array
function Box(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  );
}

export default function Home() {
  const { data: projects, isLoading } = useProjects();

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-20 overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-secondary/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "1s" }} />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-sm"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-mono text-primary tracking-widest uppercase">VoxelVibe Design Systems</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-display font-black tracking-tight leading-tight mb-8"
          >
            Designing <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/50 text-glow">Motion</span>,<br />
            Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-secondary/50 text-glow-purple">Intelligence</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Turning ideas into real-world machines. I design robotic systems and mechanical architectures to solve complex engineering challenges.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/projects">
              <a className="w-full sm:w-auto px-8 py-4 bg-primary text-black font-bold text-lg rounded hover:bg-white hover:shadow-[0_0_20px_rgba(0,243,255,0.4)] transition-all duration-300 flex items-center justify-center gap-2">
                View Projects <ArrowRight className="w-5 h-5" />
              </a>
            </Link>
            <Link href="/contact">
              <a className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white/20 text-white font-bold text-lg rounded hover:border-white hover:bg-white/5 transition-all duration-300">
                Contact Me
              </a>
            </Link>
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-muted-foreground uppercase tracking-widest">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-primary to-transparent" />
        </motion.div>
      </section>

      {/* SKILLS SECTION */}
      <section className="py-24 bg-black/50 border-y border-white/5 backdrop-blur-sm relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold mb-4">Tech Stack & Tools</h2>
            <p className="text-muted-foreground">Software I use to bring machines to life</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {tools.map((tool, idx) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group p-6 bg-muted/20 border border-white/5 rounded-xl hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 text-center"
              >
                <tool.icon className="w-10 h-10 mx-auto mb-4 text-muted-foreground group-hover:text-primary transition-colors" />
                <h3 className="font-bold text-lg mb-1">{tool.name}</h3>
                <span className="text-xs text-primary/70 uppercase tracking-wider">{tool.level}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS PREVIEW SECTION */}
      <section id="projects" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Latest Work</h2>
              <p className="text-muted-foreground max-w-lg">
                A selection of robotics and design projects, from digital concepts to physical prototypes.
              </p>
            </div>
            <Link href="/projects">
              <a className="hidden md:flex items-center gap-2 text-primary hover:text-white transition-colors">
                View All Projects <ArrowRight className="w-4 h-4" />
              </a>
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {[1, 2, 3].map(i => (
                 <div key={i} className="h-96 rounded-xl bg-muted/20 animate-pulse border border-white/5" />
               ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects?.slice(0, 3).map((project, idx) => (
                <ProjectCard key={project.id} project={project} index={idx} />
              ))}
            </div>
          )}
          
          <div className="mt-12 text-center md:hidden">
            <Link href="/projects">
              <a className="btn-primary inline-flex items-center gap-2 px-6 py-3 bg-muted border border-white/10 rounded font-medium">
                View All Projects <ArrowRight className="w-4 h-4" />
              </a>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-32 bg-gradient-to-b from-transparent to-primary/10 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">Ready to Build Something Incredible?</h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            I'm currently available for freelance projects and collaborations. Let's discuss how we can engineer your vision.
          </p>
          <Link href="/contact">
            <a className="inline-block px-10 py-4 bg-white text-black font-bold text-xl rounded hover:scale-105 transition-transform duration-300 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
              Start a Conversation
            </a>
          </Link>
        </div>
      </section>
    </div>
  );
}
