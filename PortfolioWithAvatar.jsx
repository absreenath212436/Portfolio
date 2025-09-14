import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function PortfolioWithAvatar() {
  const [skinTone, setSkinTone] = useState("#f2d6c9");
  const [hairColor, setHairColor] = useState("#2b2b2b");
  const [hasBeard, setHasBeard] = useState(false);
  const [hasGlasses, setHasGlasses] = useState(false);
  const [avatarX, setAvatarX] = useState(0);
  const [avatarSection, setAvatarSection] = useState("home");
  const [uploadedPhoto, setUploadedPhoto] = useState(null);
  const avatarRef = useRef(null);
  const containerRef = useRef(null);

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

  useEffect(() => {
    const handleMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const tilt = (x - 0.5) * 20;
      if (avatarRef.current) {
        avatarRef.current.style.setProperty("--head-tilt", `${tilt}deg`);
      }
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  function handleSectionClick(section) {
    setAvatarSection(section);
  }

  function handlePhotoUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setUploadedPhoto(ev.target.result);
    reader.readAsDataURL(file);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 text-slate-900 font-sans">
      {/* Top nav */}
      <header className="sticky top-0 z-30 bg-white/60 backdrop-blur-sm border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-rose-400 flex items-center justify-center text-white font-bold">SN</div>
            <div>
              <div className="text-lg font-semibold">Your Name</div>
              <div className="text-xs text-slate-500">Product / Process / Ops • Senior Process Manager</div>
            </div>
          </div>
          <nav className="flex gap-3 items-center">
            {['home','about','experience','projects','contact'].map(s => (
              <button
                key={s}
                onClick={() => handleSectionClick(s)}
                className="text-sm px-3 py-2 hover:bg-slate-100 rounded-md"
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
            <a href="#contact" className="ml-2 inline-block px-3 py-2 bg-indigo-600 text-white rounded-md text-sm">Hire me</a>
          </nav>
        </div>
      </header>

      <main ref={containerRef} className="max-w-6xl mx-auto px-6 py-10">
        <section className="relative bg-white rounded-2xl shadow-md p-6 overflow-hidden">
          <div className="relative h-40 flex items-end">
            <div className="absolute left-0 right-0 top-0 bottom-0 pointer-events-none">
              <div className="absolute left-2 top-2 text-xs text-slate-400">Click any section above to send avatar there</div>
            </div>

            <div className="absolute inset-x-4 bottom-0 h-0.5 bg-slate-100">
              {Object.keys(sectionPositions).map((sec) => (
                <div
                  key={sec}
                  style={{ left: `${sectionPositions[sec]}%` }}
                  className="absolute -top-1 w-2 h-2 rounded-full bg-slate-300 transform -translate-x-1/2"
                />
              ))}
            </div>

            <motion.div
              ref={avatarRef}
              className="absolute -bottom-6 w-36 h-36 rounded-full flex items-center justify-center"
              animate={{ left: `${avatarX}%` }}
              transition={{ type: "spring", stiffness: 120, damping: 18 }}
            >
              <AvatarSVG
                skinTone={skinTone}
                hairColor={hairColor}
                hasBeard={hasBeard}
                hasGlasses={hasGlasses}
                uploadedPhoto={uploadedPhoto}
              />
            </motion.div>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-2">
              <h1 className="text-3xl font-extrabold">Hi — I'm Your Name</h1>
              <p className="mt-3 text-slate-600">
                A Senior Process Manager with 8 years of experience in product operations and process excellence. Click sections above to explore — the avatar will move with you.
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="p-4 rounded-lg bg-slate-50 border border-slate-100">
                  <div className="text-xs text-slate-500">Location</div>
                  <div className="font-medium">Bengaluru, India</div>
                </div>
                <div className="p-4 rounded-lg bg-slate-50 border border-slate-100">
                  <div className="text-xs text-slate-500">Availability</div>
                  <div className="font-medium">Open to opportunities</div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white border border-slate-100">
              <div className="text-sm font-semibold mb-2">Customize avatar</div>
              <label className="text-xs">Skin tone</label>
              <input
                type="color"
                value={skinTone}
                onChange={(e) => setSkinTone(e.target.value)}
                className="w-full h-10 rounded-md my-2"
              />
              <label className="text-xs">Hair color</label>
              <input
                type="color"
                value={hairColor}
                onChange={(e) => setHairColor(e.target.value)}
                className="w-full h-10 rounded-md my-2"
              />
              <div className="flex gap-2 mt-2">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={hasGlasses}
                    onChange={(e) => setHasGlasses(e.target.checked)}
                  />{" "}
                  Glasses
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={hasBeard}
                    onChange={(e) => setHasBeard(e.target.checked)}
                  />{" "}
                  Beard
                </label>
              </div>

              <div className="mt-3 text-xs text-slate-500">Or upload a photo (preview shown):</div>
              <input type="file" accept="image/*" onChange={handlePhotoUpload} className="mt-2" />
              {uploadedPhoto && (
                <img
                  src={uploadedPhoto}
                  alt="uploaded preview"
                  className="mt-2 w-full h-24 object-cover rounded-md border"
                />
              )}
            </div>
          </div>
        </section>

        <section id="about" className="mt-8">
          <ContentCard title="About" onVisit={() => handleSectionClick("about")}>
            <p>
              I specialise in operationalising complex processes, building scalable playbooks and driving outcome-oriented execution across cross-functional
              teams.
            </p>
          </ContentCard>
        </section>

        <section id="experience" className="mt-6">
          <ContentCard title="Experience" onVisit={() => handleSectionClick("experience")}>
            <ExperienceList />
          </ContentCard>
        </section>

        <section id="projects" className="mt-6">
          <ContentCard title="Projects" onVisit={() => handleSectionClick("projects")}>
            <ProjectGrid />
          </ContentCard>
        </section>

        <section id="contact" className="mt-6 mb-12">
          <ContentCard title="Contact" onVisit={() => handleSectionClick("contact")}>
            <p>
              Interested in working together? Reach out at{" "}
              <a href="mailto:youremail@example.com" className="text-indigo-600">
                youremail@example.com
              </a>
            </p>
          </ContentCard>
        </section>
      </main>

      <footer className="border-t border-slate-100 py-6">
        <div className="max-w-6xl mx-auto px-6 text-sm text-slate-500">© {new Date().getFullYear()} Your Name — Built with ❤️</div>
      </footer>
    </div>
  );
}

function ContentCard({ title, children, onVisit }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-100">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-semibold">{title}</h2>
        </div>
        <div>
          <button onClick={onVisit} className="text-sm px-3 py-2 bg-slate-50 rounded-md border">
            Bring avatar
          </button>
        </div>
      </div>
      <div className="mt-4 text-slate-700">{children}</div>
    </div>
  );
}

function ExperienceList() {
  const experiences = [
    {
      role: "Senior Process Manager",
      company: "eClerx (applied)",
      period: "2025 - Present",
      bullets: ["Led process optimization for Ops", "Built playbooks used across squads"],
    },
    {
      role: "Process Manager",
      company: "Opendoor",
      period: "2021 - 2024",
      bullets: ["Scaled QA automation", "Reduced turnaround time by 18%"],
    },
  ];
  return (
    <div className="space-y-4">
      {experiences.map((e, i) => (
        <div key={i} className="p-4 rounded-lg bg-slate-50 border border-slate-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold">{e.role}</div>
              <div className="text-xs text-slate-500">
                {e.company} • {e.period}
              </div>
            </div>
          </div>
          <ul className="mt-2 list-disc ml-5 text-sm text-slate-700">
            {e.bullets.map((b, idx) => (
              <li key={idx}>{b}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function ProjectGrid() {
  const projects = [
    { title: "Process Playbook Generator", desc: "A tool to generate standardized playbooks for cross-team use.", tag: "Ops" },
    { title: "Quality Dashboards", desc: "Realtime dashboards for SLA monitoring.", tag: "Analytics" },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {projects.map((p, i) => (
        <div key={i} className="p-4 bg-white border rounded-lg">
          <div className="font-semibold">{p.title}</div>
          <div className="text-xs text-slate-500">{p.tag}</div>
          <div className="mt-2 text-sm text-slate-700">{p.desc}</div>
        </div>
      ))}
    </div>
  );
}

function AvatarSVG({ skinTone, hairColor, hasBeard, hasGlasses, uploadedPhoto }) {
  if (uploadedPhoto) {
    return (
      <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-md" style={{ boxShadow: "0 6px 18px rgba(15,23,42,0.12)" }}>
        <img src={uploadedPhoto} alt="avatar" className="w-full h-full object-cover" />
      </div>
    );
  }

  return (
    <div className="w-32 h-32 relative" style={{ transform: "translateY(-6px)" }}>
      <svg viewBox="0 0 220 220" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="6" stdDeviation="12" floodOpacity="0.06" />
          </filter>
        </defs>

        <g style={{ transform: "translate(0,0)" }}>
          <circle cx="110" cy="100" r="70" fill={skinTone} filter="url(#soft)" />

          <path d="M40 85 C60 15, 160 15, 180 85 Q110 40, 40 85" fill={hairColor} />

          <g className="eye-group" transform="translate(0,0)">
            <ellipse cx="85" cy="105" rx="12" ry="9" fill="#fff" />
            <ellipse cx="85" cy="105" rx="4" ry="4" fill="#222" />
            <ellipse cx="135" cy="105" rx="12" ry="9" fill="#fff" />
            <ellipse cx="135" cy="105" rx="4" ry="4" fill="#222" />

            <motion.rect
              x="73"
              y="100"
              width="24"
              height="0"
              fill={skinTone}
              animate={{ height: [0, 18, 0] }}
              transition={{ repeat: Infinity, duration: 5, delay: 1 }}
            />
            <motion.rect
              x="123"
              y="100"
              width="24"
              height="0"
              fill={skinTone}
              animate={{ height: [0, 18, 0] }}
              transition={{ repeat: Infinity, duration: 5, delay: 1.2 }}
            />
          </g>

          <path d="M110 110 q4 12 0 18" stroke="#cfa" strokeWidth="3" fill="none" strokeLinecap="round" />

          <path d="M95 132 q15 12 30 0" stroke="#b35" strokeWidth="4" fill="none" strokeLinecap="round" />

          {hasBeard && <path d="M70 140 q40 30 80 0 q-10 20 -80 0" fill="#2b2b2b" opacity="0.9" />}

          {hasGlasses && (
            <g stroke="#333" strokeWidth="4" fill="none">
              <rect x="64" y="92" width="30" height="22" rx="6" />
              <rect x="126" y="92" width="30" height="22" rx="6" />
              <path d="M94 103 h32" />
            </g>
          )}

          <ellipse cx="82" cy="122" rx="8" ry="4" fill="#ffd6d0" opacity="0.35" />
          <ellipse cx="138" cy="122" rx="8" ry="4" fill="#ffd6d0" opacity="0.35" />
        </g>
      </svg>

      <div className="absolute left-1/2 -bottom-4 transform -translate-x-1/2 bg-white px-3 py-1 rounded-full text-xs shadow-md border">Your Name</div>
    </div>
  );
}
