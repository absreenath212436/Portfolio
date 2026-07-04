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
      <div className="loader-logo">SREENATH.AB<span className="accent"></span></div>
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
  const heroVideoRef = useRef(null);
  const [heroMuted, setHeroMuted] = useState(true);
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
        if (id === "education") setAvatarAction("Point");
        if (id === "certifications") setAvatarAction("Point");
        if (id === "leadership") setAvatarAction("Wave");
        if (id === "projects") setAvatarAction("Jump");
        if (id === "toolkit") setAvatarAction("Point");
        if (id === "impact") setAvatarAction("Walk");
        if (id === "contact") setAvatarAction("Wave");
      });
    }, { threshold: 0.4 });
    document.querySelectorAll(".section").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [loaded]);
  // Sections shown in the top navigation and footer.
  const navItems = ["home", "about", "experience", "education", "certifications", "projects", "operations", "toolkit", "impact", "contact"];
  // DATA
  const typewords = ["an Artificial Intelligence Transformation Leader", "a Process Optimisation Expert", "a Lean Operations Practitioner", "a Multi-Stakeholder Program Leader", "a Production Artificial Intelligence Systems Builder"];
  const skills = {
    "Artificial Intelligence & Automation": ["Agentic Artificial Intelligence", "Retrieval-Augmented Generation", "Prompt Engineering", "Human-in-the-Loop Design", "Claude / Large Language Models", "Python", "LangChain"],
    "Operations": ["Lean / Six Sigma", "SIPOC Framework", "Value Stream Mapping", "Standard Operating Procedure Design", "Root Cause Analysis", "Kaizen", "Process Reengineering"],
    "Performance Governance": ["Performance Metric Design & Tracking", "Risk Indicator Monitoring", "Service-Level Governance", "Capacity Planning", "Quality Assurance Frameworks", "Audit & Compliance"],
    "Leadership": ["Multi-Stakeholder Management", "Cross-functional Delivery", "Change Management", "Team Development", "Program Governance"],
  };
  const experience = [
    {
      role: "Team Manager — Artificial Intelligence & Operations",
      company: "Opendoor Technologies  ·  Nov 2023 – Present",
      bullets: [
        "Lead a 45+ member cross-functional operations organisation — directing through 4+ team leads and 2+ subject-matter experts, coordinating daily with United States counterparts, and partnering with executive-level stakeholders — with full accountability for service-level compliance, quality, and cost efficiency.",
        "Founded and direct a separate 5-member Artificial Intelligence Automation Unit — shipping 6 production agents that replaced manual triage, scheduling, quality assurance, and vendor coordination workflows.",
        "Delivered $88K+ annual cost savings through automation-driven workforce optimisation while improving throughput and quality.",
        "Cut average handle time by 90% on high-volume workflows by replacing manual lookups with automatically enriched outputs.",
        "Own performance and risk governance across all programs — tracking resolution service levels, handle time, first-contact resolution, and utilisation weekly.",
        "Apply SIPOC mapping and Value Stream Analysis before every process redesign — eliminating waste before automating.",
        "Partner with global operations leadership and platform teams to align priorities and drive cross-functional transitions.",
      ],
    },
    {
      role: "Subject Matter Expert",
      company: "Opendoor Technologies  ·  Mar 2022 – Nov 2023",
      bullets: [
        "Redesigned multi-step workflows delivering a 25% improvement in quality scores by standardising decision criteria and removing redundant handoffs.",
        "Built standard-operating-procedure frameworks and compliance governance structures adopted across multiple programs.",
        "Led cross-regional process transitions — coordinating global teams to maintain performance continuity from day one.",
        "Ran structured Root Cause Analysis sessions for quality failures, implementing corrective actions tracked against measurable performance targets.",
      ],
    },
    {
      role: "Senior Customer Associate",
      company: "Allsec Technologies  ·  Mar 2017 – Feb 2021",
      bullets: [
        "Managed high-volume international operations in financial services queues with consistent 100% service-level compliance.",
        "Acted as quality reviewer and escalation point, contributing to process improvement and training design.",
      ],
    },
  ];
  const education = [
    {
      degree: "Master of Computer Applications",
      school: "Vels University (VISTAS), Chennai  ·  2014 – 2016",
      note: "Postgraduate degree covering software engineering, systems design, and applied computing.",
    },
    {
      degree: "Bachelor of Computer Applications",
      school: "Alpha Arts & Science College, University of Madras, Chennai  ·  2010 – 2013",
      note: "Undergraduate foundation in programming, databases, and computer science fundamentals.",
    },
  ];
  // Professional certifications. Verify links point to the learner's Coursera credentials.
  const certifications = [
    {
      title: "Agentic AI and AI Agents for Leaders",
      issuer: "Vanderbilt University",
      date: "Jun 2026", courses: "3 courses",
      learned: "Strategic grounding in agentic artificial intelligence for organisational decision-making — designing custom assistant agents, critically evaluating AI solutions, and applying prompt engineering to drive real-world impact as a leader.",
      verify: "https://coursera.org/verify/specialization/BCFK2W5W3SMU",
    },
    {
      title: "IBM RAG and Agentic AI",
      issuer: "IBM",
      date: "Oct 2025", courses: "8 courses",
      learned: "Building production generative AI — retrieval-augmented generation, vector databases, and multimodal applications, plus multi-agent architectures using LangChain, LangGraph, CrewAI, and AutoGen with function calling and multi-step reasoning.",
      verify: "https://coursera.org/verify/professional-cert/E3CK03U6JNVU",
    },
    {
      title: "Google AI",
      issuer: "Google",
      date: "Mar 2026", courses: "7 courses",
      learned: "Applying artificial intelligence across the full knowledge-work lifecycle — brainstorming, research, communication, content creation, data analysis, and app building — including effective prompting and responsible use.",
      verify: "https://coursera.org/verify/professional-cert/9038H1OH0I0B",
    },
    {
      title: "Generative AI for Project Managers",
      issuer: "IBM · SkillUp",
      date: "Aug 2025", courses: "3 courses",
      learned: "Using generative AI to plan and execute projects — differentiating model types, applying tools such as ChatGPT, Copilot, Gemini, and image generation to project workflows, and weighing ethical considerations.",
      verify: "https://coursera.org/verify/specialization/H7465QH07NJF",
    },
    {
      title: "Google Prompting Essentials",
      issuer: "Google",
      date: "Nov 2025", courses: "4 courses",
      learned: "Advanced prompting techniques for complex tasks — designing effective prompts for everyday work, accelerating data analysis and presentation building, and using AI as an expert partner.",
      verify: "https://coursera.org/verify/specialization/QSHF2AUISZRA",
    },
    {
      title: "Google Cloud AI Infrastructure",
      issuer: "Google Cloud",
      date: "Mar 2026", courses: "3 courses",
      learned: "Artificial intelligence infrastructure fundamentals — hyperscale compute architecture, graphics- and tensor-processing acceleration, selecting machine types and provisioning platforms, and optimising for AI workloads.",
      verify: "https://coursera.org/verify/specialization/4WJDGO7HGVAC",
    },
    {
      title: "Google Data Analytics",
      issuer: "Google",
      date: "Jun 2026", courses: "9 courses",
      learned: "End-to-end data analytics — asking the right questions, preparing and cleaning data, analysis and visualisation, working with spreadsheets, Structured Query Language, Tableau, and Python.",
      verify: "https://coursera.org/verify/professional-cert/5BZ5UEN1MMWL",
    },
    {
      title: "Google Project Management",
      issuer: "Google",
      date: "Jul 2025", courses: "6 courses",
      learned: "Full project management lifecycle — initiation, planning, execution, and closure across both traditional and Agile methodologies.",
      verify: "https://coursera.org/verify/professional-cert/2D3O66MMTQO7",
    },
    {
      title: "Six Sigma Yellow Belt",
      issuer: "Kennesaw State University",
      date: "Jun 2026", courses: "4 courses",
      learned: "Lean and Six Sigma foundations — the Define-Measure-Analyze-Improve-Control framework and the core tools for process improvement and quality assurance.",
      verify: "https://coursera.org/verify/specialization/SKQUB1WXUYTT",
    },
  ];
  const leadership = [
    { icon: "🧭", title: "Understand before you automate", desc: "Every workflow is mapped, measured, and stripped of waste before a single line of automation is written. Automating a broken process only makes the mistakes faster." },
    { icon: "📏", title: "Govern with numbers, not opinions", desc: "Teams and agents alike run on defined thresholds and weekly reviews. Performance is visible, tracked, and acted on — never assumed." },
    { icon: "🤝", title: "People first, then the system", desc: "I grow team leads and subject-matter experts to own outcomes. Automation removes the drudgery so people can do higher-value work — not the other way round." },
    { icon: "🛡️", title: "Ship with guardrails", desc: "Every agent carries failure modes, rollback paths, deduplication guards, and human review where it matters. Rigour is what separates production systems from demos." },
    { icon: "🌐", title: "Lead across borders", desc: "I keep operations leadership, engineering, vendors, and compliance aligned across United States and India time zones through structured communication." },
    { icon: "🎯", title: "Honesty over hype", desc: "I report what actually happened against what was promised. Credibility compounds — inflated numbers do not." },
  ];
  const techStack = {
    "Artificial Intelligence & Language Models": ["Claude", "Large Language Models", "Retrieval-Augmented Generation", "Agentic Artificial Intelligence", "Prompt Engineering", "Claude Vision", "Human-in-the-Loop Design"],
    "Automation Platforms": ["Gumloop", "Cowork", "Workflow Orchestration", "Model Context Protocol"],
    "Data & Analytics": ["Snowflake", "Structured Query Language", "Data Warehousing", "Google Sheets"],
    "Engineering & Languages": ["Python", "JavaScript", "React", "Three.js", "Framer Motion", "Tailwind CSS", "Vite"],
    "Integrations & Systems": ["Zendesk", "Slack", "Gmail", "Jira", "System Integrations", "Google Workspace"],
    "Operations Methodology": ["Lean / Six Sigma", "Value Stream Mapping", "SIPOC Mapping", "Kaizen", "Standard Operating Procedure Design", "Root Cause Analysis"],
  };
  const opsPillars = [
    { icon: "📐", tag: "PROCESS MAPPING", title: "Map before you build", desc: "Every process starts as a SIPOC map before any code is written. This surfaces gaps and handoff failures that automation would otherwise lock in permanently." },
    { icon: "📊", tag: "PERFORMANCE & RISK", title: "Govern with data", desc: "Performance indicators track what happened. Risk indicators flag what is at risk. Every program runs on weekly reviews against defined thresholds — not monthly retrospectives." },
    { icon: "🔁", tag: "LEAN / VALUE STREAM", title: "Eliminate waste first", desc: "Value Stream Mapping precedes every redesign. One workflow was cut from 25 minutes to under 3 by removing 7 manual steps — before any automation was introduced." },
    { icon: "🎯", tag: "SERVICE & QUALITY", title: "Quality is structured", desc: "Programs run tiered service-level structures with clear escalation paths. Quality is scored via formal rubrics with full ticket coverage — not random spot-checks." },
    { icon: "🤝", tag: "STAKEHOLDERS", title: "Align across time zones", desc: "I manage operations leadership, platform engineering, external vendors, and compliance teams across the United States and India with structured governance and communication." },
    { icon: "🧠", tag: "AUTOMATION AS PROCESS", title: "Agents are processes too", desc: "Every agent ships with service levels, failure modes, rollback procedures, deduplication guards, and monitoring. Automation is treated with the same rigour as any Lean workflow." },
  ];
  const projects = [
    {
      badge: "Production · Agent 01", name: "Intelligent Customer Feedback Triage System", impact: "$55K annual savings  ·  90% handle time reduction",
      desc: "An artificial intelligence pipeline that classifies, enriches, and routes incoming property feedback tickets — replacing a manual process that required data lookups across multiple systems before every routing decision.",
      kpis: ["100+ tickets/day automated", "Handle time: 25 min → 2.5 min", "Priority accuracy >95%"],
      arch: [{ icon: "🎫", name: "Ticket Ingestion", sub: "Zendesk" }, { icon: "🔍", name: "Source Detection", sub: "Type routing" }, { icon: "📍", name: "Address Resolution", sub: "Waterfall" }, { icon: "❄️", name: "Property Enrichment", sub: "Data warehouse" }, { icon: "🧠", name: "Classification", sub: "Priority + type" }, { icon: "✅", name: "Auto-Update", sub: "Fields + routing" }],
      tech: ["Gumloop", "Snowflake", "Zendesk API", "Claude", "REST APIs"],
      metrics: [{ v: "13→6", l: "Team Size" }, { v: "90%", l: "Handle Time Cut" }, { v: "12-Node", l: "Pipeline" }, { v: "100+", l: "Tickets/Day" }],
    },
    {
      badge: "Production · Agent 02", name: "Autonomous Document Retrieval & Pre-Fill System", impact: "$31K annual savings  ·  75% handle time reduction",
      desc: "An autonomous agent that retrieves architectural review forms, extracts requirements, and produces a structured pre-fill output — replacing 40 minutes of manual document search with a sub-10-minute workflow.",
      kpis: ["Handle time: 40 min → 10 min", "Auto-polled every 15 minutes", "Tested across 5 property markets"],
      arch: [{ icon: "📋", name: "Ticket Ingestion", sub: "Zendesk" }, { icon: "❄️", name: "Property Lookup", sub: "Data warehouse" }, { icon: "🔎", name: "Document Retrieval", sub: "Web + parsing" }, { icon: "📝", name: "Pre-Fill Engine", sub: "Scope extraction" }, { icon: "💬", name: "Output Delivery", sub: "Slack" }],
      tech: ["Cowork", "Snowflake", "Gumloop", "Slack API", "Web Search"],
      metrics: [{ v: "75%", l: "Handle Time Cut" }, { v: "8→4", l: "Team Size" }, { v: "15 min", l: "Poll Interval" }, { v: "$31K", l: "Annual Saving" }],
    },
    {
      badge: "Production · Agent 03", name: "Automated Quality Assurance Auditor", impact: "100% ticket coverage  ·  Real-time process compliance",
      desc: "A quality assurance agent that scores every ticket against a structured 15-point compliance checklist — replacing random-sample manual reviews with full-population automated scoring across tiered service-level thresholds.",
      kpis: ["15-point scoring rubric", "100% population coverage", "Service-level tiers: 60 / 120 / 180 min"],
      arch: [{ icon: "🎫", name: "Ticket Pool", sub: "" }, { icon: "🧠", name: "Audit Engine", sub: "15-point" }, { icon: "📊", name: "Gap Scoring", sub: "Business-day" }, { icon: "💬", name: "Report Delivery", sub: "Slack" }],
      tech: ["Cowork", "Zendesk API", "Claude", "Snowflake", "Slack API"],
      metrics: [{ v: "15-Pt", l: "Audit Scope" }, { v: "100%", l: "Coverage" }, { v: "Real-time", l: "Monitoring" }, { v: "0 hrs", l: "Manual Review" }],
    },
    {
      badge: "Production · Agent 04", name: "Automated Facilities Maintenance Triage System", impact: "741 tickets/month  ·  Zero manual intervention",
      desc: "An 11-node pipeline handling property maintenance tickets end-to-end — enriching with property state data, applying a 7-state priority matrix, and updating the ticket system automatically with deduplication.",
      kpis: ["741 tickets/month automated", "7-state priority logic", "Deduplication gate on every run"],
      tech: ["Gumloop", "Snowflake", "Zendesk API", "Claude"],
      metrics: [{ v: "741", l: "Tickets/Month" }, { v: "11-Node", l: "Pipeline" }, { v: "7-State", l: "Priority Logic" }, { v: "Auto", l: "Deduplication" }],
    },
    {
      badge: "Production · Agent 05", name: "Automated Procurement & Vendor Routing System", impact: "End-to-end ordering  ·  State-based vendor routing",
      desc: "A fully automated procurement pipeline — querying properties from the data warehouse, deduplicating against order history, routing to vendors by state, and generating purchase draft emails for human review.",
      kpis: ["76 orders on first live run", "2-vendor routing by state", "Google Sheets deduplication archive"],
      tech: ["Snowflake", "Google Sheets", "Gmail", "Cowork"],
      metrics: [{ v: "76", l: "First Run Orders" }, { v: "2", l: "Vendors Routed" }, { v: "100%", l: "Automated" }, { v: "0", l: "Manual Steps" }],
    },
    {
      badge: "Production · Agent 06", name: "Computer Vision Measurement & Cost Estimation System", impact: "Computer vision  ·  Pricing validation  ·  Cost cross-reference",
      desc: "A seven-step workflow using computer vision to estimate outdoor zone square footage from aerial images, priced against a vendor pricing database and cross-referenced against historical work order costs.",
      kpis: ["5 outdoor zones measured", "Pricing cross-referenced", "Historical cost validation"],
      tech: ["Claude Vision", "Watson Pricing API", "Snowflake", "Slack"],
      metrics: [{ v: "7-Step", l: "One-Shot" }, { v: "5 Zones", l: "Measured" }, { v: "Vision", l: "Powered" }, { v: "Validated", l: "Pricing" }],
    },
  ];
  const impactData = [
    { num: "$88K+", label: "Annual savings", desc: "Automation-driven workforce optimisation across programs", color: "#4f46e5" },
    { num: "90%", label: "Handle time reduction", desc: "Handle time cut from 25 min to under 3 min", color: "#059669" },
    { num: "100+", label: "Tickets/day", desc: "Automatically triaged — zero manual intervention", color: "#d97706" },
    { num: "100", label: "Markets covered", desc: "Automated triage coverage expanded Q2 2026", color: "#7c3aed" },
    { num: "45+", label: "Team members", desc: "Led through team leads and subject-matter experts across programs", color: "#0891b2" },
    { num: "6", label: "Agents live", desc: "Production systems — not prototypes", color: "#dc2626" },
    { num: "741", label: "Tickets/month", desc: "Automated end-to-end by maintenance pipeline", color: "#7c3aed" },
    { num: "25%", label: "Quality uplift", desc: "Operational quality improvement as subject matter expert", color: "#059669" },
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
                {navItems.map(id => (
                  <li key={id}><a href={`#${id}`}>{id.charAt(0).toUpperCase()+id.slice(1)}</a></li>
                ))}
              </ul>
            </div>
          </nav>
          {/* ══ HOME ══ */}
          <section id="home" className="section hero-bg">
            <div className="container split-layout">
              <FadeIn direction="right" className="text-content">
                <div className="hero-eyebrow">// Artificial Intelligence Transformation  ·  Operations Excellence  ·  Team Manager</div>
                <img src={`${import.meta.env.BASE_URL}profile.jpg`} alt="Sreenath A B" className="profile-image" />
                <h2 className="greeting">Hi, I'm</h2>
                <h1 className="main-title">Sreenath A B</h1>
                <h2 className="headline">I am <Typewriter words={typewords} /></h2>
                <p className="subtext">8+ years in operations. Purpose-built artificial intelligence systems that run them. I bridge Lean methodology, structured performance governance, and production engineering to deliver outcomes that scale.</p>
                <div className="hero-cta">
                  <a href={`${import.meta.env.BASE_URL}Sreenath AB Resume.pdf`} target="_blank" rel="noopener noreferrer" className="btn-primary"><span className="btn-icon">↓</span> Download Resume</a>
                  <a href="#contact" className="btn-secondary">Let's Talk</a>
                </div>
                <div className="proof-strip">
                  <div><h3>$88K+</h3><p>Annual Savings</p></div>
                  <div><h3>90%</h3><p>Handle Time Cut</p></div>
                  <div><h3>45+</h3><p>Team Led</p></div>
                  <div><h3>6</h3><p>Agents Live</p></div>
                </div>
              </FadeIn>
              <FadeIn direction="up" delay={0.2} className="media-content media-portrait neon-border">
                <video ref={heroVideoRef} autoPlay muted loop playsInline className="feature-video">
                  <source src={`${import.meta.env.BASE_URL}home.mp4`} type="video/mp4" />
                </video>
                <button
                  className="video-mute"
                  onClick={() => {
                    const v = heroVideoRef.current;
                    v.muted = !v.muted;
                    setHeroMuted(v.muted);
                    if (!v.muted) v.play();
                  }}
                  aria-label={heroMuted ? "Unmute video" : "Mute video"}
                >
                  {heroMuted ? "🔇" : "🔊"}
                </button>
              </FadeIn>
            </div>
          </section>
          {/* ══ ABOUT ══ */}
          <section id="about" className="section alt-bg">
            <div className="container split-reversed">
              <FadeIn direction="left" className="text-content">
                <h2><span className="accent">About</span> Me</h2>
                <p className="subtext">I am an Artificial Intelligence Transformation and Operations leader with 8+ years spanning large-scale service operations and hands-on production engineering. I currently lead a 45+ member cross-functional operations organisation — directing through team leads and subject-matter experts, coordinating with United States counterparts, and partnering with executive-level stakeholders — while founding and directing a separate 5-member automation unit that has shipped six production agents into daily use.</p>
                <p className="subtext">My work sits at the intersection of Lean operating discipline and applied artificial intelligence. I map, measure, and streamline a process first — then build governed automation on top of it, with each agent carrying the same monitoring, guardrails, and accountability as any operational workflow. The outcome is measurable and durable: $88K+ in annual savings, up to 90% reduction in handle time, and automated triage coverage across 100 markets.</p>
                <p className="highlight-dark" style={{minHeight:"54px",display:"flex",alignItems:"center"}}>
                  Operator → <Typewriter words={["Optimizer → Systems Architect","Process Excellence → Real Outcomes","Data-Driven → Outcome-Focused"]} />
                </p>
                <p className="subtext">The same structured thinking that drives operational improvement drives how I design, govern, and measure automation — mapping before building, and eliminating waste before adding technology.</p>
                {Object.entries(skills).map(([cat,list])=>(
                  <div key={cat}>
                    <h4 className="section-subtitle">{cat}</h4>
                    <div className="skills-container">{list.map(s=><span className="skill-tag" key={s}>{s}</span>)}</div>
                  </div>
                ))}
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
          {/* ══ EDUCATION ══ */}
          <section id="education" className="section alt-bg">
            <div className="container" style={{flexDirection:"column",gap:"40px"}}>
              <FadeIn direction="up" style={{textAlign:"center"}}>
                <h2><span className="accent">Education</span></h2>
                <p className="subtext" style={{maxWidth:"560px",margin:"0 auto"}}>Formal grounding in computer science and software engineering.</p>
              </FadeIn>
              <div className="timeline">
                {education.map((item,i)=>(
                  <FadeIn direction="left" delay={i*0.12} key={i}>
                    <div className="timeline-item dark-card">
                      <h3>{item.degree}</h3><h4>{item.school}</h4>
                      <p className="subtext" style={{marginTop:"8px"}}>{item.note}</p>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </section>
          {/* ══ CERTIFICATIONS ══ */}
          <section id="certifications" className="section hero-bg">
            <div className="container" style={{flexDirection:"column",gap:"40px"}}>
              <FadeIn direction="up" style={{textAlign:"center"}}>
                <h2>Professional <span className="accent">Certifications</span></h2>
                <p className="subtext" style={{maxWidth:"600px",margin:"0 auto"}}>Verified credentials in artificial intelligence, data, project management, and process excellence — with what each program covered.</p>
              </FadeIn>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:"20px",maxWidth:"1100px",margin:"0 auto",width:"100%"}}>
                {certifications.map((c,i)=>(
                  <FadeIn direction="up" delay={i*0.05} key={i}>
                    <div className="dark-card" style={{display:"flex",flexDirection:"column",gap:"10px",height:"100%"}}>
                      <div className="skills-container" style={{marginBottom:"2px"}}>
                        <span className="skill-tag cert-tag">🏆 {c.issuer}</span>
                      </div>
                      <h3 style={{margin:0}}>{c.title}</h3>
                      <div className="subtext" style={{margin:0,fontSize:"0.85rem",opacity:0.75}}>{c.date}  ·  {c.courses}</div>
                      <p className="subtext" style={{margin:0,flex:1}}>{c.learned}</p>
                      <a href={c.verify} target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{alignSelf:"flex-start",fontSize:"0.85rem",padding:"6px 14px"}}>Verify credential →</a>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </section>
          {/* ══ LEADERSHIP PHILOSOPHY ══ */}
          <section id="leadership" className="section alt-bg">
            <div className="container" style={{flexDirection:"column",gap:"40px"}}>
              <FadeIn direction="up" style={{textAlign:"center"}}>
                <h2>Leadership <span className="accent">Philosophy</span></h2>
                <p className="subtext" style={{maxWidth:"580px",margin:"0 auto"}}>The principles behind how I build teams, run programs, and ship automation.</p>
              </FadeIn>
              <div className="ops-grid">
                {leadership.map((p,i)=>(
                  <FadeIn direction="up" delay={i*0.09} key={i}>
                    <div className="ops-card">
                      <div className="ops-icon">{p.icon}</div>
                      <h3 className="ops-title">{p.title}</h3>
                      <p className="ops-desc">{p.desc}</p>
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
                <p className="subtext" style={{maxWidth:"560px",margin:"0 auto"}}>A structured operating system — Lean foundations, performance governance, process discipline, and automation as the execution layer.</p>
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
                {["Lean / Six Sigma","SIPOC","Value Stream Mapping","Performance & Risk Metric Design","Service-Level Governance","Root Cause Analysis","Kaizen","Process Reengineering","Standard Operating Procedure Development","Change Management","Capacity Planning","Workforce Optimisation"].map(m=>(
                  <span className="method-pill" key={m}>{m}</span>
                ))}
              </div>
            </div>
          </section>
          {/* ══ PROJECTS ══ */}
          <section id="projects" className="section alt-bg">
            <div className="container projects-full-width">
              <FadeIn direction="up">
                <h2>Signature <span className="accent">Artificial Intelligence Agents</span></h2>
                <p className="subtext" style={{maxWidth:"560px",marginBottom:"40px"}}>Production systems built on Lean foundations, governed by performance metrics, and running daily — not prototypes.</p>
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
          {/* ══ TOOLKIT ══ */}
          <section id="toolkit" className="section hero-bg">
            <div className="container" style={{flexDirection:"column",gap:"32px"}}>
              <FadeIn direction="up" style={{textAlign:"center"}}>
                <h2>Technology <span className="accent">Toolkit</span></h2>
                <p className="subtext" style={{maxWidth:"560px",margin:"0 auto"}}>The platforms, languages, and methods I use to design, build, and govern systems.</p>
              </FadeIn>
              <div style={{maxWidth:"960px",margin:"0 auto",width:"100%"}}>
                {Object.entries(techStack).map(([cat,list])=>(
                  <FadeIn direction="up" delay={0.05} key={cat}>
                    <div style={{marginBottom:"24px"}}>
                      <h4 className="section-subtitle">{cat}</h4>
                      <div className="skills-container">{list.map(s=><span className="skill-tag" key={s}>{s}</span>)}</div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </section>
          {/* ══ IMPACT ══ */}
          <section id="impact" className="section alt-bg">
            <div className="container" style={{flexDirection:"column",gap:"40px"}}>
              <FadeIn direction="up" style={{textAlign:"center"}}>
                <h2>Measured <span className="accent">Impact</span></h2>
                <p className="subtext" style={{maxWidth:"500px",margin:"0 auto"}}>Tracked against performance metrics. Not estimated in decks.</p>
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
                <p className="subtext">Open to conversations about artificial intelligence transformation, operations leadership, and building systems that ship at scale.</p>
              </FadeIn>
              <div className="contact-grid">
                <FadeIn direction="left" className="contact-left" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  <ContactForm />
                  <div className="contact-info-cards" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                    <a href="mailto:absreenath212436@gmail.com" className="contact-info-card"><span className="contact-icon">✉</span><div><h4>Email</h4><p>absreenath212436@gmail.com</p></div></a>
                    <a href="https://linkedin.com/in/sreenathab" target="_blank" rel="noopener noreferrer" className="contact-info-card"><span className="contact-icon">in</span><div><h4>LinkedIn</h4><p>linkedin.com/in/sreenathab</p></div></a>
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
              <div className="footer-brand"><span className="footer-logo">Sreenath<span className="accent">.AB</span></span><p className="footer-tagline">Artificial Intelligence Transformation & Operations Excellence Leader</p></div>
              <div className="footer-links">{navItems.map(id=><a href={`#${id}`} key={id}>{id.charAt(0).toUpperCase()+id.slice(1)}</a>)}</div>
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
