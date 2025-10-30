import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, Phone, MapPin, ExternalLink, Menu, X } from 'lucide-react';
import './App.css';


const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);

      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const skills = {
    frontend: ['React', 'JavaScript', 'TypeScript', 'HTML', 'CSS', 'Tailwindcss', 'Figma'],
    backend: ['Python', 'Django', 'FastAPI', 'Flask', '.NET', 'Node.js'],
    tools: ['Git', 'GitHub', 'Docker', 'Postman', 'Jira', 'SQL Server'],
    ai: ['Cursor', 'Claude', 'OpenAI', 'Replit']
  };

  const projects = [
    {
      title: 'Online Courses Platform',
      description: 'Full-stack web application with React frontend and Django REST backend. Features user authentication, course management, and responsive design.',
      tech: ['React', 'Django REST', 'PostgreSQL'],
      github: 'https://github.com/knarhar/Online-courses-platform-frontend-'
    },
    {
      title: 'Microservices Online Store',
      description: 'Scalable e-commerce platform using microservices architecture. Implemented API integrations, message queuing, and service orchestration.',
      tech: ['FastAPI', 'Django', 'PostgreSQL', 'RabbitMQ'],
      github: 'https://github.com/knarhar/Microservices'
    },
    {
      title: 'Note-Taking Application',
      description: 'Developed A modern, full-stack note-taking application built with React and Django, with beautiful card-based interface, categorize notes, and intuitive dark-themed UI management.',
      tech: ['Django REST', 'SQLite', 'React', 'Tailwindcss', 'AntDesign UI'],
      github: 'https://github.com/knarhar/MemoMap'
    }
  ];

  const experience = [
    {
      role: 'Python Developer',
      company: 'Makichyan Consulting LLC',
      period: 'Dec 2024 – Mar 2025',
      highlights: ['Developed RESTful APIs', 'Code reviews & Agile sprints', 'SQL optimization']
    },
    {
      role: 'Software Developer Trainee',
      company: 'Ogma Knowledge Center',
      period: 'May 2024 – Apr 2025',
      highlights: ['Built React applications', 'Component-driven development', 'Code quality focus']
    },
    {
      role: 'SAS Analyst (Clinical data)',
      company: 'STATECS LLC',
      period: 'Jun 2024 – Aug 2025',
      highlights: ['Data management with SAS', 'SDTM & ADaM domain development', 'TLF development']
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-gray-900/95 backdrop-blur-sm z-50 border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-500 to-blue-500 bg-clip-text text-transparent">
              KH
            </h1>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {['home', 'about', 'skills', 'projects', 'contact'].map(section => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`nav-link capitalize text-sm font-medium transition-colors ${activeSection === section ? 'text-violet-400 active' : 'text-gray-300 hover:text-white'
                    }`}
                >
                  {section}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-300 hover:text-white"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-3">
              {['home', 'about', 'skills', 'projects', 'contact'].map(section => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`block w-full text-left capitalize py-2 px-4 rounded transition-colors ${activeSection === section
                      ? 'bg-violet-600 text-white'
                      : 'text-gray-300 hover:bg-gray-800'
                    }`}
                >
                  {section}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen gradient-bg flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-violet-600 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-600 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10 fade-in animate-in">
          <div className="mb-6 float">
            <h2 className="text-5xl sm:text-7xl font-bold mb-4 glow-text">
              Knarik Harutyunyan
            </h2>
            <p className="text-2xl sm:text-3xl text-violet-400 font-semibold mb-6">
              Junior Fullstack Developer
            </p>
          </div>

          <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Passionate about building scalable web applications with modern technologies.
            Bringing bold ideas to life through clean code and innovative solutions.
          </p>

          <div className="flex justify-center space-x-4 mb-8">
            <a
              href="https://github.com/knarhar"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-gray-800 hover:bg-violet-600 rounded-full transition-all duration-300 hover:scale-110"
            >
              <Github size={24} />
            </a>
            <a
              href="https://www.linkedin.com/in/knarik-harutyunyan-61a7a1273/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-gray-800 hover:bg-blue-600 rounded-full transition-all duration-300 hover:scale-110"
            >
              <Linkedin size={24} />
            </a>
            <a
              href="mailto:harutyunyanqnarik2@gmail.com"
              className="p-3 bg-gray-800 hover:bg-violet-600 rounded-full transition-all duration-300 hover:scale-110"
            >
              <Mail size={24} />
            </a>
          </div>

          <button
            onClick={() => scrollToSection('contact')}
            className="px-8 py-3 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-violet-500/50"
          >
            Get In Touch
          </button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-4xl font-bold mb-12 text-center fade-in">
            About <span className="bg-gradient-to-r from-violet-500 to-blue-500 bg-clip-text text-transparent">Me</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8 fade-in">
            <div className="bg-gray-800 p-6 rounded-xl hover:bg-gray-750 transition-all duration-300">
              <h3 className="text-2xl font-semibold mb-4 text-violet-400">Background</h3>
              <p className="text-gray-300 leading-relaxed">
                Full Stack Developer with hands-on experience in building scalable web applications.
                I focus on delivering high-quality products with clean, maintainable code. Currently
                pursuing a BS in Information Technologies at NPUA.
              </p>
            </div>

            <div className="bg-gray-800 p-6 rounded-xl hover:bg-gray-750 transition-all duration-300">
              <h3 className="text-2xl font-semibold mb-4 text-blue-400">Approach</h3>
              <p className="text-gray-300 leading-relaxed">
                Curious and proactive, I love taking ownership of tasks while collaborating in teams.
                Passionate about solving real-world problems through technology and leveraging AI-assisted
                development tools to boost productivity.
              </p>
            </div>
          </div>

          <div className="mt-12 bg-gradient-to-r from-gray-800 to-gray-850 p-8 rounded-xl fade-in">
            <h3 className="text-2xl font-semibold mb-6 text-center">Experience</h3>
            <div className="space-y-6">
              {experience.map((exp, index) => (
                <div key={index} className="border-l-4 border-violet-500 pl-6">
                  <h4 className="text-xl font-semibold text-white">{exp.role}</h4>
                  <p className="text-violet-400 mb-2">{exp.company} • {exp.period}</p>
                  <ul className="text-gray-300 space-y-1">
                    {exp.highlights.map((highlight, i) => (
                      <li key={i}>• {highlight}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-gray-850">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-4xl font-bold mb-12 text-center fade-in">
            Skills & <span className="bg-gradient-to-r from-violet-500 to-blue-500 bg-clip-text text-transparent">Technologies</span>
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="skill-card bg-gray-800 p-6 rounded-xl transition-all duration-300 fade-in">
              <h3 className="text-xl font-semibold mb-4 text-violet-400">Frontend</h3>
              <div className="flex flex-wrap gap-2">
                {skills.frontend.map(skill => (
                  <span key={skill} className="px-3 py-1 bg-gray-900 text-gray-300 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="skill-card bg-gray-800 p-6 rounded-xl transition-all duration-300 fade-in">
              <h3 className="text-xl font-semibold mb-4 text-blue-400">Backend</h3>
              <div className="flex flex-wrap gap-2">
                {skills.backend.map(skill => (
                  <span key={skill} className="px-3 py-1 bg-gray-900 text-gray-300 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="skill-card bg-gray-800 p-6 rounded-xl transition-all duration-300 fade-in">
              <h3 className="text-xl font-semibold mb-4 text-green-400">Tools & DevOps</h3>
              <div className="flex flex-wrap gap-2">
                {skills.tools.map(skill => (
                  <span key={skill} className="px-3 py-1 bg-gray-900 text-gray-300 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="skill-card bg-gray-800 p-6 rounded-xl transition-all duration-300 fade-in">
              <h3 className="text-xl font-semibold mb-4 text-purple-400">AI Tools</h3>
              <div className="flex flex-wrap gap-2">
                {skills.ai.map(skill => (
                  <span key={skill} className="px-3 py-1 bg-gray-900 text-gray-300 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-4xl font-bold mb-12 text-center fade-in">
            Featured <span className="bg-gradient-to-r from-violet-500 to-blue-500 bg-clip-text text-transparent">Projects</span>
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="project-card bg-gray-800 rounded-xl overflow-hidden transition-all duration-300 fade-in">
                <div className="p-6">
                  <h3 className="text-2xl font-semibold mb-3 text-white">{project.title}</h3>
                  <p className="text-gray-400 mb-4 leading-relaxed">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map(tech => (
                      <span key={tech} className="px-3 py-1 bg-violet-900/30 text-violet-300 rounded-full text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <Github size={20} />
                    <span>View on GitHub</span>
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-850">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-4xl font-bold mb-12 text-center fade-in">
            Get In <span className="bg-gradient-to-r from-violet-500 to-blue-500 bg-clip-text text-transparent">Touch</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8 fade-in">
            <div className="bg-gray-800 p-8 rounded-xl hover:bg-gray-750 transition-all duration-300">
              <h3 className="text-2xl font-semibold mb-6 text-violet-400">Let's Connect</h3>
              <p className="text-gray-300 mb-6">
                I'm always interested in hearing about new opportunities, collaborations, or just having a chat about technology.
              </p>

              <div className="space-y-4">
                <a href="mailto:harutyunyanqnarik2@gmail.com" className="flex items-center space-x-3 text-gray-300 hover:text-violet-400 transition-colors">
                  <Mail size={20} />
                  <span>harutyunyanqnarik2@gmail.com</span>
                </a>

                <div className="flex items-center space-x-3 text-gray-300">
                  <MapPin size={20} />
                  <span>Yerevan, Armenia</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-violet-600 to-blue-600 p-8 rounded-xl text-white">
              <h3 className="text-2xl font-semibold mb-6">Quick Links</h3>

              <div className="space-y-4">
                <a
                  href="https://github.com/knarhar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-300"
                >
                  <div className="flex items-center space-x-3">
                    <Github size={24} />
                    <span className="font-semibold">GitHub</span>
                  </div>
                  <ExternalLink size={20} />
                </a>

                <a
                  href="https://www.linkedin.com/in/knarik-harutyunyan-61a7a1273/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-300"
                >
                  <div className="flex items-center space-x-3">
                    <Linkedin size={24} />
                    <span className="font-semibold">LinkedIn</span>
                  </div>
                  <ExternalLink size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-900 border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center text-gray-400">
          <p>© 2025 Knarik Harutyunyan. Built with React & Tailwind CSS.</p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;