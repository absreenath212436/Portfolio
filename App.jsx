import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./App.css";

const SECTIONS = ["summary", "experience", "education", "skills"];

const SECTION_ICONS = {
  summary: <i className="fa-solid fa-users" style={{ marginRight: 8, color: "#4f46e5" }}></i>,
  experience: <i className="fa-solid fa-briefcase" style={{ marginRight: 8, color: "#4f46e5" }}></i>,
  education: <i className="fa-solid fa-graduation-cap" style={{ marginRight: 8, color: "#4f46e5" }}></i>,
  skills: <i className="fa-solid fa-tools" style={{ marginRight: 8, color: "#4f46e5" }}></i>,
};

const SUMMARY = `Operations and Project Management professional with 8 years of experience delivering scalable solutions in business operations, process optimization, and team leadership. Currently managing multiple projects and leading a 45+ member team at Opendoor, driving operational efficiency, workflow automation, and consistent delivery across diverse functions.
Google-certified in Project Management, with a leadership style rooted in ownership, accountability, and measurable outcomes. Skilled in cross-functional collaboration, data-backed decision-making, and developing high-performance teams that consistently exceed expectations.
Currently expanding expertise in Generative AI, prompt design, and intelligent process automation to future-proof operational strategies and enhance business transformation. Passionate about integrating technology with process excellence to deliver sustainable results.`;

const EXPERIENCES = [
  {
    title: "Team Manager",
    company: "Opendoor",
    period: "11/2023 - Present",
    location: "Chennai",
    details: [
      "Directed a team of 45+ professionals for support and document validation.",
      "Increased productivity by 30%, improved quality by 25% through automation.",
      "Partnered with US stakeholders for operational expansion.",
      "Boosted reporting accuracy by 70% with AI dashboards.",
    ],
  },
  {
    title: "Subject Matter Expert",
    company: "Opendoor",
    period: "03/2022 - 11/2023",
    location: "Chennai",
    details: [
      "Optimized workflows via automation, enhanced SOPs.",
      "Maintained quality with multi-layer checks.",
      "Developed training modules for migration.",
    ],
  },
  {
    title: "Senior Customer Associate",
    company: "Allsec Technologies",
    period: "03/2017 - 02/2021",
    location: "Chennai",
    details: [
      "Managed workflow queues and metrics.",
      "Supported automation for process streamlining.",
      "Delivered training aligning productivity.",
    ],
  },
];
const EDUCATION = [
  {
    degree: "Master of Computer Applications (MCA)",
    school: "Vels University",
    period: "07/2014 - 05/2016",
    location: "Chennai",
  },
  {
    degree: "Bachelor of Computer Applications (BCA)",
    school: "Alpha Arts & Science College",
    period: "06/2010 - 11/2013",
    location: "Chennai",
  },
];
const HARD_SKILLS = [
  "Operational Excellence",
  "Project Management",
  "Process Control",
  "Workflow Automation",
  "AI Tools",
];
const SOFT_SKILLS = [
  "Leadership",
  "Communication",
  "Team Collaboration",
  "Problem Solving",
  "Adaptability",
];

const sectionVariants = {
  enter: (direction) => ({
    opacity: 0,
    rotateY: direction > 0 ? -70 : 70,
    scale: 0.7,
    zIndex: 0,
  }),
  center: {
    opacity: 1,
    rotateY: 0,
    scale: 1,
    zIndex: 1,
    transition: { duration: 0.7 },
  },
  exit: (direction) => ({
    opacity: 0,
    rotateY: direction < 0 ? 70 : -70,
    scale: 0.7,
    zIndex: 0,
    transition: { duration: 0.5 },
  }),
};

export default function App() {
  const [sectionIdx, setSectionIdx] = useState(0);
  const [certificates, setCertificates] = useState([]);
  const direction = 1;

  function nextSection() {
    setSectionIdx((i) => (i + 1) % SECTIONS.length);
  }
  function prevSection() {
    setSectionIdx((i) => (i - 1 + SECTIONS.length) % SECTIONS.length);
  }
  function handleCertificateUpload(e) {
    const files = Array.from(e.target.files);
    const newCerts = files.map((f) => ({
      name: f.name,
      url: URL.createObjectURL(f),
    }));
    setCertificates([...certificates, ...newCerts]);
  }
  
  const section = SECTIONS[sectionIdx];

  return (
    <div className="container">
      <header>
        <h1>
          <span style={{ marginRight: "0.6em", color: "#4f46e5" }}>
            {SECTION_ICONS[section]}
          </span>
          Sreenath A B
        </h1>
        <nav>
          {SECTIONS.map((sec, i) => (
            <button
              key={sec}
              onClick={() => setSectionIdx(i)}
              className={section === sec ? "active" : ""}
              aria-current={section === sec ? "page" : false}
            >
              {SECTION_ICONS[sec]} {sec.charAt(0).toUpperCase() + sec.slice(1)}
            </button>
          ))}
        </nav>
      </header>

      <div className="carousel-buttons">
        <button onClick={prevSection} aria-label="Previous section">◀</button>
        <button onClick={nextSection} aria-label="Next section">▶</button>
      </div>

      <main>
        <AnimatePresence custom={direction} mode="wait">
          <motion.section
            key={section}
            custom={direction}
            variants={sectionVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="section-content"
            style={{
              background: "#fff",
              borderRadius: "20px",
              boxShadow: "0 10px 32px 0 #3842930c",
              padding: "2.5rem",
              margin:"1.2rem 0",
              minHeight: 400,
              position:"relative",
              perspective: 1200,
              willChange: "transform, opacity"
            }}
          >
            {section === "summary" && (
              <>
                <h2><i className="fa-solid fa-users" style={{ marginRight: 8, color:'#4f46e5' }}></i> Summary & Contact</h2>
                <p style={{ fontSize: "1.13rem", fontWeight: 500, marginBottom: 32 }}>
                  {SUMMARY}
                </p>
                <p>
                  <i className="fa-solid fa-envelope" style={{marginRight:6, color:'#4f46e5'}}></i>{" "}
                  <a href="mailto:absreenath212436@gmail.com">absreenath212436@gmail.com</a>
                </p>
                <p>
                  <i className="fa-brands fa-linkedin" style={{marginRight:6, color:'#4f46e5'}}></i>{" "}
                  <a href="https://www.linkedin.com/in/sreenathab/" target="_blank" rel="noopener noreferrer">
                    linkedin.com/sreenath
                  </a>
                </p>
                <p>
                  <i className="fa-solid fa-location-dot" style={{marginRight:6, color:'#4f46e5'}}></i> Chennai, India
                </p>
              </>
            )}
            {section === "experience" && (
              <>
                <h2><i className="fa-solid fa-briefcase" style={{ marginRight:8, color:'#4f46e5'}}></i> Experience</h2>
                <div className="scroll-panel" tabIndex={0}>
                  {EXPERIENCES.map((job, i) => (
                    <div key={i} style={{ marginBottom: "1.8rem" }}>
                      <h3 style={{marginBottom:4}}>{job.title}</h3>
                      <p>
                        <em>{job.company} — {job.period} — {job.location}</em>
                      </p>
                      <ul>
                        {job.details.map((d, j) => <li key={j}>{d}</li>)}
                      </ul>
                    </div>
                  ))}
                </div>
              </>
            )}
            {section === "education" && (
              <>
                <h2><i className="fa-solid fa-graduation-cap" style={{ marginRight:8, color:'#4f46e5'}}></i> Education</h2>
                {EDUCATION.map((ed, i) => (
                  <div key={i} style={{ marginBottom: "1.4rem" }}>
                    <p><strong>{ed.degree}</strong></p>
                    <p>{ed.school} — {ed.period} — {ed.location}</p>
                  </div>
                ))}
              </>
            )}
            {section === "skills" && (
              <>
                <h2><i className="fa-solid fa-tools" style={{ marginRight:8, color:'#4f46e5'}}></i> Skills & Certifications</h2>
                <div style={{display: "flex", gap: "2rem", marginBottom: "1.4rem"}}>
                  <div className="scroll-panel" tabIndex={0} style={{ flex: 1 }}>
                    <h3>Hard Skills</h3>
                    <ul>
                      {HARD_SKILLS.map((skill, i) => <li key={i}>{skill}</li>)}
                    </ul>
                  </div>
                  <div className="scroll-panel" tabIndex={0} style={{ flex: 1 }}>
                    <h3>Soft Skills</h3>
                    <ul>
                      {SOFT_SKILLS.map((skill, i) => <li key={i}>{skill}</li>)}
                    </ul>
                  </div>
                </div>
                <section className="upload-section" aria-label="Upload your certificates">
                  <h3>Upload Certificates</h3>
                  <input type="file" multiple accept=".pdf,.jpg,.jpeg,.png" onChange={handleCertificateUpload} />
                  {certificates.length > 0 && (
                    <ul className="uploaded-list">
                      {certificates.map((file, i) => (
                        <li key={i}>
                          <a href={file.url} target="_blank" rel="noopener noreferrer">{file.name}</a>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              </>
            )}
          </motion.section>
        </AnimatePresence>
      </main>
    </div>
  );
}
