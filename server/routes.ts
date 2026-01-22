import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Projects
  app.get(api.projects.list.path, async (req, res) => {
    const projects = await storage.getProjects();
    res.json(projects);
  });

  app.get(api.projects.get.path, async (req, res) => {
    const allProjects = await storage.getProjects();
    const project = allProjects.find(p => p.id === Number(req.params.id));
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  });

  // Contact
  app.post(api.contact.submit.path, async (req, res) => {
    try {
      const input = api.contact.submit.input.parse(req.body);
      const message = await storage.createContactMessage(input);
      res.status(201).json(message);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message
        });
      }
      throw err;
    }
  });

  // Seed Data
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const existingProjects = await storage.getProjects();
  if (existingProjects.length === 0) {
    // 1. Pick & Place Robotic Hand
    await storage.createProject({
      title: "Pick & Place Robotic Hand",
      description: "A robotic hand designed for pick-and-place operations with mechanical precision.",
      category: "Robotics",
      images: [
        "https://i.ibb.co/HTPRR1p1/Screenshot-2026-01-22-004523.png",
        "https://i.ibb.co/4ZxckTYQ/Screenshot-2026-01-22-004531.png"
      ],
      tags: ["Robotics", "Mechanical Design", "Automation"]
    });

    // 2. SIRA - Hexapod
    await storage.createProject({
      title: "SIRA - Hexapod",
      description: "Spider Inspired Robotic Architecture - Hexapod configuration. Selected at SIH and Avishkar.",
      category: "Robotics",
      images: [
        "https://i.ibb.co/0ySB3Ch0/Screenshot-2026-01-22-004128.png",
        "https://i.ibb.co/q3pfWgxL/Screenshot-2026-01-22-004116.png",
        "https://i.ibb.co/gKvG6hX/Screenshot-2026-01-22-004225.png"
      ],
      tags: ["Hexapod", "Biomimicry", "Robotics"]
    });

    // 3. SIRA - Quadruped
    await storage.createProject({
      title: "SIRA - Quadruped",
      description: "Spider Inspired Robotic Architecture - Quadruped configuration.",
      category: "Robotics",
      images: [
        "https://i.ibb.co/VWLd8ndf/Screenshot-2026-01-22-004338.png",
        "https://i.ibb.co/v6K104Xd/Screenshot-2026-01-22-004344.png"
      ],
      tags: ["Quadruped", "Robotics", "Locomotion"]
    });

     // 4. Mechanical Parts
    await storage.createProject({
      title: "Mechanical Parts Design",
      description: "Detailed mechanical parts design including Legs, Knees, Thighs, and Hips for robotic architectures.",
      category: "3D Design",
      images: [
        "https://i.ibb.co/HJp9mHG/Screenshot-2026-01-22-004042.png",
        "https://i.ibb.co/bjkGnkn2/Screenshot-2026-01-22-004033.png",
        "https://i.ibb.co/My62nFys/Screenshot-2026-01-22-003911.png",
        "https://i.ibb.co/JWWK0SPg/Screenshot-2026-01-22-003926.png",
        "https://i.ibb.co/nNXZW7Yk/Screenshot-2026-01-22-003944.png",
         "https://i.ibb.co/6R2k8rVZ/Screenshot-2026-01-22-003952.png",
         "https://i.ibb.co/x8jVrnG9/Screenshot-2026-01-22-003808.png",
         "https://i.ibb.co/jvJFgcVg/Screenshot-2026-01-22-003814.png"
      ],
      tags: ["CAD", "Fusion 360", "Mechanical Engineering"]
    });
    
    // 5. Real World Implementation
     await storage.createProject({
      title: "Real-World Implementation",
      description: "Physical prototypes and 3D printed models in action.",
      category: "Prototyping",
      images: [
        "https://i.ibb.co/yB4xJJXp/Screenshot-2026-01-22-012140.png"
      ],
      videoUrl: "https://www.youtube.com/embed/DD1lmYOdKHY",
      tags: ["3D Printing", "Prototyping", "Hardware"]
    });

    // 6. Portfolio Reference
    await storage.createProject({
      title: "Previous Portfolio",
      description: "My previous 'From Code to Circuits' portfolio showcasing circuits and design work.",
      category: "Portfolio",
      images: [
        "https://adsulerajat.github.io/From-Code-to-Circuits-My-Portfolio/assets/img/portfolio/circuits.jpg"
      ],
      videoUrl: "https://www.youtube.com/embed/ZJIcioFQKCc",
      repoUrl: "https://github.com/Adsulerajat/From-Code-to-Circuits-My-Portfolio",
      demoUrl: "https://adsulerajat.github.io/From-Code-to-Circuits-My-Portfolio/",
      tags: ["Web", "Portfolio", "Showcase"]
    });
  }
}
