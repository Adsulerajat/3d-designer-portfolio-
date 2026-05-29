import {
  projects,
  contactMessages,
  type InsertProject,
  type InsertMessage,
  type Project,
  type ContactMessage
} from "@shared/schema";

export interface IStorage {
  getProjects(): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
  createContactMessage(message: InsertMessage): Promise<ContactMessage>;
}

export class DatabaseStorage implements IStorage {
  async getProjects(): Promise<Project[]> {
    const { db } = await import("./db");
    return await db.select().from(projects);
  }

  async createProject(project: InsertProject): Promise<Project> {
    const { db } = await import("./db");
    const [newProject] = await db.insert(projects).values(project).returning();
    return newProject;
  }

  async createContactMessage(message: InsertMessage): Promise<ContactMessage> {
    const { db } = await import("./db");
    const [newMessage] = await db.insert(contactMessages).values(message).returning();
    return newMessage;
  }
}

class MemoryStorage implements IStorage {
  private projects: Project[] = [];
  private messages: ContactMessage[] = [];
  private nextProjectId = 1;
  private nextMessageId = 1;

  constructor() {
    // seed a subset of projects for local demos
    const allProjects = [
      {
        title: "Pick & Place Robotic Hand",
        description:
          "A robotic hand designed for pick-and-place operations with mechanical precision.",
        category: "Robotics",
        images: [
          "https://i.ibb.co/HTPRR1p1/Screenshot-2026-01-22-004523.png",
          "https://i.ibb.co/4ZxckTYQ/Screenshot-2026-01-22-004531.png",
        ],
        tags: ["Robotics", "Mechanical Design", "Automation"],
      },
      {
        title: "SIRA - Hexapod",
        description:
          "Spider Inspired Robotic Architecture - Hexapod configuration. Selected at SIH and Avishkar.",
        category: "Robotics",
        images: [
          "https://i.ibb.co/0ySB3Ch0/Screenshot-2026-01-22-004128.png",
          "https://i.ibb.co/q3pfWgxL/Screenshot-2026-01-22-004116.png",
        ],
        tags: ["Hexapod", "Biomimicry", "Robotics"],
      },
      {
        title: "Mechanical Parts Design",
        description:
          "Detailed mechanical parts design including Legs, Knees, Thighs, and Hips for robotic architectures.",
        category: "3D Design",
        images: [
          "https://i.ibb.co/HJp9mHG/Screenshot-2026-01-22-004042.png",
          "https://i.ibb.co/bjkGnkn2/Screenshot-2026-01-22-004033.png",
        ],
        tags: ["CAD", "Fusion 360", "Mechanical Engineering"],
      },
      {
        title: "Real-World Implementation",
        description:
          "Physical prototypes and 3D printed models in action.",
        category: "Prototyping",
        images: [
          "https://i.ibb.co/yB4xJJXp/Screenshot-2026-01-22-012140.png",
        ],
        videoUrl: "https://www.youtube.com/embed/DD1lmYOdKHY",
        videoUrls: [
          "https://www.youtube.com/embed/ZJIcioFQKCc",
          "https://www.youtube.com/embed/DD1lmYOdKHY",
        ],
        tags: ["3D Printing", "Prototyping", "Hardware"],
      },
    ];

    for (const p of allProjects) {
      // coerce into Project type with an id
      const proj: Project = {
        id: this.nextProjectId++,
        title: p.title as any,
        description: p.description as any,
        category: p.category as any,
        images: p.images as any,
        videoUrl: (p as any).videoUrl ? (p as any).videoUrl as any : null as any,
        videoUrls: (p as any).videoUrls ? (p as any).videoUrls as any : [] as any,
        repoUrl: (p as any).repoUrl ? (p as any).repoUrl as any : null as any,
        demoUrl: (p as any).demoUrl ? (p as any).demoUrl as any : null as any,
        tags: p.tags as any,
      };
      this.projects.push(proj);
    }
  }

  async getProjects(): Promise<Project[]> {
    return this.projects;
  }

  async createProject(project: InsertProject): Promise<Project> {
    const newProject: Project = {
      id: this.nextProjectId++,
      title: project.title as any,
      description: project.description as any,
      category: project.category as any,
      images: (project.images || []) as any,
      videoUrl: (project.videoUrl as any) || null,
      videoUrls: (project.videoUrls as any) || [],
      repoUrl: (project.repoUrl as any) || null,
      demoUrl: (project.demoUrl as any) || null,
      tags: (project.tags || []) as any,
    };
    this.projects.push(newProject);
    return newProject;
  }

  async createContactMessage(message: InsertMessage): Promise<ContactMessage> {
    const newMessage: ContactMessage = {
      id: this.nextMessageId++,
      name: message.name as any,
      email: message.email as any,
      message: message.message as any,
      createdAt: new Date().toISOString(),
    };
    this.messages.push(newMessage);
    return newMessage;
  }
}

export const storage = process.env.DATABASE_URL ? new DatabaseStorage() : new MemoryStorage();
