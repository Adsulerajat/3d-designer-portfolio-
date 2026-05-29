-- =====================
-- TABLE: projects
-- =====================
CREATE TABLE IF NOT EXISTS projects (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  images TEXT[] NOT NULL,
  video_url TEXT,
  video_urls TEXT[],
  repo_url TEXT,
  demo_url TEXT,
  tags TEXT[]
);

-- =====================
-- TABLE: contact_messages
-- =====================
CREATE TABLE IF NOT EXISTS contact_messages (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TEXT DEFAULT 'now()'
);

-- =====================
-- PROJECT DATA
-- =====================
INSERT INTO projects (title, description, category, images, video_url, video_urls, repo_url, demo_url, tags) VALUES

('Pick & Place Robotic Hand',
 'A robotic hand designed for pick-and-place operations with mechanical precision.',
 'Robotics',
 ARRAY['https://i.ibb.co/HTPRR1p1/Screenshot-2026-01-22-004523.png','https://i.ibb.co/4ZxckTYQ/Screenshot-2026-01-22-004531.png'],
 NULL, NULL, NULL, NULL,
 ARRAY['Robotics','Mechanical Design','Automation']),

('SIRA - Hexapod',
 'Spider Inspired Robotic Architecture - Hexapod configuration. Selected at SIH and Avishkar.',
 'Robotics',
 ARRAY['https://i.ibb.co/0ySB3Ch0/Screenshot-2026-01-22-004128.png','https://i.ibb.co/q3pfWgxL/Screenshot-2026-01-22-004116.png','https://i.ibb.co/gKvG6hX/Screenshot-2026-01-22-004225.png'],
 NULL, NULL, NULL, NULL,
 ARRAY['Hexapod','Biomimicry','Robotics']),

('SIRA - Quadruped',
 'Spider Inspired Robotic Architecture - Quadruped configuration.',
 'Robotics',
 ARRAY['https://i.ibb.co/VWLd8ndf/Screenshot-2026-01-22-004338.png','https://i.ibb.co/v6K104Xd/Screenshot-2026-01-22-004344.png'],
 NULL, NULL, NULL, NULL,
 ARRAY['Quadruped','Robotics','Locomotion']),

('Mechanical Parts Design',
 'Detailed mechanical parts design including Legs, Knees, Thighs, and Hips for robotic architectures.',
 '3D Design',
 ARRAY['https://i.ibb.co/HJp9mHG/Screenshot-2026-01-22-004042.png','https://i.ibb.co/bjkGnkn2/Screenshot-2026-01-22-004033.png','https://i.ibb.co/My62nFys/Screenshot-2026-01-22-003911.png','https://i.ibb.co/JWWK0SPg/Screenshot-2026-01-22-003926.png','https://i.ibb.co/nNXZW7Yk/Screenshot-2026-01-22-003944.png','https://i.ibb.co/6R2k8rVZ/Screenshot-2026-01-22-003952.png','https://i.ibb.co/x8jVrnG9/Screenshot-2026-01-22-003808.png','https://i.ibb.co/jvJFgcVg/Screenshot-2026-01-22-003814.png'],
 NULL, NULL, NULL, NULL,
 ARRAY['CAD','Fusion 360','Mechanical Engineering']),

('Real-World Implementation',
 'Physical prototypes and 3D printed models in action.',
 'Prototyping',
 ARRAY['https://i.ibb.co/yB4xJJXp/Screenshot-2026-01-22-012140.png'],
 'https://www.youtube.com/embed/DD1lmYOdKHY',
 ARRAY['https://www.youtube.com/embed/ZJIcioFQKCc','https://www.youtube.com/embed/DD1lmYOdKHY'],
 NULL, NULL,
 ARRAY['3D Printing','Prototyping','Hardware']),

('From Code to Circuits',
 'My previous portfolio showcasing circuits and design work.',
 'Portfolio',
 ARRAY['https://i.ibb.co/cSryHgLS/Screenshot-2026-01-22-114042.png'],
 NULL, NULL,
 'https://github.com/Adsulerajat/From-Code-to-Circuits-My-Portfolio',
 'https://adsulerajat.github.io/From-Code-to-Circuits-My-Portfolio/',
 ARRAY['Web','Portfolio','Showcase']),

('Pen Holder',
 'A sleek and functional pen holder design created using CAD software.',
 '3D Design',
 ARRAY['https://i.ibb.co/MDS0G5KY/Screenshot-2026-04-20-223608.png','https://i.ibb.co/FLHkvWcq/Screenshot-2026-04-20-223618.png','https://i.ibb.co/m5rg3XhV/Screenshot-2026-04-20-223624.png'],
 NULL, ARRAY[]::text[], NULL, NULL,
 ARRAY['CAD','3D Design','Fusion 360','Product Design']),

('Drone Design Type 1',
 'Drone structure design type 1, engineered for structural integrity and aesthetic appeal.',
 '3D Design',
 ARRAY['https://i.ibb.co/QFjMLqjY/Screenshot-2026-04-20-221924.png','https://i.ibb.co/5gL6FCrr/Screenshot-2026-04-20-221948-Copy.png','https://i.ibb.co/JwFTxpC8/Screenshot-2026-04-20-221957-Copy.png'],
 NULL, ARRAY[]::text[], NULL, NULL,
 ARRAY['CAD','3D Design','Architecture','SolidWorks']),

('Drone Design Type 2',
 'An alternate drone design variation exploring different geometric configurations.',
 '3D Design',
 ARRAY['https://i.ibb.co/hRkJ6x21/Screenshot-2026-04-20-225852.png','https://i.ibb.co/LznnTBV2/Screenshot-2026-04-20-225902.png','https://i.ibb.co/zYxsRV7/Screenshot-2026-04-20-225909.png'],
 NULL, ARRAY[]::text[], NULL, NULL,
 ARRAY['CAD','3D Design','Architecture','Fusion 360']),

('Drone Design Type 3',
 'A third drone design variant featuring unique lattice geometry and innovative structural solutions.',
 '3D Design',
 ARRAY['https://i.ibb.co/JjF7r8HH/Screenshot-2026-04-20-225302.png','https://i.ibb.co/fYrFFX6j/Screenshot-2026-04-20-225321.png','https://i.ibb.co/36ncJcM/Screenshot-2026-04-20-225414.png'],
 NULL, ARRAY[]::text[], NULL, NULL,
 ARRAY['CAD','3D Design','Architecture','SolidWorks']),

('Robo War Car',
 'A battle-ready robotic combat vehicle designed for competitive robot wars.',
 'Robotics',
 ARRAY['https://i.ibb.co/HDpDJvXt/Screenshot-2026-04-20-224003.png'],
 NULL, ARRAY[]::text[], NULL, NULL,
 ARRAY['Robotics','Combat Robot','CAD','3D Design','Mechanical Design']),

('Hard Disk Case',
 'A precision-engineered protective enclosure for hard disk drives.',
 '3D Design',
 ARRAY['https://i.ibb.co/0y60Qy3X/Screenshot-2026-04-20-222115-Copy.png','https://i.ibb.co/5WHqVWZP/Screenshot-2026-04-20-222126.png','https://i.ibb.co/fGpp0gRV/Screenshot-2026-04-20-222144.png','https://i.ibb.co/QF9GLzPR/Screenshot-2026-04-20-222201.png','https://i.ibb.co/C51xB4Yn/Screenshot-2026-04-20-222208.png'],
 NULL, ARRAY[]::text[], NULL, NULL,
 ARRAY['CAD','Product Design','Enclosure','Fusion 360','3D Design']);
