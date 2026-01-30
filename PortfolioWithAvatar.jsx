import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";

/* ---------------- CONFIG ---------------- */

const sectionPositions = {
  home: 8,
  about: 30,
  experience: 54,
  projects: 78,
  contact: 92,
};

/* ---------------- MAIN ---------------- */

export default function PortfolioWithAvatar() {
  const [avatarSection, setAvatarSection] = useState("home");
  const trackRef = useRef(null);
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      left: `${sectionPositions[avatarSection]}%`,
      transition: { type: "spring", stiffness: 70, damping: 22 },
    });
  }, [avatarSection, controls]);

  const scrollToSection = (id) => {
    setAvatarSection(id);
    const el = document.getElementById(id);
    if (!el) return;
    const yOffset = -420;
    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  const onDragEnd = (_, info) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const percent = ((info.point.x - rect.left) / rect.width) * 100;

    let closest = "home";
    let min = Infinity;
    Object.keys(sectionPositions).forEach((k) => {
      const diff = Math.abs(percent - sectionPositions[k]);
      if (diff < min) {
        min = diff;
        closest = k;
      }
    });
    scrollToSection(closest);
  };

  return (
    <div className="min-h-screen font-sans bg-gradient-to-br from-slate-50 via-white to-indigo-50 text-slate-900 overflow-x-hidden">

      {/* ---------- HEADER ---------- */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">
              SA
            </div>
            <div>
              <div className="font-heading font-bold">Sreenath A B</div>
              <div className="text-[11px] uppercase tracking-wider text-slate-500">
                AI-Driven Operations & Project Management
              </div>
            </div>
          </div>

          <nav className="flex gap-1 bg-slate-100 p-1 rounded-lg">
            {Object.keys(sectionPositions).map((s) => (
              <button
                key={s}
                onClick={() => scrollToSection(s)}
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

      {/* ---------- AVATAR TRACK ---------- */}
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
                  onClick={() => scrollToSection(sec)}
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
              dragMomentum={false}
              dragElastic={0.05}
              onDragEnd={onDragEnd}
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
                  className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-300 ${
                    avatarSection === sec ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* ---------- CONTENT ---------- */}
      <main className="max-w-5xl mx-auto px-6 py-16 space-y-28">

        {/* HOME */}
        <Section id="home" bg="ai">
          <h1 className="font-heading text-5xl md:text-6xl font-extrabold tracking-tight">
            AI-Driven <span className="text-indigo-600">Operations Leader</span>
          </h1>
          <p className="mt-6 text-lg text-slate-600 max-w-3xl">
            AI-driven Operations and Project Management professional with expertise in automation,
            intelligent workflows, and digital transformation. Proven experience embedding
            Generative AI, RAG systems, and agentic automation to improve productivity, quality,
            and decision-making while retaining human-in-the-loop governance.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Chip text="📍 Chennai, India" />
            <Chip text="💼 Team Manager @ Opendoor" />
            <Chip text="🤖 AI Agents & Automation" />
          </div>
        </Section>

        <Divider />

        {/* ABOUT */}
        <Section id="about" bg="grid" title="Summary & Skills">
          <p className="text-slate-600 max-w-4xl">
            Google-certified Project Management professional with strong expertise in AI-driven
            automation, end-to-end process transformation, and data-backed decision-making.
            Skilled in Generative AI, RAG and agentic systems, human-in-the-loop workflows,
            and AI-powered analytics.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mt-10">
            <SkillBlock
              title="AI & Automation"
              color="indigo"
              items={[
                "Generative AI (LLMs, Prompt Engineering)",
                "RAG Systems & Agentic AI",
                "Workflow Automation Platforms",
                "AI Analytics, BI & Reporting Dashboards",
              ]}
            />

            <SkillBlock
              title="Operations & Program Management"
              color="emerald"
              items={[
                "Operations Strategy & Execution",
                "End-to-End Process Transformation",
                "Value Stream Mapping",
                "Transition & Change Management",
                "Cross-Functional & Global Stakeholder Management",
              ]}
            />
          </div>
        </Section>

        <Divider />

        {/* EXPERIENCE */}
        <Section id="experience" bg="flow" title="Professional Experience">
          <ExperienceItem
            role="Team Manager"
            company="Opendoor"
            period="Nov 2023 – Present"
            bullets={[
              "Led a 45+ member team managing customer feedback, support, and document validation operations",
              "Converted manual workflows into AI-agent driven processes (30% productivity, 25% quality)",
              "Embedded Generative AI with human-in-the-loop governance for critical decisions",
              "Partnered with US stakeholders to scale AI-enabled initiatives",
              "Improved reporting accuracy by 70% using AI dashboards",
            ]}
          />

          <ExperienceItem
            role="Subject Matter Expert"
            company="Opendoor"
            period="Mar 2022 – Nov 2023"
            bullets={[
              "Optimized workflows through automation and SOP enhancements",
              "Ensured quality compliance via layered quality checks",
              "Built training modules for new process migrations",
            ]}
          />

          <ExperienceItem
            role="Senior Associate"
            company="Allsec Technologies"
            period="Mar 2017 – Feb 2021"
            bullets={[
              "Managed workflow queues and performance metrics for international clients",
              "Supported automation initiatives to improve resolution accuracy",
              "Delivered productivity-focused training",
            ]}
          />
        </Section>

        <Divider />

        {/* PROJECTS */}
        <Section id="projects" bg="spotlight" title="Key Achievements">
          <div className="grid md:grid-cols-2 gap-6">
            <AchievementCard
              title="Manual Operations → AI Agents"
              desc="Transitioned routine manual processes into AI agents with human-in-the-loop governance."
            />
            <AchievementCard
              title="Process Optimization & Capacity Modeling"
              desc="Improved team efficiency and engagement by 80% using data-backed capacity planning."
            />
          </div>
        </Section>

        <Divider />

        {/* CONTACT */}
        <Section id="contact" title="Contact">
          <div className="flex flex-col md:flex-row gap-10 justify-between">
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
        </Section>
      </main>
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

const Section = ({ id, title, children, bg }) => (
  <section id={id} className="relative">
    <SectionBackground variant={bg} />
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      {title && (
        <h2 className="font-heading text-3xl font-bold">{title}</h2>
      )}
      {children}
    </motion.div>
  </section>
);

const SectionBackground = ({ variant }) => {
  const styles = {
    ai: "bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.18),transparent_60%)]",
    grid:
      "bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:40px_40px]",
    flow: "bg-[radial-gradient(circle_at_left,rgba(16,185,129,0.15),transparent_55%)]",
    spotlight:
      "bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.14),transparent_50%)]",
  };
  return (
    <div className={`absolute inset-0 -z-10 ${styles[variant] || ""}`} />
  );
};

const Divider = () => (
  <div className="my-20">
    <svg viewBox="0 0 1440 90" className="w-full">
      <path
        fill="rgba(99,102,241,0.08)"
        d="M0,40 C240,80 480,0 720,20 960,40 1200,60 1440,30 L1440,0 L0,0 Z"
      />
    </svg>
  </div>
);

const Chip = ({ text }) => (
  <span className="px-4 py-2 bg-white border border-slate-200 rounded-full text-sm shadow-sm">
    {text}
  </span>
);

const SkillBlock = ({ title, items, color }) => (
  <motion.div
    initial="hidden"
    whileInView="show"
    viewport={{ once: true }}
    variants={{
      hidden: {},
      show: { transition: { staggerChildren: 0.08 } },
    }}
    className={`rounded-xl p-6 border bg-${color}-50 border-${color}-100`}
  >
    <h4 className={`font-heading font-semibold text-${color}-700 mb-4`}>
      {title}
    </h4>
    <ul className="space-y-2 text-sm">
      {items.map((i) => (
        <motion.li
          key={i}
          variants={{
            hidden: { opacity: 0, x: -10 },
            show: { opacity: 1, x: 0 },
          }}
        >
          • {i}
        </motion.li>
      ))}
    </ul>
  </motion.div>
);

const ExperienceItem = ({ role, company, period, bullets }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4 }}
    className="border-l-4 border-indigo-200 pl-6 py-4"
  >
    <div className="flex justify-between">
      <h3 className="font-bold text-lg">{role}</h3>
      <span className="text-xs text-slate-400 font-mono">{period}</span>
    </div>
    <div className="text-indigo-600 font-medium">{company}</div>
    <ul className="mt-2 space-y-1 text-sm text-slate-600 list-disc list-inside">
      {bullets.map((b) => (
        <li key={b}>{b}</li>
      ))}
    </ul>
  </motion.div>
);

const AchievementCard = ({ title, desc }) => (
  <motion.div
    whileHover={{ y: -4 }}
    className="p-6 border border-slate-200 rounded-xl hover:border-indigo-300 transition"
  >
    <h4 className="font-bold mb-2">{title}</h4>
    <p className="text-sm text-slate-600">{desc}</p>
  </motion.div>
);
