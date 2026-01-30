import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";

export default function PortfolioWithAvatar() {
  const [avatarSection, setAvatarSection] = useState("home");
  const trackRef = useRef(null);
  const controls = useAnimation(); 

  const sectionPositions = {
    home: 8,
    about: 30,
    experience: 54,
    projects: 78,
    contact: 92,
  };

  // Move avatar when section changes
  useEffect(() => {
    const target = sectionPositions[avatarSection] ?? 8;
    controls.start({ 
      left: `${target}%`,
      transition: { type: "spring", stiffness: 60, damping: 25 }
    });
  }, [avatarSection, controls]);

  function handleSectionClick(section) {
    setAvatarSection(section);
    const element = document.getElementById(section);
    if (element) {
        // Offset for the sticky header and interaction zone
        const yOffset = -450; 
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }

  const handleDragEnd = (event, info) => {
    if (!trackRef.current) return;
    const trackWidth = trackRef.current.offsetWidth;
    const rect = trackRef.current.getBoundingClientRect();
    const x = info.point.x - rect.left;
    const dropPercent = (x / trackWidth) * 100;

    let closestSection = "home";
    let minDiff = 1000;

    Object.keys(sectionPositions).forEach((key) => {
      const diff = Math.abs(dropPercent - sectionPositions[key]);
      if (diff < minDiff) {
        minDiff = diff;
        closestSection = key;
      }
    });
    handleSectionClick(closestSection);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100">
      
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">SA</div>
            <div className="hidden sm:block">
              <div className="text-lg font-bold text-slate-800 leading-tight">Sreenath A B</div>
              <div className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">Project Management</div>
            </div>
          </div>
          <nav className="flex gap-1 items-center bg-slate-100 p-1 rounded-lg">
            {Object.keys(sectionPositions).map(s => (
              <button
                key={s}
                onClick={() => handleSectionClick(s)}
                className={`text-xs md:text-sm px-3 py-1.5 rounded-md transition-all ${avatarSection === s ? 'bg-white text-indigo-600 shadow-sm font-semibold' : 'text-slate-500 hover:text-slate-800'}`}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* STICKY INTERACTIVE SECTION */}
      <div className="sticky top-[65px] z-40 bg-slate-50/80 backdrop-blur-sm pb-4 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 pt-6">
          <section className="relative bg-white rounded-2xl shadow-lg p-4 border border-slate-200">
            <div ref={trackRef} className="relative h-48 flex items-end bg-slate-50 rounded-xl overflow-hidden border border-slate-100">
              
              {/* Track Line */}
              <div className="absolute inset-x-10 bottom-8 h-1 bg-slate-200 rounded-full">
                {Object.keys(sectionPositions).map((sec) => (
                  <div
                    key={sec}
                    onClick={() => handleSectionClick(sec)}
                    style={{ left: `${sectionPositions[sec]}%` }}
                    className={`absolute -top-1.5 w-4 h-4 rounded-full border-4 transform -translate-x-1/2 z-10 cursor-pointer transition-all ${avatarSection === sec ? 'bg-indigo-600 border-indigo-200 scale-125' : 'bg-white border-slate-300'}`}
                  />
                ))}
              </div>

              {/* Avatar Container */}
              <motion.div
                className="absolute bottom-8 w-32 h-32 z-20 cursor-grab active:cursor-grabbing"
                animate={controls}
                drag="x" 
                dragConstraints={trackRef}
                dragElastic={0.05}
                dragMomentum={false}
                onDragEnd={handleDragEnd}
                style={{ x: "-50%" }}
              >
                 <div className="relative w-full h-full">
                   {Object.keys(sectionPositions).map((sec) => (
                     <video 
                       key={sec}
                       src={`${import.meta.env.BASE_URL}${sec}.mp4`}
                       autoPlay loop muted playsInline
                       className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-300 ${avatarSection === sec ? 'opacity-100' : 'opacity-0'}`}
                     />
                   ))}
                 </div>
              </motion.div>
              <div className="absolute top-2 left-2 text-[10px] font-mono text-slate-400">Interactive Avatar Stage</div>
            </div>
          </section>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 py-10 space-y-12">
        
        {/* HOME / INTRO */}
        <section id="home" className="pt-20">
          <h1 className="text-4xl font-extrabold text-slate-900">
            Operations & <span className="text-indigo-600">Project Management</span>
          </h1>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">
            Operations professional with 8+ years of experience. Currently leading 45+ members at Opendoor, focusing on workflow automation and scaling business processes.
          </p>
          <div className="flex flex-wrap gap-4 mt-6">
            <span className="px-4 py-2 bg-white border border-slate-200 rounded-full text-sm font-medium shadow-sm">📍 Chennai, India</span>
            <span className="px-4 py-2 bg-white border border-slate-200 rounded-full text-sm font-medium shadow-sm">💼 Team Manager @ Opendoor</span>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about">
          <ContentCard title="Summary & Skills" sectionKey="about" onVisit={handleSectionClick}>
            <p className="text-slate-600 leading-relaxed">
              Google-certified in Project Management, skilled in cross-functional collaboration and data-backed decision-making. 
              Passionate about integrating Generative AI into operational workflows.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-4">
               <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100">
                 <h4 className="text-xs font-bold text-indigo-700 uppercase mb-2">Hard Skills</h4>
                 <div className="text-sm text-indigo-900 font-medium">Workflow Automation • AI Tools • Process Control</div>
               </div>
               <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                 <h4 className="text-xs font-bold text-emerald-700 uppercase mb-2">Soft Skills</h4>
                 <div className="text-sm text-emerald-900 font-medium">Leadership • Problem Solving • Adaptability</div>
               </div>
            </div>
          </ContentCard>
        </section>

        {/* EXPERIENCE */}
        <section id="experience">
          <ContentCard title="Professional Experience" sectionKey="experience" onVisit={handleSectionClick}>
            <div className="space-y-6">
              <JobItem role="Team Manager" company="Opendoor" period="2023 - Present" 
                desc="Managed 45+ pros, increased productivity by 30% via automation." />
              <JobItem role="Subject Matter Expert" company="Opendoor" period="2022 - 2023" 
                desc="Optimized workflows and developed training modules for migration." />
              <JobItem role="Senior Associate" company="Allsec" period="2017 - 2021" 
                desc="Managed workflow queues and performance metrics." />
            </div>
          </ContentCard>
        </section>

        {/* PROJECTS */}
        <section id="projects">
          <ContentCard title="Key Achievements" sectionKey="projects" onVisit={handleSectionClick}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 border border-slate-200 rounded-xl hover:border-indigo-300 transition-colors">
                <h4 className="font-bold text-slate-800">AI Dashboards</h4>
                <p className="text-sm text-slate-500">Boosted reporting accuracy by 70%.</p>
              </div>
              <div className="p-4 border border-slate-200 rounded-xl hover:border-indigo-300 transition-colors">
                <h4 className="font-bold text-slate-800">Process Automation</h4>
                <p className="text-sm text-slate-500">30% productivity increase across large teams.</p>
              </div>
            </div>
          </ContentCard>
        </section>

        {/* CONTACT */}
        <section id="contact" className="pb-40">
          <ContentCard title="Contact" sectionKey="contact" onVisit={handleSectionClick}>
            <div className="flex flex-col sm:flex-row gap-6 justify-between items-center">
              <div className="space-y-2">
                <p className="text-slate-600">Open to opportunities in Operations and AI Transformation.</p>
                <a href="mailto:absreenath212436@gmail.com" className="block text-indigo-600 font-bold hover:underline">absreenath212436@gmail.com</a>
              </div>
              <div className="text-center p-4 bg-slate-100 rounded-xl w-full sm:w-auto">
                <div className="text-xs text-slate-500">Location</div>
                <div className="font-bold">Chennai, India</div>
              </div>
            </div>
          </ContentCard>
        </section>
      </main>
    </div>
  );
}

// --- Subcomponents ---

function ContentCard({ title, children, sectionKey, onVisit }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <h2 className="text-lg font-bold text-slate-800">{title}</h2>
        <button 
          onClick={() => onVisit(sectionKey)} 
          className="text-[10px] font-bold px-3 py-1 bg-white border border-indigo-200 text-indigo-600 rounded-full hover:bg-indigo-600 hover:text-white transition-all uppercase tracking-tight"
        >
          View Section
        </button>
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  );
}

function JobItem({ role, company, period, desc }) {
  return (
    <div className="border-l-2 border-indigo-100 pl-4 py-1">
      <div className="flex justify-between items-start">
        <h3 className="font-bold text-slate-900">{role}</h3>
        <span className="text-[10px] font-mono text-slate-400">{period}</span>
      </div>
      <div className="text-sm text-indigo-600 font-medium mb-1">{company}</div>
      <p className="text-sm text-slate-600">{desc}</p>
    </div>
  );
}
