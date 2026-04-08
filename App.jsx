import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion";
import Scene from "./src/Scene.jsx";
import "./style.css";

// ── SCROLL-SAFE FADE-IN ───────────────────────────────────────────────────
// whileInView breaks when a Three.js canvas is present in the DOM.
// useInView + manual animate fixes this correctly.
const FadeIn = ({ children, direction = "up", delay = 0, className = "", style = {} }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const dirs = {
    up:    { hidden: { opacity: 0, y: 50 },         visible: { opacity: 1, y: 0 } },
    down:  { hidden: { opacity: 0, y: -50 },        visible: { opacity: 1, y: 0 } },
    left:  { hidden: { opacity: 0, x: -60 },        visible: { opacity: 1, x: 0 } },
    right: { hidden: { opacity: 0, x: 60 },         visible: { opacity: 1, x: 0 } },
    scale: { hidden: { opacity: 0, scale: 0.93 },   visible: { opacity: 1, scale: 1 } },
  };
  return (
    <motion.div ref={ref} className={className} style={style}
      initial="hidden" animate={inView ? "visible" : "hidden"}
      variants={dirs[direction]}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay }}>
      {children}
    </motion.div>
  );
};

// ── CURSOR ───────────────────────────────────────────────────────────────
const Cursor = () => {
  const dot = useRef(null), ring = useRef(null);
  const pos = useRef({ x: 0, y: 0 }), rpos = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const move = (e) => { pos.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("mousemove", move);
    let raf;
    const loop = () => {
      rpos.current.x += (pos.current.x - rpos.current.x) * 0.12;
      rpos.current.y += (pos.current.y - rpos.current.y) * 0.12;
      if (dot.current) dot.current.style.transform = `translate(${pos.current.x - 5}px,${pos.current.y - 5}px)`;
      if (ring.current) ring.current.style.transform = `translate(${rpos.current.x - 20}px,${rpos.current.y - 20}px)`;
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => { window.removeEventListener("mousemove", move); cancelAnimationFrame(raf); };
  }, []);
  return (<><div ref={dot} className="cursor-dot" /><div ref={ring} className="cursor-ring" /></>);
};

// ── PARTICLES ────────────────────────────────────────────────────────────
const ParticleCanvas = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current, ctx = canvas.getContext("2d");
    let W, H, pts = [], mouse = { x: -999, y: -999 };
    const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    resize(); window.addEventListener("resize", resize);
    window.addEventListener("mousemove", (e) => { mouse.x = e.clientX; mouse.y = e.clientY; });
    for (let i = 0; i < 60; i++) pts.push({ x: Math.random() * 1920, y: Math.random() * 1080, vx: (Math.random() - .5) * .22, vy: (Math.random() - .5) * .22, r: Math.random() * 1.4 + .3, a: Math.random() * .3 + .07 });
    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      pts.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0; if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        const dx = p.x - mouse.x, dy = p.y - mouse.y, d = Math.sqrt(dx * dx + dy * dy);
        if (d < 100) { p.x += dx * .012; p.y += dy * .012; }
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fillStyle = `rgba(99,102,241,${p.a})`; ctx.fill();
      });
      pts.forEach((a, i) => pts.slice(i + 1).forEach((b) => {
        const d = Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
        if (d < 85) { ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.strokeStyle = `rgba(99,102,241,${.06 * (1 - d / 85)})`; ctx.lineWidth = .5; ctx.stroke(); }
      }));
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { window.removeEventListener("resize", resize); cancelAnimationFrame(raf); };
  }, []);
  return <canvas ref={canvasRef} className="particle-canvas" />;
};

// ── LOADER ───────────────────────────────────────────────────────────────
const Loader = ({ onDone }) => {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    let p = 0;
    const iv = setInterval(() => { p += Math.random() * 16; if (p >= 100) { p = 100; clearInterval(iv); setTimeout(onDone, 350); } setPct(Math.round(p)); }, 80);
    return () => clearInterval(iv);
  }, [onDone]);
  return (
    <motion.div className="loader" exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
      <div className="loader-logo">SAB<span className="accent"></span></div>
      <div className="loader-bar"><div className="loader-fill" style={{ width: pct + "%" }} /></div>
      <div className="loader-pct">{pct}%</div>
    </motion.div>
  );
};

// ── TYPEWRITER ───────────────────────────────────────────────────────────
const Typewriter = ({ words }) => {
  const [idx, setIdx] = useState(0), [sub, setSub] = useState(0), [rev, setRev] = useState(false), [blink, setBlink] = useState(true);
  useEffect(() => { const t = setTimeout(() => setBlink(b => !b), 500); return () => clearTimeout(t); }, [blink]);
  useEffect(() => {
    if (sub === words[idx].length + 1 && !rev) { const t = setTimeout(() => setRev(true), 1800); return () => clearTimeout(t); }
    if (sub === 0 && rev) { setRev(false); setIdx(i => (i + 1) % words.length); return; }
    const t = setTimeout(() => setSub(s => s + (rev ? -1 : 1)), rev ? 45 : 90);
    return () => clearTimeout(t);
  }, [sub, idx, rev, words]);
  return <span className="typewriter-text">{words[idx].substring(0, sub)}<span className="cursor" style={{ opacity: blink ? 1 : 0 }}>|</span></span>;
};

// ── COUNTER ──────────────────────────────────────────────────────────────
const Counter = ({ target, suffix = "" }) => {
  const [val, setVal] = useState(0), ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  useEffect(() => {
    if (!inView) return;
    let start = null;
    const step = (ts) => { if (!start) start = ts; const p = Math.min((ts - start) / 1500, 1); setVal(Math.round((1 - Math.pow(1 - p, 3)) * target)); if (p < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  }, [inView, target]);
  return <span ref={ref}>{val}{suffix}</span>;
};

// ── CONTACT FORM ─────────────────────────────────────────────────────────
const ContactForm = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("");
  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault(); setStatus("sending");
    window.open(`mailto:absreenath212436@gmail.com?subject=${encodeURIComponent(form.subject || "Portfolio Contact")}&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)}`, "_blank");
    setStatus("sent"); setTimeout(() => { setStatus(""); setForm({ name: "", email: "", subject: "", message: "" }); }, 3000);
  };
  return (
    <form className="contact-form" onSubmit={onSubmit}>
      <div className="form-row">
        <div className="form-group"><label>Name</label><input type="text" name="name" value={form.name} onChange={onChange} placeholder="Your name" required /></div>
        <div className="form-group"><label>Email</label><input type="email" name="email" value={form.email} onChange={onChange} placeholder="you@example.com" required /></div>
      </div>
      <div className="form-group"><label>Subject</label><input type="text" name="subject" value={form.subject} onChange={onChange} placeholder="What's this about?" /></div>
      <div className="form-group"><label>Message</label><textarea name="message" value={form.message} onChange={onChange} placeholder="Tell me about your project or opportunity..." rows="5" required /></div>
      <button type="submit" className={`form-submit-btn ${status}`} disabled={status === "sending"}>
        {status === "sent" ? "✓ Message ready" : status === "sending" ? "Opening mail..." : "Send Message →"}
      </button>
    </form>
  );
};

// ════════════════════════════════════════════════════════════════
// MAIN APP
// ════════════════════════════════════════════════════════════════
export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [avatarAction, setAvatarAction] = useState("Wave");
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const s = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", s);
    return () => window.removeEventListener("scroll", s);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const id = e.target.id;
        if (id === "home") setAvatarAction("Wave");
        if (id === "about") setAvatarAction("Walk");
        if (id === "experience") setAvatarAction("Point");
        if (id === "projects") setAvatarAction("Jump");
        if (id === "contact") setAvatarAction("Wave");
      });
    }, { threshold: 0.4 });
    document.querySelectorAll(".section").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [loaded]);

  // DATA
  const typewords = ["an AI Transformation Leader", "a Process Optimisation Expert", "a Lean Operations Practitioner", "a Multi-Stakeholder Program Leader", "a Production AI Systems Builder"];

  const skills = {
    "AI & Automation": ["Agentic AI", "RAG Architecture", "Prompt Engineering", "Human-in-the-Loop", "Claude AI / LLMs", "Python", "LangChain"],
    "Operations": ["Lean / Six Sigma", "SIPOC Framework", "Value Stream Mapping", "SOP Design", "Root Cause Analysis", "Kaizen", "Process Reengineering"],
    "Performance Governance": ["KPI Design & Tracking", "KRI Monitoring", "SLA Governance", "Capacity Planning", "QA Frameworks", "Audit & Compliance"],
    "Leadership": ["Multi-Stakeholder Management", "Cross-functional Delivery", "Change Management", "Team Development", "Program Governance"],
  };

  const experience = [
    {
      role: "Team Manager — AI & Operations",
      company: "Opendoor Technologies  ·  Nov 2023 – Present",
      bullets: [
        "Lead a 45+ member operations team across multiple programs with full accountability for SLA compliance, quality, and cost efficiency.",
        "Built and manage a dedicated AI Automation Unit — shipping 6 production agents that replaced manual triage, scheduling, QA, and vendor coordination workflows.",
        "Delivered $88K+ annual cost savings through AI-driven workforce optimisation while improving throughput and quality.",
        "Cut average handle time by 90% on high-volume workflows by replacing manual lookups with AI-enriched outputs.",
        "Own KPI and KRI governance across all programs — tracking resolution SLA, AHT, first-contact resolution, and agent utilisation weekly.",
        "Apply SIPOC mapping and Value Stream Analysis before every process redesign — eliminating waste before automating.",
        "Partner with global operations leadership and platform teams to align priorities and drive cross-functional transitions.",
      ],
    },
    {
      role: "Subject Matter Expert",
      company: "Opendoor Technologies  ·  Mar 2022 – Nov 2023",
      bullets: [
        "Redesigned multi-step workflows delivering a 25% improvement in quality scores by standardising decision criteria and removing redundant handoffs.",
        "Built SOP frameworks and compliance governance structures adopted across multiple programs.",
        "Led cross-regional process transitions — coordinating global teams to maintain performance continuity from day one.",
        "Ran structured Root Cause Analysis sessions for quality failures, implementing corrective actions tracked against measurable KPIs.",
      ],
    },
    {
      role: "Senior Customer Associate",
      company: "Allsec Technologies  ·  Mar 2017 – Feb 2021",
      bullets: [
        "Managed high-volume international operations in financial services queues with consistent 100% SLA compliance.",
        "Acted as quality reviewer and escalation point, contributing to process improvement and training design.",
      ],
    },
  ];

  const opsPillars = [
    { icon: "📐", tag: "SIPOC", title: "Map before you build", desc: "Every process starts as a SIPOC before any code is written. This surfaces gaps and handoff failures that automation would otherwise lock in permanently." },
    { icon: "📊", tag: "KPI / KRI", title: "Govern with data", desc: "KPIs track what happened. KRIs flag what's at risk. Every program runs on weekly performance reviews against defined thresholds — not monthly retrospectives." },
    { icon: "🔁", tag: "LEAN / VSM", title: "Eliminate waste first", desc: "Value Stream Mapping precedes every redesign. One workflow was cut from 25 minutes to under 3 by removing 7 manual steps — before any AI was introduced." },
    { icon: "🎯", tag: "SLA / QA", title: "Quality is structured", desc: "Programs run tiered SLA structures with clear escalation paths. QA is scored via formal rubrics with full ticket coverage — not random spot-checks." },
    { icon: "🤝", tag: "STAKEHOLDERS", title: "Align across time zones", desc: "I manage operations leadership, platform engineering, external vendors, and compliance teams across US and India with structured governance and communication." },
    { icon: "🧠", tag: "AI AS OPS", title: "Agents are processes too", desc: "Every agent ships with SLAs, failure modes, rollback procedures, deduplication guards, and monitoring. Automation is treated with the same rigour as any Lean workflow." },
  ];

  const projects = [
    {
      badge: "Production · Agent 01", name: "Customer Feedback Auto-Triage", impact: "$55K annual savings  ·  90% AHT reduction",
      desc: "An AI pipeline that classifies, enriches, and routes incoming property feedback tickets — replacing a manual process requiring data lookups across multiple systems before every routing decision.",
      kpis: ["100+ tickets/day automated", "AHT: 25 min → 2.5 min", "Priority accuracy >95%"],
      arch: [{ icon: "🎫", name: "Ticket Ingestion", sub: "Zendesk" }, { icon: "🔍", name: "Source Detection", sub: "Type routing" }, { icon: "📍", name: "Address Resolution", sub: "Waterfall" }, { icon: "❄️", name: "Property Enrichment", sub: "Data warehouse" }, { icon: "🧠", name: "AI Classification", sub: "Priority + type" }, { icon: "✅", name: "Auto-Update", sub: "Fields + routing" }],
      tech: ["Gumloop", "Snowflake", "Zendesk API", "Claude AI", "REST APIs"],
      metrics: [{ v: "13→6", l: "Team Size" }, { v: "90%", l: "AHT Reduction" }, { v: "12-Node", l: "Pipeline" }, { v: "100+", l: "Tickets/Day" }],
    },
    {
      badge: "Production · Agent 02", name: "HOA Document Retrieval Agent", impact: "$31K annual savings  ·  75% AHT reduction",
      desc: "An autonomous agent retrieving HOA architectural review forms, extracting requirements, and producing a structured pre-fill output — replacing 40 minutes of manual document search with a sub-10-minute workflow.",
      kpis: ["AHT: 40 min → 10 min", "Auto-polled every 15 minutes", "Tested across 5 property markets"],
      arch: [{ icon: "📋", name: "Ticket Ingestion", sub: "Zendesk" }, { icon: "❄️", name: "Property Lookup", sub: "Data warehouse" }, { icon: "🔎", name: "Document Retrieval", sub: "Web + AI parse" }, { icon: "📝", name: "Pre-Fill Engine", sub: "Scope extraction" }, { icon: "💬", name: "Output Delivery", sub: "Slack" }],
      tech: ["Cowork", "Snowflake", "Gumloop", "Slack API", "Web Search"],
      metrics: [{ v: "75%", l: "AHT Reduction" }, { v: "8→4", l: "Team Size" }, { v: "15 min", l: "Poll Interval" }, { v: "$31K", l: "Annual Saving" }],
    },
    {
      badge: "Production · Agent 03", name: "QA Audit Agent", impact: "100% ticket coverage  ·  Real-time SOP compliance",
      desc: "An AI quality assurance agent scoring every ticket against a structured 15-point SOP checklist — replacing random-sample manual reviews with full-population automated scoring across tiered SLA thresholds.",
      kpis: ["15-point scoring rubric", "100% population coverage", "SLA tiers: 60 / 120 / 180 min"],
      arch: [{ icon: "🎫", name: "Ticket Pool", sub: "" }, { icon: "🧠", name: "SOP Audit Engine", sub: "15-point" }, { icon: "📊", name: "Gap Scoring", sub: "Business-day" }, { icon: "💬", name: "Report Delivery", sub: "Slack" }],
      tech: ["Cowork", "Zendesk API", "Claude AI", "Snowflake", "Slack API"],
      metrics: [{ v: "15-Pt", l: "Audit Scope" }, { v: "100%", l: "Coverage" }, { v: "Real-time", l: "Monitoring" }, { v: "0 hrs", l: "Manual QA" }],
    },
    {
      badge: "Production · Agent 04", name: "Maintenance Triage Agent", impact: "741 tickets/month  ·  Zero manual intervention",
      desc: "An 11-node pipeline handling property maintenance tickets end-to-end — enriching with property state data, applying a 7-state priority matrix, and updating the ticket system automatically with deduplication.",
      kpis: ["741 tickets/month automated", "7-state priority logic", "Dedup gate on every run"],
      tech: ["Gumloop", "Snowflake", "Zendesk API", "Claude AI"],
      metrics: [{ v: "741", l: "Tickets/Month" }, { v: "11-Node", l: "Pipeline" }, { v: "7-State", l: "Priority Logic" }, { v: "Auto", l: "Dedup" }],
    },
    {
      badge: "Production · Agent 05", name: "Signage Ordering Automation", impact: "End-to-end ordering  ·  State-based vendor routing",
      desc: "A fully automated signage ordering pipeline — querying properties from the data warehouse, deduplicating against order history, routing to vendors by state, and generating purchase draft emails for human review.",
      kpis: ["76 orders on first live run", "2-vendor routing by state", "Google Sheets dedup archive"],
      tech: ["Snowflake", "Google Sheets", "Gmail MCP", "Cowork"],
      metrics: [{ v: "76", l: "First Run Orders" }, { v: "2", l: "Vendors Routed" }, { v: "100%", l: "Automated" }, { v: "0", l: "Manual Steps" }],
    },
    {
      badge: "Production · Agent 06", name: "Property Measurement Bot", impact: "Claude Vision  ·  Pricing validation  ·  Cost cross-reference",
      desc: "A seven-step workflow using AI vision to estimate outdoor zone square footage from aerial images, priced against a vendor pricing database and cross-referenced against historical work order costs.",
      kpis: ["5 outdoor zones measured", "Pricing cross-referenced", "Historical cost validation"],
      tech: ["Claude Vision", "Watson Pricing API", "Snowflake", "Slack MCP"],
      metrics: [{ v: "7-Step", l: "One-Shot" }, { v: "5 Zones", l: "Measured" }, { v: "AI Vision", l: "Powered" }, { v: "WO Validated", l: "Pricing" }],
    },
  ];

  const impactData = [
    { num: "$88K+", label: "Annual savings", desc: "AI-driven workforce optimisation across programs", color: "#4f46e5" },
    { num: "90%", label: "AHT reduction", desc: "Handle time cut from 25 min to under 3 min", color: "#059669" },
    { num: "100+", label: "Tickets/day", desc: "Automatically triaged — zero manual intervention", color: "#d97706" },
    { num: "100", label: "Markets covered", desc: "Automated triage coverage expanded Q2 2026", color: "#7c3aed" },
    { num: "45+", label: "Team members", desc: "Led across multiple operational programs", color: "#0891b2" },
    { num: "6", label: "Agents live", desc: "Production systems — not prototypes", color: "#dc2626" },
    { num: "741", label: "Tickets/month", desc: "Automated end-to-end by maintenance pipeline", color: "#7c3aed" },
    { num: "25%", label: "Quality uplift", desc: "Operational quality improvement as SME", color: "#059669" },
  ];

  return (
    <>
      <AnimatePresence>{!loaded && <Loader onDone={() => setLoaded(true)} />}</AnimatePresence>
      {loaded && (
        <div className="app">
          <Cursor /><ParticleCanvas />
          <div className="scanlines" /><div className="film-grain" />
          <motion.div className="scroll-progress" style={{ width: progressWidth }} />
          <Scene currentAction={avatarAction} />

          {/* NAV */}
          <nav className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
            <div className="nav-content">
              <div className="nav-logo">Sreenath<span className="accent"></span></div>
              <ul className="nav-links">
                {["home","about","experience","projects","operations","impact","contact"].map(id => (
                  <li key={id}><a href={`#${id}`}>{id.charAt(0).toUpperCase()+id.slice(1)}</a></li>
                ))}
              </ul>
            </div>
          </nav>

          {/* ══ HOME ══ */}
          <section id="home" className="section hero-bg">
            <div className="container split-layout">
              <FadeIn direction="right" className="text-content">
                <div className="hero-eyebrow">// AI Transformation  ·  Operations Excellence  ·  Team Manager</div>
                <img src={`${import.meta.env.BASE_URL}profile.jpg`} alt="Sreenath A B" className="profile-image" />
                <h2 className="greeting">Hi, I'm</h2>
                <h1 className="main-title">Sreenath A B</h1>
                <h2 className="headline">I am <Typewriter words={typewords} /></h2>
                <p className="subtext">10 years in operations. Purpose-built AI systems that run them. I bridge Lean methodology, structured KPI governance, and production AI engineering to deliver outcomes that scale.</p>
                <div className="hero-cta">
                  <a href={`${import.meta.env.BASE_URL}resume.pdf`} target="_blank" rel="noopener noreferrer" className="btn-primary"><span className="btn-icon">↓</span> Download Resume</a>
                  <a href="#contact" className="btn-secondary">Let's Talk</a>
                </div>
                <div className="proof-strip">
                  <div><h3>$88K+</h3><p>Annual Savings</p></div>
                  <div><h3>90%</h3><p>AHT Reduction</p></div>
                  <div><h3>45+</h3><p>Team Members</p></div>
                  <div><h3>6</h3><p>Agents Live</p></div>
                </div>
              </FadeIn>
              <FadeIn direction="up" delay={0.2} className="media-content media-portrait neon-border">
                <video autoPlay muted loop playsInline className="feature-video">
                  <source src={`${import.meta.env.BASE_URL}home.mp4`} type="video/mp4" />
                </video>
              </FadeIn>
            </div>
          </section>

          {/* STATS */}
          <div className="stats-strip">
            {[{target:100,suffix:"+",label:"Tickets triaged / day"},{target:45,suffix:"+",label:"Team members led"},{target:6,suffix:"",label:"Agents in production"},{target:741,suffix:"",label:"Maint. tickets / month"}].map((s,i)=>(
              <div className="stat-item" key={i}>
                <span className="stat-num"><Counter target={s.target} suffix={s.suffix} /></span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>

          {/* ══ ABOUT ══ */}
          <section id="about" className="section alt-bg">
            <div className="container split-reversed">
              <FadeIn direction="left" className="text-content">
                <h2><span className="accent">About</span> Me</h2>
                <p className="subtext">I lead operations and AI transformation at scale — managing large teams across multiple programs while building and shipping production AI systems that replace manual workflows.</p>
                <p className="highlight-dark" style={{minHeight:"54px",display:"flex",alignItems:"center"}}>
                  Operator → <Typewriter words={["Optimizer → AI Architect","Process Excellence → AI Outcomes","Data-Driven → Outcome-Focused"]} />
                </p>
                <p className="subtext">I apply Lean methodology, SIPOC frameworks, and Value Stream Mapping before automating anything. The same structured thinking that drives operational improvements drives how I design, govern, and measure AI agents.</p>
                {Object.entries(skills).map(([cat,list])=>(
                  <div key={cat}>
                    <h4 className="section-subtitle">{cat}</h4>
                    <div className="skills-container">{list.map(s=><span className="skill-tag" key={s}>{s}</span>)}</div>
                  </div>
                ))}
                <h4 className="section-subtitle">Certifications</h4>
                <div className="skills-container">
                  {["Google — Project Management","IBM — Generative AI","IBM — RAG & Agentic AI","Google — Prompt Engineering"].map(s=>(
                    <span className="skill-tag cert-tag" key={s}>🏆 {s}</span>
                  ))}
                </div>
              </FadeIn>
              <FadeIn direction="down" delay={0.2} className="media-content media-square neon-border">
                <video autoPlay muted loop playsInline className="feature-video">
                  <source src={`${import.meta.env.BASE_URL}about.mp4`} type="video/mp4" />
                </video>
              </FadeIn>
            </div>
          </section>

          {/* ══ EXPERIENCE ══ */}
          <section id="experience" className="section hero-bg">
            <div className="container split-layout">
              <FadeIn direction="right" className="text-content">
                <h2>Professional <span className="accent">Journey</span></h2>
                <div className="timeline">
                  {experience.map((item,i)=>(
                    <FadeIn direction="left" delay={i*0.12} key={i}>
                      <div className="timeline-item dark-card">
                        <h3>{item.role}</h3><h4>{item.company}</h4>
                        <ul className="exp-bullets">{item.bullets.map((b,j)=><li key={j}>{b}</li>)}</ul>
                      </div>
                    </FadeIn>
                  ))}
                </div>
              </FadeIn>
              <FadeIn direction="up" delay={0.2} className="media-content media-tall neon-border">
                <video autoPlay muted loop playsInline className="feature-video">
                  <source src={`${import.meta.env.BASE_URL}experience.mp4`} type="video/mp4" />
                </video>
              </FadeIn>
            </div>
          </section>

          {/* ══ PROJECTS ══ */}
          <section id="projects" className="section alt-bg">
            <div className="container projects-full-width">
              <FadeIn direction="up">
                <h2>Signature <span className="accent">AI Agents</span></h2>
                <p className="subtext" style={{maxWidth:"560px",marginBottom:"40px"}}>Production systems built on Lean foundations, governed by KPIs, and running daily — not prototypes.</p>
              </FadeIn>
              <div className="project-cards-grid">
                {projects.map((proj,i)=>(
                  <FadeIn direction={i%2===0?"left":"right"} delay={i*0.07} key={i}>
                    <div className="project-card">
                      <div className="project-card-header">
                        <span className="project-badge">{proj.badge}</span>
                        <h3>{proj.name}</h3>
                        <p className="impact-text">{proj.impact}</p>
                      </div>
                      <p className="project-desc">{proj.desc}</p>
                      {proj.arch&&(
                        <div className="arch-diagram">
                          <h4 className="arch-title">Pipeline Architecture</h4>
                          <div className="arch-flow">
                            {proj.arch.map((node,j)=>(
                              <React.Fragment key={j}>
                                <div className={`arch-node ${["source","process","data","ai","output","data"][j%6]}`}>
                                  <span className="arch-icon">{node.icon}</span><span>{node.name}</span>
                                  {node.sub&&<span className="arch-sub">{node.sub}</span>}
                                </div>
                                {j<proj.arch.length-1&&<div className="arch-arrow">→</div>}
                              </React.Fragment>
                            ))}
                          </div>
                        </div>
                      )}
                      <div className="kpi-strip">{proj.kpis.map((k,j)=><span className="kpi-badge" key={j}>✓ {k}</span>)}</div>
                      <div className="project-tech">{proj.tech.map(t=><span className="tech-tag" key={t}>{t}</span>)}</div>
                      <div className="project-metrics">{proj.metrics.map((m,j)=><div className="metric" key={j}><span className="metric-value">{m.v}</span><span className="metric-label">{m.l}</span></div>)}</div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </section>

          {/* ══ OPERATIONS ══ */}
          <section id="operations" className="section hero-bg">
            <div className="container" style={{flexDirection:"column",gap:"40px"}}>
              <FadeIn direction="up" style={{textAlign:"center"}}>
                <h2>How I Run <span className="accent">Operations</span></h2>
                <p className="subtext" style={{maxWidth:"560px",margin:"0 auto"}}>A structured operating system — Lean foundations, KPI governance, SIPOC discipline, and AI as the execution layer.</p>
              </FadeIn>
              <div className="ops-grid">
                {opsPillars.map((p,i)=>(
                  <FadeIn direction="up" delay={i*0.09} key={i}>
                    <div className="ops-card">
                      <div className="ops-icon">{p.icon}</div>
                      <div className="ops-tag">{p.tag}</div>
                      <h3 className="ops-title">{p.title}</h3>
                      <p className="ops-desc">{p.desc}</p>
                    </div>
                  </FadeIn>
                ))}
              </div>
              <div className="methodology-strip">
                {["Lean / Six Sigma","SIPOC","Value Stream Mapping","KPI & KRI Design","SLA Governance","Root Cause Analysis","Kaizen","Process Reengineering","SOP Development","Change Management","Capacity Planning","Workforce Optimisation"].map(m=>(
                  <span className="method-pill" key={m}>{m}</span>
                ))}
              </div>
            </div>
          </section>

          {/* ══ IMPACT ══ */}
          <section id="impact" className="section alt-bg">
            <div className="container" style={{flexDirection:"column",gap:"40px"}}>
              <FadeIn direction="up" style={{textAlign:"center"}}>
                <h2>Measured <span className="accent">Impact</span></h2>
                <p className="subtext" style={{maxWidth:"500px",margin:"0 auto"}}>Tracked against KPIs. Not estimated in decks.</p>
              </FadeIn>
              <div className="impact-grid">
                {impactData.map((item,i)=>(
                  <FadeIn direction="up" delay={i*0.07} key={i}>
                    <div className="impact-block" style={{borderTop:`3px solid ${item.color}`}}>
                      <div className="impact-num" style={{color:item.color}}>{item.num}</div>
                      <div className="impact-label">{item.label}</div>
                      <div className="impact-desc">{item.desc}</div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </section>

          {/* ══ CONTACT ══ */}
          <section id="contact" className="section hero-bg contact">
            <div className="container contact-container">
              <FadeIn direction="up" className="contact-header" style={{textAlign:"center"}}>
                <h2>Let's <span className="accent">Connect</span></h2>
                <p className="subtext">Open to conversations about AI transformation, operations leadership, and building systems that ship at scale.</p>
              </FadeIn>
              <div className="contact-grid">
                <FadeIn direction="left" className="contact-left" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  <ContactForm />
                  <div className="contact-info-cards" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                    <a href="mailto:absreenath212436@gmail.com" className="contact-info-card"><span className="contact-icon">✉</span><div><h4>Email</h4><p>absreenath212436@gmail.com</p></div></a>
                    <a href="https://linkedin.com/in/sreenath-ab" target="_blank" rel="noopener noreferrer" className="contact-info-card"><span className="contact-icon">in</span><div><h4>LinkedIn</h4><p>linkedin.com/in/sreenath-ab</p></div></a>
                  </div>
                </FadeIn>
                <FadeIn direction="right" className="media-content media-portrait neon-border" style={{ margin: "0 auto" }}>
                  <video autoPlay muted loop playsInline className="feature-video">
                    <source src={`${import.meta.env.BASE_URL}contact.mp4`} type="video/mp4" />
                  </video>
                </FadeIn>
              </div>
            </div>
          </section>

          {/* FOOTER */}
          <footer className="site-footer">
            <div className="footer-content">
              <div className="footer-brand"><span className="footer-logo">Sreenath<span className="accent">.</span></span><p className="footer-tagline">AI Transformation & Operations Excellence Leader</p></div>
              <div className="footer-links">{["home","about","experience","projects","operations","impact","contact"].map(id=><a href={`#${id}`} key={id}>{id.charAt(0).toUpperCase()+id.slice(1)}</a>)}</div>
              <div className="footer-social">
                <a href="mailto:absreenath212436@gmail.com" aria-label="Email">✉</a>
                <a href="https://linkedin.com/in/sreenath-ab" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">in</a>
                <a href="https://github.com/absreenath212436" target="_blank" rel="noopener noreferrer" aria-label="GitHub">gh</a>
              </div>
              <div className="footer-copy"><p>© {new Date().getFullYear()} Sreenath A B · Chennai, India · React + Three.js + Framer Motion</p></div>
            </div>
          </footer>
        </div>
      )}
    </>
  );
}
