import { useState, useEffect, useRef } from "react";
import Logo from "./assets/logo.png";
import BannerImg1 from "./assets/BannerImg1.jpeg";
import BannerImg2 from "./assets/BannerImg2.jpeg";
import BannerImg3 from "./assets/BannerImg3.jpeg";
import BannerVideo from "./assets/BannerVideo.mp4";

// WhatsApp number
const WA_NUMBER = "919566757229";
const openWhatsApp = (message = "") => {
  const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message || "Hi! I'm interested in the Full Stack Development Career Programs at Gateway Software Solutions.")}`;
  window.open(url, "_blank");
};

// Scroll reveal hook
function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    document.querySelectorAll(".reveal, .reveal-left, .reveal-right").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// Counter component
function Counter({ end, suffix = "", duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        let start = 0;
        const step = end / (duration / 16);
        const timer = setInterval(() => {
          start += step;
          if (start >= end) { setCount(end); clearInterval(timer); }
          else setCount(Math.floor(start));
        }, 16);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// Typing animation
function TypingText() {
  const texts = ["Full Stack Developer", "AI Engineer", "React Developer", "Backend Developer", "Job-Ready Coder"];
  const [idx, setIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = texts[idx];
    if (!deleting && displayed.length < current.length) {
      const t = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
      return () => clearTimeout(t);
    } else if (!deleting && displayed.length === current.length) {
      const t = setTimeout(() => setDeleting(true), 1800);
      return () => clearTimeout(t);
    } else if (deleting && displayed.length > 0) {
      const t = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 40);
      return () => clearTimeout(t);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setIdx((i) => (i + 1) % texts.length);
    }
  }, [displayed, deleting, idx]);

  return (
    <span className="text-white font-display font-bold" style={{ textShadow: "0 2px 10px rgba(0,0,0,0.1)", minWidth: "280px", display: "inline-block" }}>
      {displayed}<span style={{ borderRight: "3px solid #fff", animation: "blink 1s step-end infinite" }}>&nbsp;</span>
    </span>
  );
}

// Navbar
function Navbar() {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Curriculum", href: "#curriculum" },
    { label: "Why Us", href: "#why" },
    { label: "Pricing", href: "#pricing" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img src={Logo} alt="Gateway Software Solutions Logo" className="h-12 w-auto object-contain" />
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="font-medium text-gray-700 hover:text-[#00A2A4] text-base transition-colors duration-200">{l.label}</a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <button onClick={() => openWhatsApp()} className="btn-teal text-white text-sm font-semibold px-5 py-2 rounded-full shadow-sm">
            Enroll Now
          </button>
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden text-gray-900 p-2" onClick={() => setOpen(!open)}>
          {open ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-3 shadow-lg">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="text-gray-700 py-2 text-base font-medium border-b border-gray-50" onClick={() => setOpen(false)}>{l.label}</a>
          ))}
          <button onClick={() => { openWhatsApp(); setOpen(false); }} className="btn-teal text-white text-base font-semibold px-5 py-3 rounded-full mt-2 shadow">
            Enroll Now
          </button>
        </div>
      )}
    </nav>
  );
}

// Hero Section
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center hero-curve bg-white pt-20">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-20 pb-32">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* Left content */}
          <div className="flex-1 text-center lg:text-left text-white">
            <div className="inline-flex items-center gap-2 bg-black/10 border border-white/20 text-white px-4 py-1.5 rounded-full mb-6 animate-fade-in text-xs font-display tracking-widest">
              <span className="w-2 h-2 rounded-full bg-yellow-300 animate-pulse" />
              NEW BATCH STARTING SOON
            </div>

            <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-tight mb-4">
              Become a<br />
              <TypingText />
              <br />
              <span>in </span>
              <span className="text-yellow-300">120 Days</span>
            </h1>

            <p className="text-white/90 text-lg sm:text-xl mt-6 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Learn Full Stack + AI  with real projects, expert mentorship, and placement support — even if you're starting from zero.
            </p>

            {/* Tech badges */}
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start mb-8">
              {["React.js", "Node.js", "Python", "MongoDB", "AI Tools", "AWS"].map((tech) => (
                <span key={tech} className="bg-black/10 border border-white/20 text-white font-mono text-xs px-3 py-1 rounded">{tech}</span>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <button
                onClick={() => openWhatsApp()}
                className="bg-white text-[#00A2A4] font-display font-semibold text-base px-8 py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors shadow-lg"
              >
                <span>🚀</span> Start Your Journey
              </button>
              <button
                onClick={() => openWhatsApp("Hi! I'd like to know more about the Full Stack Development Career Programs.")}
                className="bg-black/20 text-white font-semibold text-base px-8 py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-black/30 transition-colors backdrop-blur-sm"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                Chat on WhatsApp
              </button>
            </div>

            {/* Trust line */}
            <div className="flex items-center gap-4 mt-8 justify-center lg:justify-start">
              <div className="flex -space-x-2">
                {["🧑‍💻", "👩‍💻", "🧑‍💻", "👩‍💻"].map((emoji, i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-sm shadow-sm">{emoji}</div>
                ))}
              </div>
              <p className="text-white/80 text-sm"><span className="text-yellow-300 font-semibold">10000+</span> students already enrolled</p>
            </div>
          </div>

          {/* Right — Visual card */}
          <div className="flex-1 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md">
              {/* Main card */}
              <div className="relative z-10 rounded-2xl p-6 bg-white border border-gray-100 shadow-xl glow-teal">
                {/* Header */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <span className="text-gray-400 text-xs font-mono ml-2">gateway-fullstack.js</span>
                </div>

                {/* Code snippet */}
                <div className="font-mono text-sm space-y-1 mb-5">
                  <div><span className="text-[#00A2A4]">const</span> <span className="text-[#054e60]">career</span> <span className="text-gray-700">=</span> <span className="text-green-600">await</span> <span className="text-yellow-600">Gateway</span><span className="text-gray-700">.</span><span className="text-[#00A2A4]">enroll</span><span className="text-gray-700">{"({"}</span></div>
                  <div className="pl-4"><span className="text-[#054e60]">duration</span><span className="text-gray-700">: </span><span className="text-green-600">'120 days'</span><span className="text-gray-700">,</span></div>
                  <div className="pl-4"><span className="text-[#054e60]">skills</span><span className="text-gray-700">: [</span><span className="text-green-600">'FullStack'</span><span className="text-gray-700">, </span><span className="text-green-600">'AI'</span><span className="text-gray-700">],</span></div>
                  <div className="pl-4"><span className="text-[#054e60]">placement</span><span className="text-gray-700">: </span><span className="text-[#00A2A4]">true</span></div>
                  <div><span className="text-gray-700">{"})"}</span></div>
                  <div className="mt-2 text-gray-400">// ✅ career.status: "hired"</div>
                </div>

                {/* Progress bars */}
                <div className="space-y-3">
                  {[
                    { label: "Frontend Development", pct: 92, color: "#00A2A4" },
                    { label: "Backend & APIs", pct: 88, color: "#054e60" },
                    { label: "AI Integration", pct: 85, color: "#00A2A4" },
                    { label: "Interview Ready", pct: 96, color: "#054e60" },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-600">{item.label}</span>
                        <span style={{ color: item.color }} className="font-bold">{item.pct}%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-gray-100">
                        <div className="h-full rounded-full" style={{ width: `${item.pct}%`, background: `linear-gradient(90deg, ${item.color}, ${item.color}88)` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating badge 1 */}
              <div className="absolute -top-4 -right-4 z-20 bg-white border border-gray-100 shadow-lg rounded-xl px-4 py-2 animate-float" style={{ animationDelay: "1s" }}>
                <div className="text-[#00A2A4] font-display font-bold text-lg">120</div>
                <div className="text-gray-500 text-xs">Days</div>
              </div>

              {/* Floating badge 2 */}
              <div className="absolute -bottom-4 -left-4 z-20 bg-white border border-gray-100 shadow-lg rounded-xl px-4 py-2 animate-float" style={{ animationDelay: "2.5s" }}>
                <div className="text-[#054e60] font-display font-bold text-lg">80k</div>
                <div className="text-gray-500 text-xs">Only</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Stats Section
function Stats() {
  useReveal();
  return (
    <section className="py-16 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: "Students Trained", value: 10000, suffix: "+", icon: "🎓" },
            { label: "Years Experience", value: 10, suffix: "+", icon: "🏆" },
            { label: "Placement Rate", value: 94, suffix: "%", icon: "🚀" },
            { label: "Expert Trainers", value: 15, suffix: "+", icon: "👨‍💻" },
          ].map((stat, i) => (
            <div key={stat.label} className={`reveal stagger-${i + 1} text-center`}>
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="font-display font-bold text-3xl sm:text-4xl text-gradient-mixed">
                <Counter end={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-gray-500 text-sm mt-1 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Problem Section
function Problem() {
  useReveal();
  return (
    <section id="about" className="py-24 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left */}
          <div className="flex-1 reveal-left">
            <div className="pill-tag inline-block mb-4">THE PROBLEM</div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-gray-900 mb-6 leading-tight">
              Why Most Students <span className="text-gradient-teal">Fail</span> to Get IT Jobs
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Thousands of graduates learn coding but never land jobs. The gap isn't talent — it's the wrong approach to learning.
            </p>
            <div className="space-y-4">
              {[
                { icon: "❌", text: "Only theory, zero practical skills" },
                { icon: "❌", text: "No real-world projects in portfolio" },
                { icon: "❌", text: "No mock interviews or prep" },
                { icon: "❌", text: "No mentorship or career guidance" },
                { icon: "❌", text: "Outdated syllabus from 5 years ago" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3 bg-red-50 border border-red-100 rounded-xl p-4">
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-gray-700 font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Solution teaser */}
          <div className="flex-1 reveal-right">
            <div className="pill-tag inline-block mb-4" style={{ background: "rgba(5, 78, 96, 0.1)", borderColor: "rgba(5, 78, 96, 0.2)", color: "#054e60" }}>THE SOLUTION</div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-gray-900 mb-6 leading-tight">
              Gateway's <span className="text-gradient-darkTeal">Career Transformation</span> System
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              We don't just teach code — we engineer job-ready developers through hands-on projects and real industry mentorship.
            </p>
            <div className="space-y-4">
              {[
                { icon: "✅", text: "Industry-relevant Full Stack + AI  curriculum" },
                { icon: "✅", text: "Real-time project portfolio you own" },
                { icon: "✅", text: "Personal mentorship, not mass training" },
                { icon: "✅", text: "Mock interviews with real questions" },
                { icon: "✅", text: "Placement assistance until you're hired" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3 bg-green-50 border border-green-100 rounded-xl p-4">
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-gray-700 font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Curriculum Section
function Curriculum() {
  useReveal();
  const modules = [
    {
      week: "Week 1–5",
      title: "Frontend Foundations",
      color: "#00A2A4",
      icon: "🎨",
      topics: ["HTML5 & CSS3 Mastery", "JavaScript ES6+", "React.js & Hooks", "Responsive Design", "Tailwind CSS"],
    },
    {
      week: "Week 5–10",
      title: "Backend Development",
      color: "#054e60",
      icon: "⚙️",
      topics: ["Node.js & Express", "REST API Design", "MongoDB & SQL", "Authentication & JWT", "File uploads & Cloud"],
    },
    {
      week: "Week 10–15",
      title: "AI Tools Integration",
      color: "#00A2A4",
      icon: "🤖",
      topics: ["OpenAI API Integration", "Prompt Engineering", "LangChain Basics", "AI-Powered Apps", "Python for AI"],
    },
    {
      week: "Week 16–18",
      title: "Career Launchpad",
      color: "#054e60",
      icon: "🚀",
      topics: ["Real Time Project Assessment", "GitHub Portfolio", "Resume Crafting", "Mock Interviews", "Job Application Strategy"],
    },
  ];

  return (
    <section id="curriculum" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16 reveal">
          <div className="pill-tag inline-block mb-4">CURRICULUM</div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-gray-900 mb-4">
            What You'll <span className="text-gradient-mixed">Master</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">120 days. 4 power-packed modules. One complete career transformation.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {modules.map((mod, i) => (
            <div
              key={mod.title}
              className={`reveal card-hover stagger-${i + 1} rounded-2xl p-6 bg-white border border-gray-100 shadow-md relative overflow-hidden group`}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{
                background: `radial-gradient(ellipse at top left, ${mod.color}15, transparent 60%)`
              }} />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="text-xs font-mono font-bold" style={{ color: mod.color }}>{mod.week}</span>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-2xl">{mod.icon}</span>
                      <h3 className="font-display font-bold text-gray-900 text-xl">{mod.title}</h3>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-display font-bold" style={{ background: `${mod.color}20`, color: mod.color }}>
                    {i + 1}
                  </div>
                </div>

                <div className="h-px mb-4" style={{ background: `linear-gradient(90deg, ${mod.color}40, transparent)` }} />

                <ul className="space-y-2">
                  {mod.topics.map((topic) => (
                    <li key={topic} className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: mod.color }} />
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-10 reveal">
          <button onClick={() => openWhatsApp("Hi! I'm interested in the Full Stack + AI Career Programs curriculum.")} className="btn-teal text-white font-display font-semibold px-10 py-4 rounded-xl text-lg shadow-lg">
            Entroll Now →
          </button>
        </div>
      </div>
    </section>
  );
}

// Why Us — Zigzag
function WhyUs() {
  useReveal();
  const points = [
    {
      img: BannerImg1,
      icon: "🏆",
      title: "10+ Years of Real IT Training",
      desc: "Not a startup experiment — we've been training job-ready developers since before AI was mainstream. Our curriculum evolves with the industry.",
      color: "#00A2A4",
      flip: false,
    },
    {
      img: BannerImg2,
      icon: "🤝",
      title: "Personal Mentorship — Not Mass Training",
      desc: "Every student gets dedicated attention. No 500-student batches where you get lost. Our trainers know your name, your progress, your goals.",
      color: "#054e60",
      flip: true,
    },
    {
      img: BannerImg3,
      icon: "💼",
      title: "Real Projects You Can Show Off",
      desc: "You'll build 5+ production-level projects: e-commerce platforms, AI chatbots, REST APIs. Your GitHub portfolio speaks louder than any certificate.",
      color: "#00A2A4",
      flip: false,
    },
    {
      img: BannerImg1,
      icon: "🎯",
      title: "Placement Until You're Hired",
      desc: "We don't disappear after the Career Programs ends. We work with you on resumes, mock interviews, and job applications until you land your first role.",
      color: "#054e60",
      flip: true,
    },
  ];

  return (
    <section id="why" className="py-24 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16 reveal">
          <div className="pill-tag inline-block mb-4">WHY GATEWAY</div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-gray-900 mb-4">
            Not Just a Career Programs — A <span className="text-gradient-teal">Career System</span>
          </h2>
        </div>

        <div className="space-y-20">
          {points.map((p, i) => (
            <div key={p.title} className={`flex flex-col ${p.flip ? "lg:flex-row-reverse" : "lg:flex-row"} items-center gap-12`}>
              <div className={`flex-1 flex justify-center ${p.flip ? "reveal-right" : "reveal-left"}`}>
                <div className="relative">
                  <div className="w-48 h-48 sm:w-64 sm:h-64 rounded-3xl flex items-center justify-center animate-float bg-white shadow-xl overflow-hidden relative" style={{
                    border: `1px solid ${p.color}30`,
                    animationDelay: `${i * 0.8}s`
                  }}>
                    {p.img ? (
                      <img src={p.img} alt={p.title} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-7xl sm:text-8xl">{p.icon}</span>
                    )}
                  </div>
                  <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-white shadow-md" style={{ background: p.color }}>
                    {i + 1}
                  </div>
                </div>
              </div>

              <div className={`flex-1 ${p.flip ? "reveal-left" : "reveal-right"} text-center lg:text-left`}>
                <h3 className="font-display font-bold text-2xl sm:text-3xl text-gray-900 mb-4">{p.title}</h3>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">{p.desc}</p>
                <div className="h-1 w-16 rounded-full mx-auto lg:mx-0" style={{ background: `linear-gradient(90deg, ${p.color}, transparent)` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// InvestInSection (Video)
function InvestSection() {
  useReveal();
  return (
    <section className="py-24 bg-white overflow-hidden border-t border-b border-gray-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <div className="reveal">
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-gray-900 mb-8 leading-tight">
            Invest in Skills Today, <span className="text-gradient-teal">Earn Success Tomorrow</span>
          </h2>
          <div className="rounded-3xl overflow-hidden shadow-2xl relative bg-slate-900 border border-gray-200">
            <video src={BannerVideo} autoPlay loop muted controls playsInline className="w-full h-auto max-h-[80vh] object-contain" />
          </div>
        </div>
      </div>
    </section>
  );
}

// Company Testimonials (Slider)
function CompanyTestimonials() {
  useReveal();
  const testdata = [
    { name: "Sathyanarayan", company: "TCS", role: "System Engineer" },
    { name: "Kiruthika", company: "Aequor", role: "Senior Talent Acquisition Specialist" },
    { name: "Mohindar", company: "Avanze Tech Labs", role: "Senior Software Engineer" },
    { name: "Vignesh", company: "Novak Technology Solution pvt. ltd.", role: "Senior Software Engineer" },
    { name: "Rajesh Natarajan", company: "Quest Global", role: "Technical Lead" },
  ];

  return (
    <section className="py-24 bg-slate-50 overflow-hidden border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16 reveal">
          <div className="pill-tag inline-block mb-4">ALUMNI PLACEMENTS</div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-gray-900 mb-4">
            Where Our Trainee's <span className="text-gradient-teal">Placed</span>
          </h2>
        </div>

        <div className="reveal relative w-full">
          {/* Simple horizontal scroll area for cards. Snap-x applied for slider-like experience */}
          <div className="flex gap-6 overflow-x-auto pb-8 pt-4 px-2 snap-x snap-mandatory slider-scrollbar">
            {testdata.map((t, i) => (
              <div key={i} className="snap-center shrink-0 w-[300px] bg-white rounded-3xl p-8 shadow-[0_4px_20px_rgb(0,0,0,0.05)] border border-gray-100 flex flex-col items-center text-center transition-transform hover:-translate-y-2">
                <div className="w-16 h-16 rounded-full bg-teal-50 flex items-center justify-center text-2xl mb-4 border border-teal-100">🧑‍💼</div>
                <h3 className="font-display font-bold text-gray-900 text-lg mb-1">{t.name}</h3>
                <div className="text-gray-500 font-medium text-sm mb-4 h-10">{t.role}</div>
                <div className="mt-auto w-full px-4 py-3 bg-[#054e60] text-white rounded-xl text-xs font-bold uppercase tracking-widest">{t.company}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Testimonials
function Testimonials() {
  useReveal();
  const testimonials = [
    { name: "Karthik R.", role: "Junior Developer @ TCS", text: "Gateway transformed me from zero to a job in 3 months. The mentorship and project-based learning was unlike anything I'd tried before.", emoji: "🧑‍💻", rating: 5 },
    { name: "Priya S.", role: "React Developer @ Startup", text: "I was scared to start coding at 28. Gateway's personal mentorship made it possible. Got placed within 2 weeks of finishing!", emoji: "👩‍💻", rating: 5 },
    { name: "Arun M.", role: "Full Stack Engineer", text: "The AI integration module is gold. I could showcase real AI projects in interviews which set me apart from every other candidate.", emoji: "🧑‍💼", rating: 5 },
    { name: "Divya K.", role: "Backend Developer @ Infosys", text: "Not just theory — I built 6 real projects. My GitHub profile alone got me 3 interview calls in the first week of applying.", emoji: "👩‍💼", rating: 5 },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16 reveal">
          <div className="pill-tag inline-block mb-4">STUDENT STORIES</div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-gray-900 mb-4">
            Real Results, <span className="text-gradient-darkTeal">Real People</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t, i) => (
            <div key={t.name} className={`reveal card-hover stagger-${i + 1} rounded-2xl p-6 bg-white border border-gray-100 shadow flex flex-col`}>
              <div className="flex gap-1 mb-4">
                {[...Array(t.rating)].map((_, j) => <span key={j} className="text-[#00A2A4] text-sm">★</span>)}
              </div>
              <p className="text-gray-600 text-sm leading-relaxed flex-1 mb-4">"{t.text}"</p>
              <div className="flex items-center gap-3 border-t border-gray-50 pt-4">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-xl">{t.emoji}</div>
                <div>
                  <div className="text-gray-900 font-semibold text-sm">{t.name}</div>
                  <div className="text-[#00A2A4] text-xs font-medium">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Pricing Section
function Pricing() {
  useReveal();
  return (
    <section id="pricing" className="py-24 bg-slate-50 overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 reveal">
          <div className="pill-tag inline-block mb-4">PRICING</div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-gray-900 mb-4">
            One Investment, <span className="text-gradient-teal">Lifelong Career</span>
          </h2>
        </div>

        <div className="reveal relative rounded-3xl overflow-hidden shadow-2xl bg-white border border-gray-100">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1.5" style={{ background: "linear-gradient(90deg, transparent, #00A2A4, #054e60, transparent)" }} />

          <div className="p-8 sm:p-12">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-8">
              <div>
                <div className="text-gray-400 text-base line-through mb-1">Market Price: ₹125,000</div>
                <div className="font-display font-bold text-5xl sm:text-6xl text-gradient-teal">₹80,000</div>
                <div className="text-gray-500 text-sm mt-1 font-medium">One-time payment — No hidden fees</div>
              </div>
              <div className="bg-[#00A2A4] text-white font-display font-bold text-xl px-6 py-3 rounded-2xl rotate-3 hover:rotate-0 transition-transform shadow-lg">
                SAVE ₹45,000 🔥
              </div>
            </div>

            <div className="section-divider mb-8" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {[
                "✅ Full 120-Day Training",
                "✅ Full Stack + AI  Curriculum",
                "✅ 5+ Real-Time Projects",
                "✅ Personal Mentorship",
                "✅ Resume Templates",
                "✅ Interview Prep Kit",
                "✅ Mock Interview Sessions",
                "✅ Placement Assistance",
                "✅ Career Programs Certificate",
                "✅ Lifetime Community Access",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-gray-700 text-sm font-medium">{item}</div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => openWhatsApp("Hi! I want to enroll in the Full Stack Career Programs for 80,000.")} className="btn-teal text-white font-display font-bold text-lg px-10 py-4 rounded-xl flex-1 sm:flex-none shadow-lg">
                🚀 Enroll Now — ₹80,000
              </button>
              <button onClick={() => openWhatsApp("Hi! I want to know more about the Full Stack Career Programs before enrolling.")} className="btn-darkTeal text-white font-semibold text-base px-8 py-4 rounded-xl flex-1 sm:flex-none shadow-md">
                💬 Ask a Question
              </button>
            </div>

            <p className="text-center text-gray-400 text-xs mt-4">⏳ Limited seats available — Batch starting soon</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// Enquiry Form Section
function EnquiryForm() {
  useReveal();
  const [form, setForm] = useState({ name: "", phone: "", email: "", CareerPrograms: "Full Stack Development", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    if (!form.name || !form.phone) {
      alert("Please fill in your name and phone number.");
      return;
    }
    const msg = `🎓 *New Career Programs Enquiry*\n\n👤 *Name:* ${form.name}\n📱 *Phone:* ${form.phone}\n📧 *Email:* ${form.email || "Not provided"}\n📚 *Career Programs:* ${form.CareerPrograms
      }\n💬 * Message:* ${form.message || "No message"} \n\nI'd like to know more about the Career Programs!`;
    openWhatsApp(msg);
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          <div className="flex-1 reveal-left">
            <div className="pill-tag inline-block mb-4">GET IN TOUCH</div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-gray-900 mb-6 leading-tight">
              Start Your Journey <br /><span className="text-gradient-teal">Today</span>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Fill out the form and we'll reach out on WhatsApp with batch details, fee structure, and answers to all your questions.
            </p>

            <div className="space-y-4">
              {[
                { icon: "📍", label: "Location", value: "Coimbatore, Chennai, Madurai, Erode, Tamil Nadu" },
                { icon: "📱", label: "WhatsApp / Call", value: "+91 95667 57229, +91 95663 57137, +91 95660 01174, +91 73970 78885" },
                { icon: "📱", label: "Email", value: "learn@gatewaysoftwaresolutions.com" },
                { icon: "⏰", label: "Mode", value: "Online & Offline" },
                { icon: "📅", label: "Duration", value: "120 Days (2–3 hrs/day)" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-lg">{item.icon}</div>
                  <div>
                    <div className="text-gray-400 text-xs font-semibold">{item.label}</div>
                    <div className="text-gray-900 text-sm font-bold">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>


          </div>

          <div className="flex-1 reveal-right w-full">
            {submitted ? (
              <div className="rounded-2xl p-10 text-center bg-white border border-green-500 shadow-lg">
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="font-display font-bold text-2xl text-gray-900 mb-2">Enquiry Sent!</h3>
                <p className="text-gray-500 mb-6">We've opened WhatsApp with your details. Our team will respond shortly.</p>
                <button onClick={() => setSubmitted(false)} className="btn-teal text-white font-semibold px-6 py-3 rounded-xl">Send Another Enquiry</button>
              </div>
            ) : (
              <div className="rounded-2xl p-6 sm:p-8 bg-white border border-gray-100 shadow-2xl glow-teal">
                <h3 className="font-display font-bold text-xl text-gray-900 mb-6">Book a Free Counselling Session</h3>

                <div className="space-y-4">
                  <div>
                    <label className="text-gray-600 text-sm mb-1.5 block font-medium">Full Name *</label>
                    <input name="name" value={form.name} onChange={handleChange} placeholder="Your full name" className="form-input w-full rounded-xl px-4 py-3 text-sm" />
                  </div>
                  <div>
                    <label className="text-gray-600 text-sm mb-1.5 block font-medium">WhatsApp Number *</label>
                    <input name="phone" value={form.phone} onChange={handleChange} placeholder="+91 XXXXX XXXXX" className="form-input w-full rounded-xl px-4 py-3 text-sm" />
                  </div>
                  <div>
                    <label className="text-gray-600 text-sm mb-1.5 block font-medium">Email Address</label>
                    <input name="email" value={form.email} onChange={handleChange} placeholder="your@email.com" className="form-input w-full rounded-xl px-4 py-3 text-sm" />
                  </div>
                  <div>
                    <label className="text-gray-600 text-sm mb-1.5 block font-medium">Career Programs of Interest</label>
                    <select name="CareerPrograms" value={form.CareerPrograms} onChange={handleChange} className="form-input w-full rounded-xl px-4 py-3 text-sm font-medium">
                      <option>Full Stack Development</option>
                      <option>Full Stack + AI  (Combined)</option>
                      <option>Frontend Only (React)</option>
                      <option>Backend Only (Node.js)</option>
                      <option>UI/UX Design</option>
                      <option>Digital Marketing</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-gray-600 text-sm mb-1.5 block font-medium">Your Message (Optional)</label>
                    <textarea name="message" value={form.message} onChange={handleChange} placeholder="Any questions or specific requirements..." rows={3} className="form-input w-full rounded-xl px-4 py-3 text-sm resize-none" />
                  </div>

                  <button onClick={handleSubmit} className="btn-teal w-full text-white font-display font-bold text-base py-4 rounded-xl flex items-center justify-center gap-2 mt-2 shadow-lg">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                    Send Enquiry on WhatsApp
                  </button>
                  <p className="text-center text-gray-400 text-xs mt-2">Your data is safe and will only be used to contact you about this Career Programs.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section >
  );
}

// Footer
function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-gray-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src={Logo} alt="Gateway Software Solutions Logo" className="h-12 w-auto object-contain" />

          </div>
          <div className="flex gap-6 text-gray-500 text-sm font-medium">
            <a href="#about" className="hover:text-[#00A2A4] transition-colors">About</a>
            <a href="#curriculum" className="hover:text-[#00A2A4] transition-colors">Curriculum</a>
            <a href="#pricing" className="hover:text-[#00A2A4] transition-colors">Pricing</a>
            <a href="#contact" className="hover:text-[#00A2A4] transition-colors">Contact</a>
          </div>
          <button onClick={() => openWhatsApp()} className="btn-teal text-white text-sm font-semibold px-5 py-2 rounded-full flex items-center gap-2 shadow-sm">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
            WhatsApp Us
          </button>
        </div>
        <div className="section-divider my-6" />
        <p className="text-center text-gray-400 text-xs font-medium">© 2026 Gateway Software Solutions. All rights reserved.</p>
      </div>
    </footer>
  );
}

// WhatsApp float button
function WhatsAppFloat() {
  return (
    <a
      href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hi! I'm interested in the Full Stack Development Career Programs.")}`}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
      style={{ background: "#25D366" }}
      title="Chat on WhatsApp"
    >
      <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    </a>
  );
}

export default function App() {
  useReveal();
  return (
    <div className="relative text-gray-900 bg-white min-h-screen">
      <Navbar />
      <Hero />
      <Stats />
      <Problem />
      <Curriculum />
      <WhyUs />
      <InvestSection />
      <CompanyTestimonials />
      <Testimonials />
      <Pricing />
      <EnquiryForm />
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
