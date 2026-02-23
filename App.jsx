import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./style.css";

// --- Custom Typewriter Component ---
const Typewriter = ({ words }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const timeout2 = setTimeout(() => setBlink((prev) => !prev), 500);
    return () => clearTimeout(timeout2);
  }, [blink]);

  useEffect(() => {
    if (subIndex === words[index].length + 1 && !reverse) {
      const timeout = setTimeout(() => setReverse(true), 2000); 
      return () => clearTimeout(timeout);
    }
    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }
    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 50 : 100); 
    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, words]);

  return (
    <span className="typewriter-text">
      {words[index].substring(0, subIndex)}
      <span className="cursor">|</span>
    </span>
  );
};

export default function App() {
  
  // ================= CINEMATIC ANIMATION VARIANTS =================
  
  // Text slides from Right to Left
  const textSlideRightToLeft = {
    initial: { opacity: 0, x: 80 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  // Text slides from Left to Right
  const textSlideLeftToRight = {
    initial: { opacity: 0, x: -80 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  // Video slides from Bottom to Top (with a slight delay so text comes first)
  const videoSlideBottomToTop = {
    initial: { opacity: 0, y: 80 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.8, ease: "easeOut", delay: 0.2 }
  };

  // Video slides from Top to Bottom
  const videoSlideTopToBottom = {
    initial: { opacity: 0, y: -80 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.8, ease: "easeOut", delay: 0.2 }
  };

  return (
    <div className="app">

      {/* ================= NAVIGATION BAR ================= */}
      <nav className="navbar">
        <div className="nav-content">
          <div className="nav-logo">Sreenath<span className="accent">.</span></div>
          <ul className="nav-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#experience">Experience</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
      </nav>

      {/* ================= 1. HOME ================= */}
      <section id="home" className="section hero-bg">
        <div className="container split-layout">
          <motion.div className="text-content" {...textSlideRightToLeft}>
            
            {/* 🔥 NEW: Profile Image Added Here 🔥 */}
            <img 
              src={`${import.meta.env.BASE_URL}profile.jpg`} 
              alt="Sreenath A B" 
              className="profile-image" 
            />

            <h2 className="greeting">Hi There, this is</h2>
            <h1 className="main-title">Sreenath A B</h1>
            <h2 className="headline">
              I am <Typewriter words={["an AI Transformation Leader", "a Process Automation Architect", "an Operations Optimizer"]} />
            </h2>
            <p className="subtext">
              AI Transformation & Operations Leader with a 10-year track record spanning project management, team leadership, and stakeholder management. I architect AI-driven automation systems that eliminate manual workflows and deliver measurable financial impact.
            </p>
            <div className="proof-strip">
              <div><h3>₹73+ L</h3><p>Cost Optimized</p></div>
              <div><h3>90%</h3><p>AHT Reduction</p></div>
              <div><h3>45+</h3><p>Professionals Led</p></div>
            </div>
          </motion.div>

          <motion.div className="media-content neon-border" {...videoSlideBottomToTop}>
            <video autoPlay muted loop playsInline className="feature-video">
              <source src={`${import.meta.env.BASE_URL}home.mp4`} type="video/mp4" />
            </video>
          </motion.div>
        </div>
      </section>

      {/* ================= 2. ABOUT ================= */}
      <section id="about" className="section alt-bg">
        <div className="container split-reversed">
          <motion.div className="text-content" {...textSlideLeftToRight}>
            <h2><span className="accent">About</span> Me</h2>
            <p className="subtext">
              I combine a decade of operational excellence with advanced AI architecture. I currently manage a 45+ member operations team while leading a specialized 5-member AI automation unit focused on building scalable, Human-in-the-Loop AI systems.
            </p>
            
            <p className="highlight-dark" style={{ minHeight: '54px', display: 'flex', alignItems: 'center' }}>
               Operator → <Typewriter words={["Optimizer → AI Architect","Operational Excellence → Process Automator"]} />
            </p>

            <p className="subtext">
              My expertise spans operational cost optimization, SLA governance, and cross-functional program delivery. I completely redesign workflows using RAG architectures and AI routing engines to future-proof operational strategies.
            </p>

            <h4 className="section-subtitle">Technical & AI Stack</h4>
            <div className="skills-container">
              <span className="skill-tag">Agentic AI</span>
              <span className="skill-tag">RAG Architecture</span>
              <span className="skill-tag">Prompt Engineering</span>
              <span className="skill-tag">Human-in-the-Loop</span>
              <span className="skill-tag">Zapier & Gumloop</span>
              <span className="skill-tag">Extend.ai & Gemini</span>
            </div>

            <h4 className="section-subtitle">Certifications</h4>
            <div className="skills-container">
              <span className="skill-tag">IBM Generative AI for PMs</span>
              <span className="skill-tag">Google Prompt Engineering</span>
              <span className="skill-tag">Google Project Management</span>
              <span className="skill-tag">IBM RAG & Agentic AI</span>
            </div>
          </motion.div>

          <motion.div className="media-content neon-border" {...videoSlideTopToBottom}>
            <video autoPlay muted loop playsInline className="feature-video">
              <source src={`${import.meta.env.BASE_URL}about.mp4`} type="video/mp4" />
            </video>
          </motion.div>
        </div>
      </section>

      {/* ================= 3. EXPERIENCE ================= */}
      <section id="experience" className="section hero-bg">
        <div className="container split-layout">
          <motion.div className="text-content" {...textSlideRightToLeft}>
            <h2>Professional <span className="accent">Journey</span></h2>
            
            <div className="timeline">
              <div className="timeline-item dark-card">
                <h3>Team Manager – AI & Process Automation</h3>
                <h4>Opendoor • Nov 2023 - Present • Chennai</h4>
                <p>Leading enterprise AI transformation initiatives while managing a 45+ member operations team and a 5-member AI automation unit. Delivered ₹73+ Lakhs annual cost savings through AI-driven headcount optimization.</p>
              </div>

              <div className="timeline-item dark-card">
                <h3>Subject Matter Expert</h3>
                <h4>Opendoor • Mar 2022 - Nov 2023</h4>
                <p>Redesigned multi-step workflows yielding a 25% operational quality improvement. Built SOP automation frameworks, enforced compliance governance, and supported global process transitions.</p>
              </div>

              <div className="timeline-item dark-card">
                <h3>Senior Customer Associate</h3>
                <h4>Allsec Technologies • Mar 2017 - Feb 2021</h4>
                <p>Managed high-volume international client operations, achieving 100% SLA compliance in complex mortgage queues and contributing to automation-led efficiency improvements.</p>
              </div>
            </div>
          </motion.div>

          <motion.div className="media-content tall-media neon-border" {...videoSlideBottomToTop}>
            <video autoPlay muted loop playsInline className="feature-video">
              <source src={`${import.meta.env.BASE_URL}experience.mp4`} type="video/mp4" />
            </video>
          </motion.div>
        </div>
      </section>

      {/* ================= 4. PROJECTS ================= */}
      <section id="projects" className="section alt-bg">
        <div className="container split-reversed">
          <motion.div className="text-content" {...textSlideLeftToRight}>
            <h2>Signature <span className="accent">AI Projects</span></h2>
            
            <div className="stacked-cards">
              <div className="card dark-card">
                <h3>HOA Violation AI Agent</h3>
                <p className="impact-text">Impact: ₹26 Lakhs Annual Savings</p>
                <p>Developed an AI-powered classification, validation, and document extraction system to eliminate manual multi-page reviews.</p>
                <ul className="impact-list">
                  <li>Reduced AHT from 40 to 10 minutes (75% reduction)</li>
                  <li>Achieved 50% workforce optimization (8 to 4 members)</li>
                </ul>
              </div>

              <div className="card dark-card">
                <h3>AI Customer Feedback Auto-Triage</h3>
                <p className="impact-text">Impact: ₹45.5 Lakhs Annual Savings</p>
                <p>Built an AI classification and routing engine to auto-analyze customer feedback and route to appropriate teams.</p>
                <ul className="impact-list">
                  <li>Reduced manual team size from 13 to 6 members</li>
                  <li>Improved Resolution SLA and eliminated manual triage workload</li>
                </ul>
              </div>

              <div className="card dark-card">
                <h3>Enterprise Tool Rationalization</h3>
                <p className="impact-text">Impact: $1,800 Annual Software Savings</p>
                <p>Conducted deep-dive workflow audits to eliminate redundant third-party tools, replacing them with custom, centralized AI automation frameworks.</p>
              </div>
            </div>
          </motion.div>

          <motion.div className="media-content tall-media neon-border" {...videoSlideTopToBottom}>
            <video autoPlay muted loop playsInline className="feature-video">
              <source src={`${import.meta.env.BASE_URL}projects.mp4`} type="video/mp4" />
            </video>
          </motion.div>
        </div>
      </section>

      {/* ================= 5. CONTACT ================= */}
      <section id="contact" className="section hero-bg contact">
        {/* Changed from center-layout to split-layout */}
        <div className="container split-layout">
          
          {/* Text slides in from the right to left, just like the Hero and Experience sections */}
          <motion.div className="text-content" {...textSlideRightToLeft}>
            <h2>Let’s <span className="accent">Connect</span></h2>
            <p className="subtext" style={{marginBottom: '30px'}}>Ready to architect the future of work?</p>

            <div className="contact-box dark-card">
              <p><span className="accent">Email:</span> absreenath212436@gmail.com</p>
              <p><span className="accent">LinkedIn:</span> linkedin.com/in/sreenath-ab</p>
              <p><span className="accent">Location:</span> Chennai, India</p>
            </div>
          </motion.div>

          {/* Video glides up from the bottom into the right-side frame */}
          <motion.div className="media-content neon-border" {...videoSlideBottomToTop}>
            <video autoPlay muted loop playsInline className="feature-video">
              <source src={`${import.meta.env.BASE_URL}contact.mp4`} type="video/mp4" />
            </video>
          </motion.div>
          
        </div>
      </section>

    </div>
  );
}
