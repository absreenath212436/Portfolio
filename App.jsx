import React, { useState } from "react";

const SUMMARY = `Operations and Project Management professional with 8+ years of experience in digital operations, client service delivery, and process transformation. Strong in Generative AI, workflow automation, digital transformation, leadership, and collaboration.`;

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

export default function App() {
  const [section, setSection] = useState("summary");
  const [certificates, setCertificates] = useState([]);

  function handleCertificateUpload(e) {
    const files = Array.from(e.target.files);
    const newCerts = files.map((f) => ({
      name: f.name,
      url: URL.createObjectURL(f),
    }));
    setCertificates([...certificates, ...newCerts]);
  }

  return (
    <div className="container">
      <header>
        <h1>Sreenath A B</h1>
        <nav>
          {["summary", "experience", "education", "skills"].map((sec) => (
            <button
              key={sec}
              onClick={() => setSection(sec)}
              className={section === sec ? "active" : ""}
              aria-current={section === sec ? "page" : false}
            >
              {sec.charAt(0).toUpperCase() + sec.slice(1)}
            </button>
          ))}
        </nav>
      </header>

      <main>
        {section === "summary" && (
          <>
            <h2>Summary & Contact</h2>
            <p>{SUMMARY}</p>
            <p>
              <strong>Email:</strong> absreenath212436@gmail.com
            </p>
            <p>
              <strong>LinkedIn: </strong>
              <a
                href="https://www.linkedin.com/in/sreenath-ab"
                target="_blank"
                rel="noreferrer noopener"
              >
                linkedin.com/in/sreenath-ab
              </a>
            </p>
            <p>
              <strong>Location:</strong> Chennai, India
            </p>
          </>
        )}

        {section === "experience" && (
          <>
            <h2>Experience</h2>
            <div className="scroll-panel" tabIndex={0}>
              {EXPERIENCES.map((job, i) => (
                <div key={i} style={{ marginBottom: "1.5rem" }}>
                  <h3>{job.title}</h3>
                  <p>
                    <em>
                      {job.company} — {job.period} — {job.location}
                    </em>
                  </p>
                  <ul>
                    {job.details.map((d, j) => (
                      <li key={j}>{d}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </>
        )}

        {section === "education" && (
          <>
            <h2>Education</h2>
            {EDUCATION.map((ed, i) => (
              <div key={i} style={{ marginBottom: "1rem" }}>
                <p>
                  <strong>{ed.degree}</strong>
                </p>
                <p>
                  {ed.school} — {ed.period} — {ed.location}
                </p>
              </div>
            ))}
          </>
        )}

        {section === "skills" && (
          <>
            <h2>Skills & Certifications</h2>
            <div
              style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}
            >
              <div className="scroll-panel" tabIndex={0} style={{ flex: 1 }}>
                <h3>Hard Skills</h3>
                <ul>
                  {HARD_SKILLS.map((skill, i) => (
                    <li key={i}>{skill}</li>
                  ))}
                </ul>
              </div>
              <div className="scroll-panel" tabIndex={0} style={{ flex: 1 }}>
                <h3>Soft Skills</h3>
                <ul>
                  {SOFT_SKILLS.map((skill, i) => (
                    <li key={i}>{skill}</li>
                  ))}
                </ul>
              </div>
            </div>

            <section
              className="upload-section"
              aria-label="Upload your certificates"
            >
              <h3>Upload Certificates</h3>
              <input
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleCertificateUpload}
              />
              {certificates.length > 0 && (
                <ul className="uploaded-list">
                  {certificates.map((file, i) => (
                    <li key={i}>
                      <a
                        href={file.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {file.name}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </>
        )}
      </main>
    </div>
  );
}
