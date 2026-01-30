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

  useEffect(() => {
    const target = sectionPositions[avatarSection] ?? 8;
    controls.start({
      left: `${target}%`,
      transition: { type: "spring", stiffness: 70, damping: 22 },
    });
  }, [avatarSection, controls]);

  function handleSectionClick(section) {
    setAvatarSection(section);
    const element = document.getElementById(section);
    if (element) {
      const yOffset = -420;
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }

  const handleDragEnd = (event, info) => {
    if (!trackRef.current) return;
    const trackWidth = trackRef.current.offsetWidth;
    const rect = trackRef.current.getBoundingClientRect();
    const x = info.point.x - rect.left;
    const dropPercent = (x / trackWidth) * 100;

    let closest = "home";
    let minDiff = 999;
    Object.keys(sectionPositions).forEach((k) => {
      const diff = Math.abs(dropPercent - sectionPositions[k]);
      if (diff < minDiff) {
        minDiff = diff;
        closest = k;
      }
    });
    handleSectionClick(closest);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 text-slate-900 font-sans">
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">
              SA
            </div>
            <div>
              <div className="font-bold text-slate-800">Sreenath A B</div>
              <div className="text-[11px] uppercase tracking-wider text-slate-500">
                AI-Driven Operations & Project Management
              </div>
            </div>
          </div>

          <nav className="flex gap-1 bg-slate-100 p-1 rounded-lg">
            {Object.keys(sectionPositions).map((s) => (
              <button
                key={s}
                onClick={() => handleSectionClick(s)}
                className={`px-3 py-1.5 text-xs md:text-sm rounded-md transition ${
                  avatarSection === s
                    ? "bg-white text-indigo-600 shadow font-semibold"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {s.toUpperCase()}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* AVATAR TRACK */}
      <div className="sticky top-[64px] z-40 bg-white/70 backdrop-blur border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div
            ref={trackRef}
            className="relative h-48 rounded-2xl bg-slate-100 border border-slate-200 overflow-hidden"
          >
            <div className="absolute inset-x-12 bottom-10 h-1 bg-slate-300 rounded-full">
              {Object.keys(sectionPositions).map((sec) => (
                <div
                  key={sec}
                  onClick={() => handleSectionClick(sec)}
                  style={{ left: `${sectionPositions[sec]}%` }}
                  className={`absolute -top-1.5 w-4 h-4 rounded-full border-4 -translate-x-1/2 cursor-pointer transition ${
                    avatarSection === sec
                      ? "bg-indigo-600 border-indigo-200 scale-125"
                      : "bg-white border-slate-300"
                  }`}
                />
              ))}
            </div>

            <motion.div
              className="absolute bottom-10 w-28 h-28 cursor-grab"
              animate={controls}
              drag="x"
              dragConstraints={trackRef}
              dragElastic={0.05}
              dragMomentum={false}
              onDragEnd={handleDragEnd}
              style={{ x: "-50%" }}
            >
              {Object.keys(sectionPositions).map((sec) => (
                <video
                  key={sec}
                  src={`${import.meta.env.BASE_URL}${sec}.mp4`}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className={`absolute inset-0 w-full h-full object-contain transition-opacity ${
                    avatarSection === sec ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <main className="max-w-5xl mx-auto px-6 py-14 space-y-20">
        {/* HOME */}
        <section id="home">
          <h1 className="text-4xl md:text-5xl font-extrabold">
            AI-Driven <span className="text-indigo-600">Operations Leader</span>
          </h1>
          <p className="mt-6 text-lg text-slate-600 max-w-3xl">
            AI-driven Operations and Project Management professional with
            expertise in automation, intelligent workflows, and digital
            transformation. Proven experience embedding Generative AI, RAG
            systems, and agentic automation to improve productivity, quality, and
            decision-making while retaining human-in-the-loop governance.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Chip text="📍 Chennai, India" />
            <Chip text="💼 Team Manager @ Opendoor" />
            <Chip text="🤖 AI Automation & Agentic Systems" />
          </div>
        </section>

        {/* ABOUT */}
        <section id="about">
          <SectionCard title="Summary & Skills">
            <p className="text-slate-600 max-w-4xl">
              Google-certified Project Management professional with strong
              expertise in AI-driven automation, end-to-end process
              transformation, and data-backed decision-making. Skilled in
              Generative AI, RAG and agentic systems, human-in-the-loop workflows,
              and AI-powered analytics.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <SkillBlock
                title="AI & Automation"
                items={[
                  "Generative AI (LLMs, Prompt Engineering)",
                  "RAG Systems & Agentic AI",
                  "Workflow Automation Platforms",
                  "AI Analytics, BI & Reporting Dashboards",
                ]}
                color="indigo"
              />
              <SkillBlock
                title="Operations & Program Management"
                items={[
                  "Operations Strategy & Execution",
                  "End-to-End Process Transformation",
                  "Value Stream Mapping",
                  "Transition & Change Management",
                  "Cross-Functional & Global Stakeholder Management",
                ]}
                color="emerald"
              />
            </div>
          </SectionCard>
        </section>

        {/* EXPERIENCE */}
        <section id="experience">
          <SectionCard title="Professional Experience">
            <ExperienceItem
              role="Team Manager"
              company="Opendoor"
              period="Nov 2023 – Present"
              bullets={[
                "Led a 45+ member team managing customer feedback, support, and document validation operations",
                "Converted end-to-end manual workflows into AI-automated, agent-driven processes, achieving 30% productivity gain and 25% quality improvement",
                "Embedded Generative AI and AI agents for triage, analysis, and reporting with human-in-the-loop controls",
                "Partnered with US stakeholders to scale AI-enabled initiatives",
                "Improved reporting accuracy by 70% through AI-powered dashboards",
              ]}
            />

            <ExperienceItem
              role="Subject Matter Expert"
              company="Opendoor"
              period="Mar 2022 – Nov 2023"
              bullets={[
                "Optimized workflows through automation and SOP enhancements",
                "Ensured quality compliance via layered quality checks",
                "Developed training modules for new process migrations",
              ]}
            />

            <ExperienceItem
              role="Senior Associate"
              company="Allsec Technologies"
              period="Mar 2017 – Feb 2021"
              bullets={[
                "Managed workflow queues and performance metrics for international clients",
                "Supported automation initiatives to improve resolution accuracy",
                "Delivered training aligned with productivity goals",
              ]}
            />
          </SectionCard>
        </section>

        {/* PROJECTS */}
        <section id="projects">
          <SectionCard title="Key Achievements">
            <div className="grid md:grid-cols-2 gap-6">
              <AchievementCard
                title="Manual Operations → AI Agent Workflows"
                desc="Transitioned routine manual processes into AI agents with human-in-the-loop governance for critical decisions."
              />
              <AchievementCard
                title="Process Optimization & Capacity Modeling"
                desc="Improved team efficiency and engagement by 80% using data-backed capacity planning."
              />
            </div>
          </SectionCard>
        </section>

        {/* CONTACT */}
        <section id="contact">
          <SectionCard title="Contact">
            <div className="flex flex-col md:flex-row gap-8 justify-between">
              <div className="space-y-2">
                <p>📞 +91 9940296659</p>
                <a
                  href="mailto:absreenath212436@gmail.com"
                  className="text-indigo-600 font-semibold hover:underline"
                >
                  absreenath212436@gmail.com
                </a>
                <a
                  href="https://www.linkedin.com/in/sreenath-ab"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 font-semibold hover:underline"
                >
                  linkedin.com/in/sreenath-ab
                </a>
              </div>
              <div className="p-6 bg-slate-100 rounded-xl text-center">
                <div className="text-xs text-slate-500">Location</div>
                <div className="font-bold">Chennai, India</div>
              </div>
            </div>
          </SectionCard>
        </section>
      </main>
    </div>
  );
}

/* ---------- UI COMPONENTS ---------- */

const Chip = ({ text }) => (
  <span className="px-4 py-2 bg-white border border-slate-200 rounded-full text-sm shadow-sm">
    {text}
  </span>
);

const SectionCard = ({ title, children }) => (
  <div className="bg-white rounded-2xl shadow border border-slate-200 p-8">
    <h2 className="text-2xl font-bold mb-6">{title}</h2>
    {children}
  </div>
);

const SkillBlock = ({ title, items, color }) => (
  <div
    className={`rounded-xl p-5 border bg-${color}-50 border-${color}-100`}
  >
    <h4 className={`font-bold text-${color}-700 mb-3`}>{title}</h4>
    <ul className="space-y-1 text-sm">
      {items.map((i) => (
        <li key={i}>• {i}</li>
      ))}
    </ul>
  </div>
);

const ExperienceItem = ({ role, company, period, bullets }) => (
  <div className="border-l-4 border-indigo-200 pl-5 py-3 mb-6">
    <div className="flex justify-between items-center">
      <h3 className="font-bold text-lg">{role}</h3>
      <span className="text-xs text-slate-400 font-mono">{period}</span>
    </div>
    <div className="text-indigo-600 font-medium">{company}</div>
    <ul className="mt-2 space-y-1 text-sm text-slate-600 list-disc list-inside">
      {bullets.map((b) => (
        <li key={b}>{b}</li>
      ))}
    </ul>
  </div>
);

const AchievementCard = ({ title, desc }) => (
  <div className="p-6 border border-slate-200 rounded-xl hover:border-indigo-300 transition">
    <h4 className="font-bold mb-2">{title}</h4>
    <p className="text-sm text-slate-600">{desc}</p>
  </div>
);
