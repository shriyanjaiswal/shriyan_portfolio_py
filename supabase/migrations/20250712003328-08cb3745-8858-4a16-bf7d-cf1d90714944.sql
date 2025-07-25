
-- Create a table for personal information
CREATE TABLE public.personal_info (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  bio TEXT,
  quote TEXT,
  location TEXT,
  email TEXT,
  phone TEXT,
  github_url TEXT,
  linkedin_url TEXT,
  portfolio_url TEXT,
  resume_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create a table for projects
CREATE TABLE public.projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  short_description TEXT,
  image_url TEXT,
  live_demo_url TEXT,
  source_code_url TEXT,
  start_date DATE,
  end_date DATE,
  category TEXT NOT NULL DEFAULT 'Website',
  technologies TEXT[] DEFAULT '{}',
  features TEXT[] DEFAULT '{}',
  stats JSONB DEFAULT '{}',
  sort_order INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create a table for skills
CREATE TABLE public.skills (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  proficiency INTEGER NOT NULL CHECK (proficiency >= 0 AND proficiency <= 100),
  category TEXT NOT NULL,
  icon TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create a table for certifications
CREATE TABLE public.certifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  organization TEXT NOT NULL,
  date TEXT NOT NULL,
  link TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create a table for journey timeline
CREATE TABLE public.journey_timeline (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  phase TEXT NOT NULL,
  title TEXT NOT NULL,
  period TEXT NOT NULL,
  description TEXT NOT NULL,
  highlights TEXT[] DEFAULT '{}',
  icon TEXT,
  color TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert your personal information
INSERT INTO public.personal_info (
  name, role, bio, quote, location, email, phone, github_url, linkedin_url, portfolio_url
) VALUES (
  'Praveen Yadav',
  'Aspiring Full Stack Developer',
  'Motivated final-year BCA student passionate about building modern apps, solving problems, and exploring full-stack development with innovative solutions.',
  'Code is poetry, and every line I write tells a story.',
  'Buddha Nagar Colony, Sarnath',
  'praveen885127@gmail.com',
  '+917290955962',
  'https://github.com/pyapril15',
  'https://linkedin.com/in/pyapril15',
  'https://imypraveenyadav.web.app'
);

-- Insert journey timeline data
INSERT INTO public.journey_timeline (phase, title, period, description, highlights, icon, color, sort_order) VALUES
(
  'Phase 1: Early Spark',
  'High School Foundation',
  '2017 - 2019',
  'Got introduced to computers and basic programming. Participated in sports activities.',
  ARRAY[
    'First exposure to programming concepts',
    'Participated in Kho-Kho competitions',
    'Football team member',
    'Marathon participation',
    'Developed interest in technology'
  ],
  'GraduationCap',
  'from-blue-400 to-cyan-400',
  1
),
(
  'Phase 2: Academic Growth',
  'Senior Secondary Education',
  '2020 - 2021',
  'Studied Computer Science with Python. Developed analytical skills and problem-solving mindset.',
  ARRAY[
    'Computer Science with Python coursework',
    'Physics, Chemistry, Mathematics foundation',
    'Analytical thinking development',
    'Problem-solving methodology',
    'Academic excellence focus'
  ],
  'Code',
  'from-green-400 to-emerald-400',
  2
),
(
  'Phase 3: Technical Deep Dive',
  'Bachelor of Computer Application',
  '2022 - 2025',
  'Learned Java, C++, Data Structures, DBMS. Built real-world projects using Flutter, Firebase, Python.',
  ARRAY[
    'Programming in Java, C++, C Development',
    'Database Management & Data Structures',
    'Operating System concepts',
    'Built 10+ real-world projects',
    'Flutter & Firebase expertise'
  ],
  'Trophy',
  'from-purple-400 to-pink-400',
  3
),
(
  'Phase 4: Aspiring Developer',
  'Present & Future',
  '2025 onwards',
  'Built multiple apps & websites. Aiming to work as a Full Stack Developer and continuously grow.',
  ARRAY[
    'Multiple mobile apps & websites',
    'Client project collaborations',
    'Full Stack Development focus',
    'Continuous learning mindset',
    'Innovation-driven approach'
  ],
  'Target',
  'from-orange-400 to-red-400',
  4
);

-- Insert skills data
INSERT INTO public.skills (name, description, proficiency, category, icon, sort_order) VALUES
-- Frontend Development
('HTML/CSS', 'Modern web styling and responsive design', 90, 'Frontend Development', '🎨', 1),
('JavaScript', 'Interactive web applications and DOM manipulation', 85, 'Frontend Development', '🟨', 2),
('React', 'Component-based UI development', 80, 'Frontend Development', '⚛️', 3),
('Flutter', 'Cross-platform mobile app development', 88, 'Frontend Development', '💙', 4),

-- Backend Development
('Python', 'Core programming and automation scripts', 92, 'Backend Development', '🐍', 1),
('Java', 'Object-oriented programming and enterprise development', 85, 'Backend Development', '☕', 2),
('C++', 'System programming and data structures', 80, 'Backend Development', '⚡', 3),
('Dart', 'Flutter development and app logic', 85, 'Backend Development', '🎯', 4),

-- Mobile Development
('Android Development', 'Native and cross-platform mobile apps', 85, 'Mobile Development', '📱', 1),
('Firebase', 'Backend-as-a-Service and real-time databases', 90, 'Mobile Development', '🔥', 2),
('SQLite', 'Local database storage for mobile apps', 80, 'Mobile Development', '💾', 3),

-- Database & Cloud
('MySQL', 'Relational database design and optimization', 85, 'Database & Cloud', '🗄️', 1),
('PostgreSQL', 'Advanced relational database management', 75, 'Database & Cloud', '🐘', 2),
('Firebase Firestore', 'NoSQL cloud database', 88, 'Database & Cloud', '☁️', 3),

-- Development Tools
('Git/GitHub', 'Version control and collaborative development', 90, 'Development Tools', '🔧', 1),
('VS Code', 'Primary IDE for development', 95, 'Development Tools', '💻', 2),
('Android Studio', 'Android app development environment', 85, 'Development Tools', '🤖', 3),
('PyCharm', 'Python development and debugging', 80, 'Development Tools', '🐍', 4);

-- Insert certifications data
INSERT INTO public.certifications (name, organization, date, sort_order) VALUES
('DSA PW Skills - C++, Java, Python (Ongoing)', 'Physics Wallah', 'Feb 2025', 1),
('TCSiON Career Edge Young Professional', 'TCS', 'Feb 2025', 2),
('Reliance Foundation Python Program', 'Reliance Foundation', 'Jan 2025', 3),
('Reliance Foundation Python DS', 'Reliance Foundation', 'Jan 2025', 4),
('Smart India Hackathon Internal Hackathon', 'Government of India', 'Nov 2024', 5);

-- Insert sample projects data
INSERT INTO public.projects (name, description, short_description, category, technologies, features, start_date, end_date, sort_order, is_featured) VALUES
('E-Commerce Mobile App', 'A full-featured e-commerce application built with Flutter and Firebase, offering seamless shopping experience with real-time inventory management.', 'Flutter-based shopping app with Firebase backend', 'Mobile App', 
ARRAY['Flutter', 'Firebase', 'Dart', 'Stripe API'], 
ARRAY['User Authentication', 'Product Catalog', 'Shopping Cart', 'Payment Integration', 'Order Tracking'], 
'2024-01-15', '2024-03-20', 1, true),

('Task Management Web App', 'A comprehensive task management system built with React and Node.js, featuring team collaboration and project tracking capabilities.', 'React-based productivity tool for teams', 'Website', 
ARRAY['React', 'Node.js', 'MongoDB', 'Express.js'], 
ARRAY['Team Collaboration', 'Project Tracking', 'Real-time Updates', 'File Sharing', 'Analytics Dashboard'], 
'2023-09-10', '2023-12-05', 2, true),

('Restaurant Management System', 'An enterprise-level restaurant management solution with inventory tracking, staff management, and customer relationship features.', 'Complete restaurant operations management', 'Enterprise', 
ARRAY['Java', 'Spring Boot', 'MySQL', 'Angular'], 
ARRAY['Inventory Management', 'Staff Scheduling', 'Customer CRM', 'Financial Reports', 'Multi-location Support'], 
'2023-06-01', '2023-08-30', 3, true),

('Weather Forecast App', 'A beautiful weather application with location-based forecasts, interactive maps, and weather alerts.', 'Flutter weather app with real-time data', 'Mobile App', 
ARRAY['Flutter', 'OpenWeather API', 'Google Maps API'], 
ARRAY['Location-based Forecasts', 'Interactive Weather Maps', 'Weather Alerts', 'Historical Data'], 
'2023-04-15', '2023-05-20', 4, false),

('Personal Portfolio Website', 'A modern, responsive portfolio website showcasing projects and skills with smooth animations and interactive elements.', 'Interactive portfolio with modern design', 'Website', 
ARRAY['React', 'Tailwind CSS', 'Framer Motion'], 
ARRAY['Responsive Design', 'Smooth Animations', 'Contact Form', 'Project Showcase'], 
'2023-02-01', '2023-03-15', 5, false);

-- Enable Row Level Security (make tables public for portfolio)
ALTER TABLE public.personal_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.journey_timeline ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public read access (since this is a portfolio)
CREATE POLICY "Allow public read access to personal_info"
  ON public.personal_info FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public read access to projects"
  ON public.projects FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public read access to skills"
  ON public.skills FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public read access to certifications"
  ON public.certifications FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public read access to journey_timeline"
  ON public.journey_timeline FOR SELECT
  TO public
  USING (true);
