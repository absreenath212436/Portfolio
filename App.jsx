import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Scene from "./src/Scene.jsx";
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

// --- Contact Form Component ---
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState(''); // 'sending', 'sent', 'error'

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');
    
    // Build mailto link as a fallback (works without a backend)
    const mailtoLink = `mailto:absreenath212436@gmail.com?subject=${encodeURIComponent(formData.subject || 'Portfolio Contact')}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
    )}`;
    
    window.open(mailtoLink, '_blank');
    setStatus('sent');
    
    // Reset after 3 seconds
    setTimeout(() => {
      setStatus('');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            required
          />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="subject">Subject</label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="What's this about?"
        />
      </div>
      <div className="form-group">
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell me about your project or idea..."
          rows="5"
          required
        />
      </div>
      <button 
        type="submit" 
        className={`form-submit-btn ${status === 'sending' ? 'sending' : ''} ${status === 'sent' ? 'sent' : ''}`}
        disabled={status === 'sending'}
      >
        {status === 'sent' ? '✓ Opening Mail Client...' : status === 'sending' ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
};

export default function App() {
  
  // ================= CINEMATIC ANIMATION VARIANTS =================
  
  const [avatarAction, setAvatarAction] = useState("Wave");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            if (id === 'home') setAvatarAction("Wave");
            if (id === 'about') setAvatarAction("Walk");
            if (id === 'experience') setAvatarAction("Point");
            if (id === 'projects') setAvatarAction("Jump");
            if (id === 'contact') setAvatarAction("Wave");
          }
        });
      },
      { threshold: 0.5 }
    );

    document.querySelectorAll('.section').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const textSlideRightToLeft = {
    initial: { opacity: 0, x: 80 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] }
  };

  const textSlideLeftToRight = {
    initial: { opacity: 0, x: -80 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] }
  };

  const videoSlideBottomToTop = {
    initial: { opacity: 0, y: 80, scale: 0.95 },
    whileInView: { opacity: 1, y: 0, scale: 1 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }
  };

  const videoSlideTopToBottom = {
    initial: { opacity: 0, y: -80, scale: 0.95 },
    whileInView: { opacity: 1, y: 0, scale: 1 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
  };

  const cinematicProjectCard1 = {
    initial: { opacity: 0, x: -80, y: 100, rotateZ: -3, scale: 0.9 },
    whileInView: { opacity: 1, x: 0, y: 0, rotateZ: 0, scale: 1 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 1.8, ease: [0.16, 1, 0.3, 1] }
  };

  const cinematicProjectCard2 = {
    initial: { opacity: 0, x: 80, y: 100, rotateZ: 3, scale: 0.9 },
    whileInView: { opacity: 1, x: 0, y: 0, rotateZ: 0, scale: 1 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }
  };

  return (
    <div className="app">
      <Scene currentAction={avatarAction} />

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

            {/* 🔥 NEW: CTA Buttons */}
            <div className="hero-cta">
              <a 
                href={`${import.meta.env.BASE_URL}resume.pdf`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-primary"
              >
                <span className="btn-icon">↓</span> Download Resume
              </a>
              <a href="#contact" className="btn-secondary">
                Let's Talk
              </a>
            </div>

            <div className="proof-strip">
              <div><h3>$88K+</h3><p>Cost Optimized</p></div>
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
            
            {/* 🔥 FIX: highlight-dark now has CSS defined */}
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
                <p>Leading enterprise AI transformation initiatives while managing a 45+ member operations team and a 5-member AI automation unit. Delivered $88K+ annual cost savings through AI-driven headcount optimization.</p>
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
        <div className="container projects-full-width">
          <motion.div className="text-content" {...textSlideLeftToRight}>
            <h2>Signature <span className="accent">AI Projects</span></h2>
            <p className="subtext" style={{maxWidth: '700px'}}>
              Production AI systems I designed and deployed — each solving real operational challenges with measurable business impact.
            </p>
            
            <div className="project-cards-grid">

              {/* ---- PROJECT 1: HQI Auto-Triage Agent ---- */}
              <motion.div className="project-card" {...cinematicProjectCard1}>
                <div className="project-card-header">
                  <span className="project-badge">Production</span>
                  <h3>AI Customer Feedback Auto-Triage</h3>
                  <p className="impact-text">$55K Annual Savings</p>
                </div>

                <p className="project-desc">
                  An 8-node AI pipeline that automatically triages incoming customer feedback tickets — classifying issue types, resolving property data, assigning priority, and routing to the correct team with zero manual intervention.
                </p>

                {/* Architecture Diagram */}
                <div className="arch-diagram">
                  <h4 className="arch-title">System Architecture</h4>
                  <div className="arch-flow">
                    <div className="arch-node source">
                      <span className="arch-icon">🎫</span>
                      <span>Zendesk Ticket</span>
                    </div>
                    <div className="arch-arrow">→</div>
                    <div className="arch-node process">
                      <span className="arch-icon">🔍</span>
                      <span>Address Resolution</span>
                      <span className="arch-sub">Waterfall: Token → ID → Parse</span>
                    </div>
                    <div className="arch-arrow">→</div>
                    <div className="arch-node ai">
                      <span className="arch-icon">🧠</span>
                      <span>LLM Classification</span>
                      <span className="arch-sub">Issue Type + Priority + Sub-Issue</span>
                    </div>
                    <div className="arch-arrow">→</div>
                    <div className="arch-node data">
                      <span className="arch-icon">❄️</span>
                      <span>Snowflake Enrichment</span>
                      <span className="arch-sub">Flip State, DOM, HPM Visits</span>
                    </div>
                    <div className="arch-arrow">→</div>
                    <div className="arch-node output">
                      <span className="arch-icon">✅</span>
                      <span>Auto-Route & Update</span>
                      <span className="arch-sub">Zendesk Fields + Team Assignment</span>
                    </div>
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="project-tech">
                  <span className="tech-tag">Gumloop</span>
                  <span className="tech-tag">Snowflake</span>
                  <span className="tech-tag">Zendesk API</span>
                  <span className="tech-tag">Claude AI</span>
                  <span className="tech-tag">REST APIs</span>
                </div>

                {/* Metrics */}
                <div className="project-metrics">
                  <div className="metric">
                    <span className="metric-value">13 → 6</span>
                    <span className="metric-label">Team Size</span>
                  </div>
                  <div className="metric">
                    <span className="metric-value">90%</span>
                    <span className="metric-label">AHT Reduction</span>
                  </div>
                  <div className="metric">
                    <span className="metric-value">8-Node</span>
                    <span className="metric-label">Pipeline</span>
                  </div>
                </div>
              </motion.div>

              {/* ---- PROJECT 2: HOA ARC Agent ---- */}
              <motion.div className="project-card" {...cinematicProjectCard2}>
                <div className="project-card-header">
                  <span className="project-badge">Production</span>
                  <h3>HOA ARC Document AI Agent</h3>
                  <p className="impact-text">$31K Annual Savings</p>
                </div>

                <p className="project-desc">
                  An autonomous agent that handles architectural review committee (ARC) form discovery, CC&R retrieval, scope extraction, and structured pre-fill — replacing 40-minute manual document reviews with a 10-minute AI-assisted workflow.
                </p>

                {/* Architecture Diagram */}
                <div className="arch-diagram">
                  <h4 className="arch-title">System Architecture</h4>
                  <div className="arch-flow">
                    <div className="arch-node source">
                      <span className="arch-icon">📋</span>
                      <span>Zendesk Ticket</span>
                    </div>
                    <div className="arch-arrow">→</div>
                    <div className="arch-node data">
                      <span className="arch-icon">❄️</span>
                      <span>Snowflake Lookup</span>
                      <span className="arch-sub">HOA Name, Property, Contacts</span>
                    </div>
                    <div className="arch-arrow">→</div>
                    <div className="arch-node ai">
                      <span className="arch-icon">🔎</span>
                      <span>Web Search + AI Parse</span>
                      <span className="arch-sub">ARC Form + CC&R Extraction</span>
                    </div>
                    <div className="arch-arrow">→</div>
                    <div className="arch-node process">
                      <span className="arch-icon">📝</span>
                      <span>Pre-Fill Engine</span>
                      <span className="arch-sub">Scope + Owner + Property Data</span>
                    </div>
                    <div className="arch-arrow">→</div>
                    <div className="arch-node output">
                      <span className="arch-icon">💬</span>
                      <span>Slack Delivery</span>
                      <span className="arch-sub">Structured Output + Threads</span>
                    </div>
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="project-tech">
                  <span className="tech-tag">Cowork Skills</span>
                  <span className="tech-tag">Snowflake</span>
                  <span className="tech-tag">Gumloop</span>
                  <span className="tech-tag">Slack API</span>
                  <span className="tech-tag">Web Scraping</span>
                </div>

                {/* Metrics */}
                <div className="project-metrics">
                  <div className="metric">
                    <span className="metric-value">75%</span>
                    <span className="metric-label">AHT Reduction</span>
                  </div>
                  <div className="metric">
                    <span className="metric-value">8 → 4</span>
                    <span className="metric-label">Team Size</span>
                  </div>
                  <div className="metric">
                    <span className="metric-value">15-min</span>
                    <span className="metric-label">Auto-Polling</span>
                  </div>
                </div>
              </motion.div>

              {/* ---- PROJECT 3: HOA QA Audit Agent ---- */}
              <motion.div className="project-card" {...fadeInUp}>
                <div className="project-card-header">
                  <span className="project-badge">Production</span>
                  <h3>HOA QA Audit Agent</h3>
                  <p className="impact-text">15-Point Automated SOP Compliance</p>
                </div>

                <p className="project-desc">
                  An AI quality assurance agent that audits HOA management tickets against a 15-point SOP checklist — verifying follow-up cadence, disposition accuracy, fee documentation, and escalation compliance in real-time.
                </p>

                {/* Architecture Diagram */}
                <div className="arch-diagram">
                  <h4 className="arch-title">System Architecture</h4>
                  <div className="arch-flow">
                    <div className="arch-node source">
                      <span className="arch-icon">🎫</span>
                      <span>Zendesk Ticket Pool</span>
                    </div>
                    <div className="arch-arrow">→</div>
                    <div className="arch-node ai">
                      <span className="arch-icon">🧠</span>
                      <span>AI SOP Audit Engine</span>
                      <span className="arch-sub">15-Point Checklist Evaluation</span>
                    </div>
                    <div className="arch-arrow">→</div>
                    <div className="arch-node process">
                      <span className="arch-icon">📊</span>
                      <span>Scoring & Gap Analysis</span>
                      <span className="arch-sub">Business Days Calculation</span>
                    </div>
                    <div className="arch-arrow">→</div>
                    <div className="arch-node output">
                      <span className="arch-icon">💬</span>
                      <span>Slack Report</span>
                      <span className="arch-sub">Violations + Recommendations</span>
                    </div>
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="project-tech">
                  <span className="tech-tag">Cowork Skills</span>
                  <span className="tech-tag">Zendesk API</span>
                  <span className="tech-tag">Claude AI</span>
                  <span className="tech-tag">Slack API</span>
                  <span className="tech-tag">SOP Framework</span>
                </div>

                {/* Metrics */}
                <div className="project-metrics">
                  <div className="metric">
                    <span className="metric-value">15-Pt</span>
                    <span className="metric-label">Audit Scope</span>
                  </div>
                  <div className="metric">
                    <span className="metric-value">100%</span>
                    <span className="metric-label">Coverage</span>
                  </div>
                  <div className="metric">
                    <span className="metric-value">Real-time</span>
                    <span className="metric-label">Monitoring</span>
                  </div>
                </div>
              </motion.div>

            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= 5. CONTACT ================= */}
      <section id="contact" className="section hero-bg contact">
        <div className="container contact-container">
          
          <motion.div className="contact-header" {...fadeInUp}>
            <h2>Let's <span className="accent">Connect</span></h2>
            <p className="subtext">Ready to architect the future of work? Drop me a message or reach out directly.</p>
          </motion.div>

          <div className="contact-grid">
            {/* Left: Contact Form */}
            <motion.div className="contact-form-wrapper" {...textSlideLeftToRight}>
              <ContactForm />
            </motion.div>

            {/* Right: Contact Info + Video */}
            <motion.div className="contact-right" {...textSlideRightToLeft}>
              <div className="contact-info-cards">
                <a href="mailto:absreenath212436@gmail.com" className="contact-info-card">
                  <span className="contact-icon">✉</span>
                  <div>
                    <h4>Email</h4>
                    <p>absreenath212436@gmail.com</p>
                  </div>
                </a>
                <a href="https://linkedin.com/in/sreenath-ab" target="_blank" rel="noopener noreferrer" className="contact-info-card">
                  <span className="contact-icon">in</span>
                  <div>
                    <h4>LinkedIn</h4>
                    <p>linkedin.com/in/sreenath-ab</p>
                  </div>
                </a>
                <div className="contact-info-card">
                  <span className="contact-icon">📍</span>
                  <div>
                    <h4>Location</h4>
                    <p>Chennai, India</p>
                  </div>
                </div>
              </div>

              <div className="media-content neon-border contact-video">
                <video autoPlay muted loop playsInline className="feature-video">
                  <source src={`${import.meta.env.BASE_URL}contact.mp4`} type="video/mp4" />
                </video>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="site-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <span className="footer-logo">Sreenath<span className="accent">.</span></span>
            <p className="footer-tagline">AI Transformation & Operations Leader</p>
          </div>
          <div className="footer-links">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#experience">Experience</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </div>
          <div className="footer-social">
            <a href="mailto:absreenath212436@gmail.com" aria-label="Email">✉</a>
            <a href="https://linkedin.com/in/sreenath-ab" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">in</a>
          </div>
          <div className="footer-copy">
            <p>© {new Date().getFullYear()} Sreenath A B. All rights reserved.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
