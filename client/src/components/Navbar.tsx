import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Menu, X, Cpu } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="fixed w-full z-50 top-0 left-0 bg-background/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/">
            <a className="flex items-center gap-2 group cursor-pointer">
              <Cpu className="w-8 h-8 text-primary group-hover:rotate-180 transition-transform duration-500" />
              <span className="text-xl font-bold font-display tracking-widest text-foreground group-hover:text-glow transition-all">
                VOXEL<span className="text-primary">VIBE</span>
              </span>
            </a>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link key={item.name} href={item.path}>
                <a className={`relative px-2 py-1 text-sm font-medium tracking-wide transition-colors duration-200 ${
                  location === item.path ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}>
                  {item.name}
                  {location === item.path && (
                    <motion.div
                      layoutId="underline"
                      className="absolute left-0 right-0 bottom-0 h-0.5 bg-primary shadow-[0_0_10px_rgba(0,243,255,0.7)]"
                    />
                  )}
                </a>
              </Link>
            ))}
            <a 
              href="https://voxelvibe.shop" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-4 py-2 text-sm font-bold bg-primary text-black rounded hover:bg-white hover:text-primary transition-colors duration-300"
            >
              SHOP
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-muted-foreground hover:text-white p-2"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-background border-b border-white/5"
        >
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navItems.map((item) => (
              <Link key={item.name} href={item.path}>
                <a
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    location === item.path
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {item.name}
                </a>
              </Link>
            ))}
             <a 
              href="https://voxelvibe.shop" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block px-3 py-2 rounded-md text-base font-bold text-primary hover:bg-primary/10"
            >
              VISIT SHOP
            </a>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
