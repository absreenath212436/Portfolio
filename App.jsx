import React, { useEffect } from "react";
import { motion } from "framer-motion";
import "./style.css";

export default function App() {
  // Reusable cinematic animations
  const fadeUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  const fadeScale = {
    initial: { opacity: 0, scale: 0.95 },
    whileInView: { opacity: 1, scale: 1 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  return (
    <div className="app">

      {/* ================= NAVIGATION BAR ================= */}
      <nav className="navbar">
        <div className="nav-content">
          <div className="nav-logo">Sreenath A B</div>
          <ul className="nav-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#experience">Experience</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
      </nav>

      {/* ================= 1. HOME (SUMMARY) ================= */}
      <section id="home" className="section">
        <div className="container split-layout">
          <motion.div className="text-content" {...fadeUp}>
            <h1 className="main-title">Sreenath A B</h1>
            <h2 className="headline">AI-Driven Operations & Process Automation Leader</h2>
            <p className="subtext">
              AI Transformation & Operations Leader with a 10-year track record spanning project management, team leadership, process optimization, and stakeholder management across global operations. 
            </p>
            <p className="subtext">
              Over the past year, I have specialized in architecting AI-driven automation systems that eliminate manual workflows, scaling operations intelligently to deliver measurable financial impact.
            </p>
            <div className="proof-strip">
              <div><h3>₹73+ Lakhs</h3><p>Annual Cost Optimization</p></div>
              <div><h3>90%</h3><p>AHT Reduction</p></div>
              <div><h3>45+</h3><p>Professionals Led</p></div>
            </div>
          </motion.div>

          <motion.div className="media-content" {...fadeScale}>
            <video autoPlay muted loop playsInline className="feature-video">
              <source src={`${import.meta.env.BASE_URL}home.mp4`} type="video/mp4" />
            </video>
          </motion.div>
        </div>
      </section>

      {/* ================= 2. ABOUT & CAPABILITIES ================= */}
      <section id="about" className="section alt-bg">
        <div className="container split-reversed">
          <motion.div className="text-content" {...fadeUp}>
            <h2>About Me & Core Capabilities</h2>
            <p className="subtext">
              I combine a decade of operational excellence with advanced AI architecture. I currently manage a 45+ member operations team while leading a specialized 5-member AI automation unit focused on building scalable, Human-in-the-Loop AI systems.
            </p>
            <p className="highlight">Operator → Optimizer → AI Architect</p>
            <p className="subtext">
              My expertise spans operational cost optimization, SLA governance, and cross-functional program delivery. I completely redesign workflows using RAG architectures and AI routing engines to future-proof operational strategies.
            </p>

            <h4 style={{ color: '#4f46e5', marginTop: '20px', marginBottom: '10px' }}>Technical & AI Stack</h4>
            <div className="skills-container">
              <span className="skill-tag">Agentic AI</span>
              <span className="skill-tag">RAG Architecture</span>
              <span className="skill-tag">Prompt Engineering</span>
              <span className="skill-tag">Human-in-the-Loop</span>
              <span className="skill-tag">Zapier & Gumloop</span>
              <span className="skill-tag">Extend.ai & Gemini</span>
            </div>

            <h4 style={{ color: '#4f46e5', marginTop: '30px', marginBottom: '10px' }}>Certifications</h4>
            <div className="skills-container">
              <span className="skill-tag">IBM Generative AI for Project Managers</span>
              <span className="skill-tag">Google Prompt Engineering Essentials</span>
              <span className="skill-tag">Google Project Management</span>
              <span className="skill-tag">IBM RAG & Agentic AI</span>
            </div>
          </motion.div>

          <motion.div className="media-content" {...fadeScale}>
            <video autoPlay muted loop playsInline className="feature-video">
              <source src={`${import.meta.env.BASE_URL}about.mp4`} type="video/mp4" />
            </video>
          </motion.div>
        </div>
      </section>

      {/* ================= 3. EXPERIENCE TIMELINE ================= */}
      <section id="experience" className="section">
        <div className="container split-layout">
          <motion.div className="text-content" {...fadeUp}>
            <h2>Professional Journey</h2>
            
            <div className="timeline">
              <div className="timeline-item">
                <h3>Team Manager – AI & Process Automation</h3>
                <h4>Opendoor • Nov 2023 - Present • Chennai</h4>
                <p>Leading enterprise AI transformation initiatives while managing a 45+ member operations team and a 5-member AI automation unit. Delivered ₹73+ Lakhs annual cost savings through AI-driven headcount optimization and workflow redesign.</p>
              </div>

              <div className="timeline-item">
                <h3>Subject Matter Expert</h3>
                <h4>Opendoor • Mar 2022 - Nov 2023</h4>
                <p>Redesigned multi-step workflows yielding a 25% operational quality improvement. Built SOP automation frameworks, enforced compliance governance, and supported global process transitions.</p>
              </div>

              <div className="timeline-item">
                <h3>Senior Customer Associate</h3>
                <h4>Allsec Technologies • Mar 2017 - Feb 2021</h4>
                <p>Managed high-volume international client operations, achieving 100% SLA compliance in complex mortgage queues and contributing to automation-led efficiency improvements.</p>
              </div>
            </div>
          </motion.div>

          <motion.div className="media-content tall-media" {...fadeScale}>
            <video autoPlay muted loop playsInline className="feature-video">
              <source src={`${import.meta.env.BASE_URL}experience.mp4`} type="video/mp4" />
            </video>
          </motion.div>
        </div>
      </section>

      {/* ================= 4. PROJECTS (SIGNATURE TRANSFORMATIONS) ================= */}
      <section id="projects" className="section alt-bg">
        <div className="container split-reversed">
          <motion.div className="text-content" {...fadeUp}>
            <h2>Signature AI Projects</h2>
            
            <div className="stacked-cards">
              <div className="card">
                <h3>HOA Violation AI Agent</h3>
                <p className="impact-text"><strong>Impact:</strong> ₹26 Lakhs Annual Savings</p>
                <p>Developed an AI-powered classification, validation, and document extraction system to eliminate manual multi-page reviews.</p>
                <ul className="impact-list">
                  <li>Reduced AHT from 40 to 10 minutes (75% reduction)</li>
                  <li>Achieved 50% workforce optimization (8 to 4 members)</li>
                </ul>
              </div>

              <div className="card">
                <h3>AI Customer Feedback Auto-Triage</h3>
                <p className="impact-text"><strong>Impact:</strong> ₹45.5 Lakhs Annual Savings</p>
                <p>Built an AI classification and routing engine to auto-analyze customer feedback and route to appropriate teams.</p>
                <ul className="impact-list">
                  <li>Reduced manual team size from 13 to 6 members</li>
                  <li>Improved Resolution SLA and eliminated manual triage workload</li>
                </ul>
              </div>

              <div className="card">
                <h3>Enterprise Tool Rationalization</h3>
                <p className="impact-text"><strong>Impact:</strong> $1,800 Annual Software Savings</p>
                <p>Conducted deep-dive workflow audits to eliminate redundant third-party tools, replacing them with custom, centralized AI automation frameworks.</p>
              </div>
            </div>
          </motion.div>

          <motion.div className="media-content tall-media" {...fadeScale}>
            <video autoPlay muted loop playsInline className="feature-video">
              <source src={`${import.meta.env.BASE_URL}projects.mp4`} type="video/mp4" />
            </video>
          </motion.div>
        </div>
      </section>

      {/* ================= 5. CONTACT ================= */}
      <section id="contact" className="section contact">
        <div className="container center-layout">
          <motion.div className="text-content center" {...fadeUp}>
            <h2>Let’s Architect the Future of Work</h2>
            
            <div className="contact-box" style={{ marginTop: '20px' }}>
              <p><strong>Email:</strong> absreenath212436@gmail.com</p>
              <p><strong>LinkedIn:</strong> linkedin.com/in/sreenath-ab</p>
              <p><strong>Location:</strong> Chennai, India</p>
            </div>
          </motion.div>

          <motion.div className="media-content" style={{ marginTop: '40px' }} {...fadeScale}>
            <video autoPlay muted loop playsInline className="feature-video">
              <source src={`${import.meta.env.BASE_URL}contact.mp4`} type="video/mp4" />
            </video>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
