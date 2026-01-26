import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Avatar3D from "./Avatar3D"; // Imported the 3D Component

export default function PortfolioWithAvatar() {
  // Navigation State
  const [avatarX, setAvatarX] = useState(0);
  const [avatarSection, setAvatarSection] = useState("home");
  const avatarRef = useRef(null);
  const containerRef = useRef(null);

  // Define where the avatar moves for each section (percentages)
  const sectionPositions = {
    home: 8,
    about: 30,
    experience: 54,
    projects: 78,
    contact: 92,
  };

  useEffect(() => {
    const target = sectionPositions[avatarSection] ?? 8;
    setAvatarX(target);
  }, [avatarSection]);

  function handleSectionClick(section) {
    setAvatarSection(section);
    const element = document.getElementById(section);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 text-slate-900 font-sans selection:bg-indigo-100">
      {/* Top Navigation */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-600 to-violet-500 flex items-center justify-center text-white font-bold shadow-sm">
              SA
            </div>
            <div>
              <div className="text-lg font-bold text-slate-800 leading-tight">Sreenath A B</div>
              <div className="text-xs text-slate-500 font-medium">Ops & Project Management Professional</div>
            </div>
          </div>
          <nav className="hidden md:flex gap-1 items-center bg-slate-50 p-1 rounded-lg border border-slate-200/50">
            {['home','about','experience','projects','contact'].map(s => (
              <button
                key={s}
                onClick={() => handleSectionClick(s)}
                className={`text-sm px-4 py-1.5 rounded-md transition-all ${avatarSection === s ? 'bg-white text-indigo-600 shadow-sm font-semibold' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/50'}`}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </nav>
          <a href="#contact" onClick={() => handleSectionClick("contact")} className="ml-2 inline-flex items-center justify-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm shadow-indigo-200">
            Contact Me
          </a>
        </div>
      </header>

      <main ref={containerRef} className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-8">
        
        {/* HERO / AVATAR STAGE */}
        {/* Fixed Section Structure */}
        <section id="home" className="relative bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-6 sm:p-10 overflow-hidden border border-slate-100">
          
          {/* Avatar Track Area */}
          <div className="relative h-48 flex items-end mb-8 bg-slate-50 rounded-2xl border border-slate-100/50">
            {/* Track Line */}
            <div className="absolute inset-x-10 bottom-0 h-1 bg-slate-200 rounded-full">
              {Object.keys(sectionPositions).map((sec) => (
                <div
                  key={sec}
                  style={{ left: `${sectionPositions[sec]}%` }}
                  className="absolute -top-1.5 w-4 h-4 rounded-full bg-white border-4 border-slate-300 transform -translate-x-1/2 z-10"
                />
              ))}
            </div>

            {/* Moving 3D Avatar */}
            <motion.div
              ref={avatarRef}
              className="absolute -bottom-5 w-40 h-40 z-20 filter drop-shadow-2xl"
              animate={{ left: `${avatarX}%` }}
              transition={{ type: "spring", stiffness: 90, damping: 16, mass: 1.2 }}
              style={{ x: "-50%" }}
            >
              <Avatar3D /> 
            </motion.div>
            
            <div className="absolute top-4 left-4 text-xs font-mono text-slate-400 bg-white px-2 py-1 rounded border border-slate-100">
               Interactive Zone: Click sections to move me
            </div>
          </div>

          {/* Text Content Area */}
          <div className="mt-12 space-y-6">
             <div>
                <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
                  Hi — I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Sreenath</span>
                </h1>
                <p className="mt-4 text-lg text-slate-600 leading-relaxed max-w-3xl">
                  Operations and Project Management professional with 8+ years of experience delivering scalable solutions. Currently leading a 45+ member team at Opendoor to drive workflow automation and efficiency.
                </p>
             </div>

             <div className="flex flex-wrap gap-3">
                <StatusBadge icon="📍" label="Location" value="Chennai, India" />
                <StatusBadge icon="💼" label="Role" value="Team Manager @ Opendoor" />
                <StatusBadge icon="🎓" label="Education" value="MCA, Vels University" />
             </div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about">
          <ContentCard title="Summary & Skills" onVisit={() => handleSectionClick("about")}>
            <div className="prose prose-slate max-w-none text-slate-600">
              <p className="mb-4">
                Google-certified in Project Management, with a leadership style rooted in ownership, accountability, and measurable outcomes. Skilled in cross-functional collaboration, data-backed decision-making, and developing high-performance teams that consistently exceed expectations.
              </p>
              <p>
                Currently expanding expertise in Generative AI, prompt design, and intelligent process automation to future-proof operational strategies and enhance business transformation.
              </p>
            </div>
            
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
               <div>
                 <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">Hard Skills</h3>
                 <div className="flex flex-wrap gap-2">
                   {["Operational Excellence", "Project Management", "Process Control", "Workflow Automation", "AI Tools"].map(skill => (
                     <span key={skill} className="px-3 py-1 bg-indigo-50 text-indigo-700 text-sm rounded-full font-medium border border-indigo-100">{skill}</span>
                   ))}
                 </div>
               </div>
               <div>
                 <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">Soft Skills</h3>
                 <div className="flex flex-wrap gap-2">
                   {["Leadership", "Communication", "Team Collaboration", "Problem Solving", "Adaptability"].map(skill => (
                     <span key={skill} className="px-3 py-1 bg-emerald-50 text-emerald-700 text-sm rounded-full font-medium border border-emerald-100">{skill}</span>
                   ))}
                 </div>
               </div>
            </div>
          </ContentCard>
        </section>

        {/* EXPERIENCE SECTION */}
        <section id="experience">
          <ContentCard title="Professional Experience" onVisit={() => handleSectionClick("experience")}>
            <div className="space-y-8">
              <JobItem 
                role="Team Manager" 
                company="Opendoor" 
                period="11/2023 - Present"
                location="Chennai"
                description={[
                  "Directed a team of 45+ professionals for support and document validation.",
                  "Increased productivity by 30% and improved quality by 25% through strategic automation.",
                  "Partnered with US stakeholders for operational expansion.",
                  "Boosted reporting accuracy by 70% using AI-driven dashboards."
                ]}
              />
              <JobItem 
                role="Subject Matter Expert" 
                company="Opendoor" 
                period="03/2022 - 11/2023"
                location="Chennai"
                description={[
                  "Optimized workflows via automation and enhanced Standard Operating Procedures (SOPs).",
                  "Maintained high-quality standards with multi-layer checks.",
                  "Developed comprehensive training modules for process migration."
                ]}
              />
              <JobItem 
                role="Senior Customer Associate" 
                company="Allsec Technologies" 
                period="03/2017 - 02/2021"
                location="Chennai"
                description={[
                  "Managed complex workflow queues and performance metrics.",
                  "Supported automation initiatives for process streamlining.",
                  "Delivered training aligning team productivity with business goals."
                ]}
              />
            </div>
            
            {/* Education Subsection */}
            <div className="mt-10 pt-8 border-t border-slate-100">
              <h3 className="text-lg font-bold text-slate-800 mb-4">Education</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                  <div className="font-semibold text-slate-900">Master of Computer Applications (MCA)</div>
                  <div className="text-sm text-slate-500 mt-1">Vels University • 2014 - 2016</div>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                  <div className="font-semibold text-slate-900">Bachelor of Computer Applications (BCA)</div>
                  <div className="text-sm text-slate-500 mt-1">Alpha Arts & Science College • 2010 - 2013</div>
                </div>
              </div>
            </div>
          </ContentCard>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects">
          <ContentCard title="Key Achievements & Projects" onVisit={() => handleSectionClick("projects")}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <ProjectCard 
                title="AI Reporting Dashboards" 
                tag="Automation" 
                desc="Implemented AI-driven dashboards that boosted reporting accuracy by 70%, providing real-time visibility into team performance." 
              />
              <ProjectCard 
                title="Productivity Overhaul" 
                tag="Operations" 
                desc="Led a strategic initiative that increased team productivity by 30% and improved quality scores by 25% across 45+ members." 
              />
              <ProjectCard 
                title="Migration Training Modules" 
                tag="L&D" 
                desc="Developed and deployed comprehensive training modules that facilitated smooth process migration and standardized SOPs." 
              />
              <ProjectCard 
                title="Workflow Automation" 
                tag="Process" 
                desc="Partnered with engineering to automate repetitive document validation tasks, significantly reducing manual turnaround time." 
              />
            </div>
          </ContentCard>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="pb-10">
          <ContentCard title="Get In Touch" onVisit={() => handleSectionClick("contact")}>
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <p className="text-slate-600 mb-6 max-w-lg">
                  I am currently open to opportunities in Operations, Project Management, and Process Excellence. Feel free to reach out via email or connect on LinkedIn.
                </p>
                <div className="space-y-3">
                  <a href="mailto:absreenath212436@gmail.com" className="flex items-center gap-3 text-indigo-600 font-medium hover:underline">
                    <span className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center">✉️</span>
                    absreenath212436@gmail.com
                  </a>
                  <a href="https://www.linkedin.com/in/sreenathab/" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-indigo-600 font-medium hover:underline">
                    <span className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center">🔗</span>
                    linkedin.com/in/sreenathab
                  </a>
                </div>
              </div>
              <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 text-center">
                 <div className="text-sm text-slate-500 mb-2">Based in</div>
                 <div className="font-bold text-slate-800 text-lg">Chennai, India</div>
                 <div className="text-xs text-slate-400 mt-1">Open to Remote & Hybrid</div>
              </div>
            </div>
          </ContentCard>
        </section>

      </main>

      <footer className="bg-white border-t border-slate-200 py-8 mt-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="text-slate-900 font-bold mb-2">Sreenath A B</div>
          <div className="text-sm text-slate-500">
             © {new Date().getFullYear()} • Built with React, Tailwind & Framer Motion
          </div>
        </div>
      </footer>
    </div>
  );
}

// --- Subcomponents ---

function ContentCard({ title, children, onVisit }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
        <h2 className="text-xl font-bold text-slate-800">{title}</h2>
        <button onClick={onVisit} className="text-xs font-medium px-3 py-1.5 bg-white border border-slate-200 rounded-full hover:bg-indigo-50 hover:text-indigo-600 transition-colors shadow-sm">
          👇 Bring Avatar Here
        </button>
      </div>
      <div className="p-6 sm:p-8">
        {children}
      </div>
    </div>
  );
}

function StatusBadge({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 bg-white rounded-xl border border-slate-200 shadow-sm">
      <div className="text-xl">{icon}</div>
      <div>
        <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">{label}</div>
        <div className="text-sm font-semibold text-slate-800">{value}</div>
      </div>
    </div>
  );
}

function JobItem({ role, company, period, location, description }) {
  return (
    <div className="relative pl-6 sm:pl-0">
      <div className="hidden sm:block absolute left-0 top-0 bottom-0 w-px bg-slate-200 transform translate-x-3"></div>
      <div className="sm:flex gap-6 relative">
        <div className="hidden sm:flex flex-col items-center">
            <div className="w-6 h-6 rounded-full bg-indigo-100 border-2 border-indigo-500 z-10"></div>
        </div>
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
            <div>
              <h3 className="text-lg font-bold text-slate-900">{role}</h3>
              <div className="text-sm font-medium text-indigo-600">{company}</div>
            </div>
            <div className="text-xs font-mono text-slate-500 bg-slate-100 px-2 py-1 rounded self-start sm:self-center mt-1 sm:mt-0">
              {period} • {location}
            </div>
          </div>
          <ul className="list-disc list-outside ml-4 text-slate-600 text-sm space-y-1.5 marker:text-indigo-300">
            {description.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ title, desc, tag }) {
  return (
    <div className="p-5 rounded-xl bg-slate-50 border border-slate-100 hover:border-indigo-200 transition-colors group">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-bold text-slate-800 group-hover:text-indigo-700 transition-colors">{title}</h3>
        <span className="text-[10px] font-bold px-2 py-0.5 bg-white border border-slate-200 rounded text-slate-500 uppercase">{tag}</span>
      </div>
      <p className="text-sm text-slate-600 leading-relaxed">{desc}</p>
    </div>
  );
}
