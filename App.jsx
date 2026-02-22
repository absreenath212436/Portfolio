import React, { useEffect } from "react";
import "./style.css";

export default function App() {

  // Scroll reveal animation trigger
  useEffect(() => {
    const sections = document.querySelectorAll(".section");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.2 }
    );

    sections.forEach((section) => observer.observe(section));
  }, []);

  return (
    <div className="app">

      {/* ================= HERO ================= */}
      <section className="section hero">
        <video autoPlay muted loop playsInline className="bg-video">
          <source src={`${import.meta.env.BASE_URL}home.mp4`} type="video/mp4" />
        </video>
        <div className="overlay"></div>

        <div className="content center">
          <h1 className="main-title">Sreenath A B</h1>

          <h2 className="headline">
            I Design Intelligent Operations That Scale.
          </h2>

          <p className="subtext">
            From frontline execution to AI-enabled program architecture,
            I build operational systems that reduce friction, increase clarity,
            and multiply output.
          </p>

          <div className="proof-strip">
            <div><h3>45+</h3><p>Professionals Led</p></div>
            <div><h3>8+ Years</h3><p>Execution Leadership</p></div>
            <div><h3>Multi-Program</h3><p>Owner</p></div>
            <div><h3>AI</h3><p>Workflow Architect</p></div>
          </div>
        </div>
      </section>

      {/* ================= STORY ================= */}
      <section className="section">
        <video autoPlay muted loop playsInline className="bg-video slow">
          <source src={`${import.meta.env.BASE_URL}about.mp4`} type="video/mp4" />
        </video>
        <div className="overlay"></div>

        <div className="content narrow">
          <h2>From Execution to Architecture</h2>
          <p>I began inside SLA dashboards and operational pressure.</p>
          <p>Execution at scale taught me that systems fail before people do.</p>
          <p className="highlight">Operator → Optimizer → Architect</p>
          <p>
            Today I design structured operating environments that measure clearly,
            scale sustainably, and integrate AI intelligently.
          </p>
        </div>
      </section>

      {/* ================= WHAT I BUILD ================= */}
      <section className="section">
        <video autoPlay muted loop playsInline className="bg-video slow">
          <source src={`${import.meta.env.BASE_URL}experience.mp4`} type="video/mp4" />
        </video>
        <div className="overlay"></div>

        <div className="content">
          <h2>Systems I Design</h2>

          <div className="grid-3">
            <div className="card">
              <h3>Operational Intelligence</h3>
              <ul>
                <li>KPI Architecture</li>
                <li>Workflow Mapping</li>
                <li>Governance Frameworks</li>
              </ul>
            </div>

            <div className="card">
              <h3>Execution Programs</h3>
              <ul>
                <li>Program Planning</li>
                <li>Risk Structuring</li>
                <li>Stakeholder Alignment</li>
              </ul>
            </div>

            <div className="card">
              <h3>AI-Augmented Workflows</h3>
              <ul>
                <li>AI Classification</li>
                <li>RAG Systems</li>
                <li>Human-in-the-loop Governance</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ================= IMPACT ================= */}
      <section className="section">
        <video autoPlay muted loop playsInline className="bg-video slow">
          <source src={`${import.meta.env.BASE_URL}projects.mp4`} type="video/mp4" />
        </video>
        <div className="overlay"></div>

        <div className="content narrow">
          <h2>Impact Across Programs</h2>
          <ul className="impact-list">
            <li>30% Productivity Increase</li>
            <li>25% Quality Improvement</li>
            <li>70% Reporting Accuracy Boost</li>
            <li>AI-Enabled Workflow Automation</li>
          </ul>
        </div>
      </section>

      {/* ================= CONTACT ================= */}
      <section className="section contact">
        <video autoPlay muted loop playsInline className="bg-video slow">
          <source src={`${import.meta.env.BASE_URL}contact.mp4`} type="video/mp4" />
        </video>
        <div className="overlay"></div>

        <div className="content center">
          <h2>Let’s Design the Next Generation of Operations</h2>
          <div className="contact-info">
            <p>Email: absreenath212436@gmail.com</p>
            <p>LinkedIn: linkedin.com/in/sreenathab</p>
            <p>Location: Chennai, India</p>
          </div>
        </div>
      </section>

    </div>
  );
}
