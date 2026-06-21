"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DotGlobeHero } from "@/components/ui/globe-hero";
import {
  HoverSlider,
  HoverSliderImage,
  HoverSliderImageWrap,
  TextStaggerHover
} from "@/components/ui/animated-slideshow";
import {
  ArrowRight,
  Check,
  X,
  Menu,
  Sun,
  Moon,
  Workflow,
  Calendar,
  Users,
  TrendingUp,
  Zap,
  AlertTriangle,
  FileText,
  BarChart3,
  Lock,
  BookOpen,
  Plus,
  Minus,
  Send,
  CheckCircle2,
  Mail,
  Phone,
  Building,
  Activity,
  Layers,
  ArrowUpRight,
  Smartphone
} from "lucide-react";

// Types for components
interface RoomItem {
  title: string;
  image: string;
  price: string;
  desc: string;
}

export default function Home() {
  const [isDark, setIsDark] = useState(false);
  const [activeProjectModal, setActiveProjectModal] = useState<string | null>(null);
  const [beforeAfterState, setBeforeAfterState] = useState<"before" | "after">("before");
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(null);
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    bottleneck: "",
  });

  // Modal active states
  const [lspStayRoom, setLspStayRoom] = useState(0);
  const [trainingLang, setTrainingLang] = useState<"en" | "tn">("en");
  const [trainingEvidenceSubmitted, setTrainingEvidenceSubmitted] = useState(false);
  const [opsSimStep, setOpsSimStep] = useState<number>(0);
  const [opsSimLogs, setOpsSimLogs] = useState<string[]>([]);
  const [isSimulating, setIsSimulating] = useState(false);

  // Initialize theme from localStorage or system preferences
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/consultation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setFormStatus("success");
        setFormData({
          name: "",
          company: "",
          email: "",
          phone: "",
          bottleneck: "",
        });
      } else {
        setFormStatus("error");
        setErrorMessage(result.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setFormStatus("error");
      setErrorMessage("Network error. Please check your connection.");
    }
  };

  // Scroll helper
  const scrollToId = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // LSP Stay Room details
  const lspRooms: RoomItem[] = [
    {
      title: "Deluxe Bedroom",
      image: "/images/deluxe_bedroom.png",
      price: "P1,200/night",
      desc: "Plush king-size bed, private balcony access, smart climate control.",
    },
    {
      title: "Private Pool",
      image: "/images/pool_large.png",
      price: "Included",
      desc: "Tempered infinity pool, designer loungers, ambient evening lighting.",
    },
    {
      title: "Gourmet Kitchen",
      image: "/images/kitchen_large.png",
      price: "Self-catering",
      desc: "Premium marble island, state-of-the-art appliances, custom pantry.",
    },
    {
      title: "Standard Lounge",
      image: "/images/standard_lounge.png",
      price: "Cozy space",
      desc: "Designer sofas, fireplace, acoustics-tuned layout.",
    },
  ];

  // Training Portal translation helper
  const trainingText = {
    en: {
      welcome: "Welcome back,",
      subtitle: "Here is your path to independence. Focus on doing, not consuming.",
      track: "Graduate Launchpad (Agency Track)",
      action: "Complete the Sefalana Wholesale customer audit mission for your agency.",
      evidenceLabel: "Submit client audit PDF or spreadsheet link below",
      placeholder: "https://docs.google.com/spreadsheets/d/...",
      submit: "Submit Evidence",
      submitted: "Evidence submitted! Awaiting AI peer verification.",
      cap1: "Customer Audit",
      cap2: "CIPA Registration Setup",
      cap3: "Brand Identity Layout",
      statusCompleted: "Verified",
      statusPending: "Awaiting Audit",
      statusLocked: "Locked",
    },
    tn: {
      welcome: "Amogelesega gape,",
      subtitle: "Tsela ya gago ya go itshetsa. Tsepama mo go direng, e seng go bala fela.",
      track: "Graduate Launchpad (Mekgatlho)",
      action: "Fetsa tiro ya go tlhatlhoba modiredi kwa Sefalana Wholesale ya lekgotla la lona.",
      evidenceLabel: "Rongola bosupi jwa tiro ya gago ya tshekatsheko fela fa tlase",
      placeholder: "https://docs.google.com/spreadsheets/d/...",
      submit: "Rongola Bosupi",
      submitted: "Bosupi bo amogetswe! Bo letetse netefatso ya AI.",
      cap1: "Tlhatlhoba Modiredi",
      cap2: "Kwadiso ya CIPA",
      cap3: "Thulaganyo ya Letshwao",
      statusCompleted: "Netefaditswe",
      statusPending: "E a letelwa",
      statusLocked: "E tswetswe",
    }
  };

  // Run business ops workflow simulator
  const runOpsSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setOpsSimStep(1);
    setOpsSimLogs(["[09:00 AM] Scheduled cron: Triggering CIPA registration verification API."]);

    setTimeout(() => {
      setOpsSimStep(2);
      setOpsSimLogs(prev => [
        ...prev,
        "[09:02 AM] API Success: CIPA registration found. ID: BW000491823.",
        "[09:02 AM] Status database: Upgraded 'CIPA Task' from 'Pending' to 'Verified'."
      ]);
    }, 1500);

    setTimeout(() => {
      setOpsSimStep(3);
      setOpsSimLogs(prev => [
        ...prev,
        "[09:03 AM] Dispatching notification: CIPA verified successfully.",
        "[09:03 AM] WhatsApp Notification sent to Thabo: 'CIPA is verified. Next step is unlocked.'"
      ]);
    }, 3000);

    setTimeout(() => {
      setOpsSimStep(4);
      setOpsSimLogs(prev => [
        ...prev,
        "[09:04 AM] Generating system tasks: Launching poultry feed logs.",
        "[09:04 AM] Assigned Step 2: 'Chicken Coop Construction Checklist' now active."
      ]);
      setIsSimulating(false);
    }, 4500);
  };

  const resetOpsSimulation = () => {
    setOpsSimStep(0);
    setOpsSimLogs([]);
    setIsSimulating(false);
  };

  // Slideshow data for What We Build Section (using verified high-quality unsplash images)
  const whatWeBuildSlides = [
    {
      id: "slide-1",
      title: "training portals",
      imageUrl: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "slide-2",
      title: "booking systems",
      imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "slide-3",
      title: "CRM systems",
      imageUrl: "https://images.unsplash.com/photo-1552581230-c01bc9148c50?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "slide-4",
      title: "internal dashboards",
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "slide-5",
      title: "workflow automation",
      imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "slide-6",
      title: "reporting platforms",
      imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-primary/20 transition-colors duration-300">
      
      {/* 1. Header Section */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border transition-colors">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-primary to-primary/60 flex items-center justify-center text-primary-foreground font-heading font-black text-xl shadow-md shadow-primary/20">
              F
            </div>
            <div>
              <span className="font-heading font-bold text-lg tracking-tight bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                FEZ DIGITAL
              </span>
              <p className="text-[10px] text-primary font-semibold tracking-widest uppercase">
                Systems Studio
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <button onClick={() => scrollToId("proof")} className="hover:text-primary transition-colors cursor-pointer">
              Concepts
            </button>
            <button onClick={() => scrollToId("what-we-build")} className="hover:text-primary transition-colors cursor-pointer">
              What We Build
            </button>
            <button onClick={() => scrollToId("before-after")} className="hover:text-primary transition-colors cursor-pointer">
              Before & After
            </button>
            <button onClick={() => scrollToId("process")} className="hover:text-primary transition-colors cursor-pointer">
              Process
            </button>
            <button onClick={() => scrollToId("pricing")} className="hover:text-primary transition-colors cursor-pointer">
              Pricing
            </button>
            <button onClick={() => scrollToId("faq")} className="hover:text-primary transition-colors cursor-pointer">
              FAQ
            </button>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg border border-border hover:bg-muted transition-colors text-muted-foreground hover:text-foreground cursor-pointer"
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={() => scrollToId("consultation")}
              className="px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-all shadow-sm cursor-pointer"
            >
              Book Consultation
            </button>
          </div>

          {/* Mobile Menu Actions */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg border border-border hover:bg-muted transition-colors"
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg border border-border hover:bg-muted transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Panel */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-background px-6 py-6 flex flex-col gap-4 animate-in fade-in slide-in-from-top-5 duration-200">
            <button onClick={() => scrollToId("proof")} className="text-left py-2 font-medium hover:text-primary">Concepts</button>
            <button onClick={() => scrollToId("what-we-build")} className="text-left py-2 font-medium hover:text-primary">What We Build</button>
            <button onClick={() => scrollToId("before-after")} className="text-left py-2 font-medium hover:text-primary">Before & After</button>
            <button onClick={() => scrollToId("process")} className="text-left py-2 font-medium hover:text-primary">Process</button>
            <button onClick={() => scrollToId("pricing")} className="text-left py-2 font-medium hover:text-primary">Pricing</button>
            <button onClick={() => scrollToId("faq")} className="text-left py-2 font-medium hover:text-primary">FAQ</button>
            <button
              onClick={() => scrollToId("consultation")}
              className="w-full mt-2 py-3 rounded-lg bg-primary text-primary-foreground text-center font-semibold"
            >
              Book Consultation
            </button>
          </div>
        )}
      </header>

      {/* 2. Interactive Globe Hero Section (Warm Plaster Theme) */}
      <DotGlobeHero
        rotationSpeed={0.004}
        className="bg-gradient-to-br from-background via-background/95 to-muted/20 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-background/30" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary/3 rounded-full blur-3xl animate-pulse" />
        
        <div className="relative z-10 text-center space-y-10 max-w-5xl mx-auto px-6 py-12">
          
          {/* Pulsating label tag */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 border border-primary/30 backdrop-blur-xl shadow-2xl"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/10 via-transparent to-primary/10 animate-pulse" />
            <div className="w-2 h-2 bg-primary rounded-full animate-ping" />
            <span className="relative z-10 text-xs font-bold text-primary tracking-widest uppercase">FEZ DIGITAL — SYSTEMS STUDIO</span>
            <div className="w-2 h-2 bg-primary rounded-full animate-ping" />
          </motion.div>
          
          {/* Large Hero Title */}
          <div className="space-y-6">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.85] select-none font-heading"
            >
              <span className="block font-light text-foreground/70 mb-3 text-2xl sm:text-4xl md:text-5xl lg:text-6xl">
                Business Systems
              </span>
              <span className="block relative">
                <span className="bg-gradient-to-br from-primary via-primary to-primary/60 bg-clip-text text-transparent font-black relative z-10">
                  Replace Spreadsheets
                </span>
                <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary/60 bg-clip-text text-transparent font-black blur-2xl opacity-50 scale-105 select-none">
                  Replace Spreadsheets
                </div>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.5, delay: 1.2, ease: "easeOut" }}
                  className="absolute -bottom-4 left-0 h-2 bg-gradient-to-r from-primary via-primary/80 to-transparent rounded-full shadow-lg shadow-primary/50"
                />
              </span>
            </motion.h1>
          </div>
          
          {/* Subtitle */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="max-w-3xl mx-auto space-y-4"
          >
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground leading-relaxed font-medium">
              Custom platforms for training, bookings, operations, and{" "}
              <span className="text-foreground font-semibold bg-gradient-to-r from-primary/20 to-primary/10 px-2 py-1 rounded-md">
                customer workflows.
              </span>
            </p>
            <p className="text-sm sm:text-base text-muted-foreground/80 leading-relaxed max-w-2xl mx-auto">
              We design custom platforms built around how you already work. Focus on operations, automate admin work, and replace sheets/WhatsApp clusters.
            </p>
          </motion.div>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row gap-5 justify-center items-center pt-4"
          >
            <motion.button
              onClick={() => scrollToId("proof")}
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 20px 40px rgba(0,0,0,0.05), 0 0 25px rgba(201, 100, 66, 0.2)",
                y: -2
              }}
              whileTap={{ scale: 0.98 }}
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary via-primary to-primary/90 text-primary-foreground rounded-xl font-semibold text-lg shadow-xl transition-all duration-500 overflow-hidden border border-primary/20 cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="relative z-10 tracking-wide">See Real Concepts</span>
              <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
            </motion.button>
            
            <motion.button
              onClick={() => scrollToId("consultation")}
              whileHover={{ 
                scale: 1.05,
                backgroundColor: "var(--accent)",
                borderColor: "var(--primary)",
                boxShadow: "0 15px 30px rgba(0,0,0,0.02), 0 0 15px rgba(201, 100, 66, 0.05)",
                y: -2
              }}
              whileTap={{ scale: 0.98 }}
              className="group relative inline-flex items-center gap-3 px-8 py-4 border-2 border-border/80 rounded-xl font-semibold text-lg transition-all duration-500 backdrop-blur-xl bg-background/60 hover:bg-background/90 shadow-lg overflow-hidden cursor-pointer"
            >
              <Zap className="relative z-10 w-5 h-5 text-primary group-hover:scale-110 group-hover:rotate-6 transition-all duration-300" />
              <span className="relative z-10 tracking-wide">Book Consultation</span>
            </motion.button>
          </motion.div>
        </div>
      </DotGlobeHero>

      {/* 3. Proof Section (Stacked Project Cards) */}
      <section id="proof" className="py-24 border-t border-border bg-background transition-colors duration-300">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-16 text-left">
            <span className="text-xs font-semibold text-primary uppercase tracking-widest block mb-2">
              Working Demos
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight font-heading">
              Our Concept Platforms
            </h2>
            <p className="text-muted-foreground mt-2 font-sans max-w-xl">
              We sell operational improvement. No mockup graphics—explore our working software concepts.
            </p>
          </div>

          <div className="flex flex-col gap-10">
            {/* Card A: LSP Stay */}
            <div className="group border border-border rounded-2xl bg-muted/30 p-6 md:p-8 flex flex-col md:flex-row items-center gap-8 hover:border-primary/40 transition-all duration-300">
              <div className="flex-1 space-y-4 text-left">
                <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium uppercase tracking-wider">
                  Concept / Prototype
                </span>
                <h3 className="text-2xl font-bold font-heading">
                  LSP Stay
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed font-sans">
                  A high-end luxury hospitality booking platform with an integrated 3D carousel room showcase, calendar logic, and customized reservation system.
                </p>
                <div className="pt-2">
                  <p className="text-xs uppercase font-semibold tracking-wider text-muted-foreground">Business Outcome:</p>
                  <p className="text-sm font-medium mt-0.5">Luxury booking experience & higher direct sales</p>
                </div>
                <button
                  onClick={() => setActiveProjectModal("lsp-stay")}
                  className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-colors cursor-pointer"
                >
                  View Experience
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
              <div className="w-full md:w-80 h-52 rounded-xl overflow-hidden border border-border bg-background relative shadow-inner flex items-center justify-center">
                <img
                  src="/images/deluxe_bedroom.png"
                  alt="LSP Stay Deluxe Room Mockup"
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                  <div className="text-white text-xs font-semibold">Deluxe Bedroom concept</div>
                </div>
              </div>
            </div>

            {/* Card B: Staff Training Portal */}
            <div className="group border border-border rounded-2xl bg-muted/30 p-6 md:p-8 flex flex-col md:flex-row items-center gap-8 hover:border-primary/40 transition-all duration-300">
              <div className="flex-1 space-y-4 text-left">
                <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium uppercase tracking-wider">
                  Operations Platform Concept
                </span>
                <h3 className="text-2xl font-bold font-heading">
                  Staff Training Portal
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed font-sans">
                  A bilingual (English & Setswana) training management system dashboard that tracks student checklist milestones, handles evidence uploads, and processes admin review.
                </p>
                <div className="pt-2">
                  <p className="text-xs uppercase font-semibold tracking-wider text-muted-foreground">Business Outcome:</p>
                  <p className="text-sm font-medium mt-0.5">Training visibility & centralized task execution</p>
                </div>
                <button
                  onClick={() => setActiveProjectModal("training-portal")}
                  className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-colors cursor-pointer"
                >
                  View Workflow
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
              <div className="w-full md:w-80 h-52 rounded-xl border border-border bg-background p-4 flex flex-col justify-between shadow-inner relative group-hover:border-primary/30 transition-colors">
                <div className="flex items-center justify-between border-b border-border pb-2">
                  <span className="text-[10px] font-bold text-primary">FEZ PLATFORM</span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground">Setswana active</span>
                </div>
                <div className="space-y-1.5 py-2 text-left">
                  <p className="text-xs font-bold text-foreground">Amogelesega gape, Tumisang</p>
                  <div className="w-full bg-muted h-2.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full w-[66%]"></div>
                  </div>
                  <p className="text-[9px] text-muted-foreground">Milestone: 2 of 3 steps verified</p>
                </div>
                <div className="text-[9px] py-1 border-t border-border text-muted-foreground flex items-center justify-between">
                  <span>Audit Task: active</span>
                  <span className="text-emerald-500 font-bold font-sans">✓ Complete</span>
                </div>
              </div>
            </div>

            {/* Card C: Business Operations Concept */}
            <div className="group border border-border rounded-2xl bg-muted/30 p-6 md:p-8 flex flex-col md:flex-row items-center gap-8 hover:border-primary/40 transition-all duration-300">
              <div className="flex-1 space-y-4 text-left">
                <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium uppercase tracking-wider">
                  Internal Systems Concept
                </span>
                <h3 className="text-2xl font-bold font-heading">
                  Business Operations Concept
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed font-sans">
                  Automated background sync workflow showing the connection between registration lookup verification APIs, WhatsApp notifications, and automated checklists.
                </p>
                <div className="pt-2">
                  <p className="text-xs uppercase font-semibold tracking-wider text-muted-foreground">Business Outcome:</p>
                  <p className="text-sm font-medium mt-0.5">Replace manual admin oversight and save staff hours</p>
                </div>
                <button
                  onClick={() => setActiveProjectModal("ops-concept")}
                  className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-colors cursor-pointer"
                >
                  See Transformation
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
              <div className="w-full md:w-80 h-52 rounded-xl border border-border bg-background p-4 flex flex-col justify-between shadow-inner relative group-hover:border-primary/30 transition-colors font-mono text-[9px] text-muted-foreground">
                <div className="border-b border-border pb-1.5 flex items-center justify-between">
                  <span>automation-scheduler.sh</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                </div>
                <div className="space-y-1 py-1 flex-1 select-none overflow-hidden text-left">
                  <p className="text-muted-foreground/60 font-sans">[09:00 AM] Cron check: CIPA API...</p>
                  <p className="text-emerald-500 font-sans">✓ BW000491823 verified successfully.</p>
                  <p className="text-primary font-sans">→ WhatsApp dispatch queued.</p>
                  <p className="text-muted-foreground/60 font-sans">[09:03 AM] WhatsApp sent: Thabo</p>
                </div>
                <div className="border-t border-border pt-1.5 flex justify-between font-sans">
                  <span>API State: Listening</span>
                  <span className="text-primary font-bold">100% online</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. What We Build Section (Editorial Animated Slideshow Integration) */}
      <section id="what-we-build" className="py-24 border-t border-border bg-muted/10 transition-colors duration-300">
        <div className="max-w-5xl mx-auto px-6">
          <HoverSlider className="w-full text-left">
            <span className="text-xs font-semibold text-primary uppercase tracking-widest block mb-4">
              / what we build
            </span>
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
              <div className="flex flex-col space-y-4 md:space-y-6 w-full lg:w-1/2">
                {whatWeBuildSlides.map((slide, index) => (
                  <TextStaggerHover
                    key={slide.title}
                    index={index}
                    className="cursor-pointer text-4xl sm:text-5xl font-black uppercase tracking-tighter text-foreground font-heading"
                    text={slide.title}
                  />
                ))}
              </div>
              <div className="w-full lg:w-96 aspect-square max-h-96 rounded-2xl overflow-hidden border border-border shadow-2xl bg-muted/30">
                <HoverSliderImageWrap className="size-full">
                  {whatWeBuildSlides.map((slide, index) => (
                    <div key={slide.id} className="size-full">
                      <HoverSliderImage
                        index={index}
                        imageUrl={slide.imageUrl}
                        src={slide.imageUrl}
                        alt={slide.title}
                        className="size-full object-cover"
                        loading="eager"
                        decoding="async"
                      />
                    </div>
                  ))}
                </HoverSliderImageWrap>
              </div>
            </div>
          </HoverSlider>
        </div>
      </section>

      {/* 5. Before → After Section */}
      <section id="before-after" className="py-24 border-t border-border bg-background transition-colors duration-300">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-semibold text-primary uppercase tracking-widest">
              Operational Transformation
            </span>
            <h2 className="text-3xl font-bold tracking-tight font-heading mt-2">
              Before vs. After Fez Custom Systems
            </h2>
            <p className="text-muted-foreground mt-2 font-sans">
              Compare how businesses run operations manually vs. running on custom automation.
            </p>

            {/* Interactive Toggle tabs */}
            <div className="inline-flex rounded-xl bg-muted p-1 mt-8 border border-border shadow-inner">
              <button
                onClick={() => setBeforeAfterState("before")}
                className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                  beforeAfterState === "before"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Before Fez Digital
              </button>
              <button
                onClick={() => setBeforeAfterState("after")}
                className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                  beforeAfterState === "after"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                After Custom Platform
              </button>
            </div>
          </div>

          {/* Before view */}
          {beforeAfterState === "before" ? (
            <div className="border border-destructive/20 rounded-2xl bg-destructive/5 p-6 md:p-8 flex flex-col lg:flex-row gap-8 items-start animate-fade-in">
              <div className="flex-1 space-y-4 text-left">
                <div className="flex items-center gap-2 text-destructive font-semibold text-sm">
                  <AlertTriangle className="w-5 h-5" />
                  Manual & Distributed Chaos
                </div>
                <h3 className="text-2xl font-bold font-heading">
                  Spreadsheets, WhatsApp, and Paper
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed font-sans">
                  Operations are scattered across disconnected systems. Important info gets buried in WhatsApp group chats, Excel spreadsheet version conflicts occur daily, and staff repeat admin tasks manually.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground pt-2 font-sans">
                  <li className="flex items-start gap-2.5">
                    <span className="text-destructive font-bold mt-0.5">✕</span>
                    <span>Excel sheet version conflicts: <code>Clients_v4_FINAL.xlsx</code></span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-destructive font-bold mt-0.5">✕</span>
                    <span>WhatsApp messages ignored, leading to lost customer leads</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-destructive font-bold mt-0.5">✕</span>
                    <span>Manual transcription errors and lost client details</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-destructive font-bold mt-0.5">✕</span>
                    <span>Manual weekly operations report takes hours to assemble</span>
                  </li>
                </ul>
              </div>

              {/* Visual Grid Mockup of Spreadsheet Chaos */}
              <div className="w-full lg:w-96 border border-border bg-background rounded-xl shadow-md overflow-hidden font-sans text-xs">
                <div className="bg-muted px-4 py-2 border-b border-border text-[10px] text-muted-foreground flex items-center justify-between">
                  <span>Excel - Client_List_v4.xlsx (Shared)</span>
                  <span className="text-destructive font-semibold">⚠️ Conflicts Found</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-muted border-b border-border text-muted-foreground text-[10px] uppercase">
                        <th className="p-2 border-r border-border">Client</th>
                        <th className="p-2 border-r border-border">WhatsApp</th>
                        <th className="p-2 border-r border-border">Status</th>
                        <th className="p-2">Assigned</th>
                      </tr>
                    </thead>
                    <tbody className="text-muted-foreground">
                      <tr className="border-b border-border">
                        <td className="p-2 border-r border-border font-medium text-foreground">Keneilwe M.</td>
                        <td className="p-2 border-r border-border text-destructive">Ignored</td>
                        <td className="p-2 border-r border-border bg-yellow-500/10 text-yellow-600 dark:text-yellow-400">Pending</td>
                        <td className="p-2">Thabo</td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="p-2 border-r border-border font-medium text-foreground">Bakang P.</td>
                        <td className="p-2 border-r border-border text-destructive">No reply</td>
                        <td className="p-2 border-r border-border bg-destructive/10 text-destructive">Unpaid</td>
                        <td className="p-2">Mpho</td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="p-2 border-r border-border font-medium text-foreground">Lesedi T.</td>
                        <td className="p-2 border-r border-border">Read 10:14</td>
                        <td className="p-2 border-r border-border bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium">Cash paid</td>
                        <td className="p-2">Self</td>
                      </tr>
                      <tr>
                        <td className="p-2 border-r border-border font-medium text-foreground">Boipelo S.</td>
                        <td className="p-2 border-r border-border text-muted-foreground/50">Not sent</td>
                        <td className="p-2 border-r border-border bg-destructive/10 text-destructive">No CIPA</td>
                        <td className="p-2">Thabo</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="bg-destructive/10 p-2.5 text-[10px] text-destructive border-t border-destructive/20 text-center select-none font-sans font-medium">
                  🚨 Warning: 2 conflicting updates in WhatsApp logs.
                </div>
              </div>
            </div>
          ) : (
            /* After view */
            <div className="border border-emerald-500/20 rounded-2xl bg-emerald-500/5 p-6 md:p-8 flex flex-col lg:flex-row gap-8 items-start animate-fade-in">
              <div className="flex-1 space-y-4 text-left">
                <div className="flex items-center gap-2 text-emerald-500 font-semibold text-sm">
                  <CheckCircle2 className="w-5 h-5" />
                  Automated, Centralized Platform
                </div>
                <h3 className="text-2xl font-bold font-heading">
                  One Operational Hub
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed font-sans">
                  Operations are consolidated into one live custom hub. Information is stored in a structured database, background notifications keep staff and clients aligned automatically, and stats update in real time.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground pt-2 font-sans">
                  <li className="flex items-start gap-2.5">
                    <span className="text-emerald-500 font-bold mt-0.5">✓</span>
                    <span>Single source of truth: everyone looks at the same data</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-emerald-500 font-bold mt-0.5">✓</span>
                    <span>Automated alerts handle routine communication without delay</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-emerald-500 font-bold mt-0.5">✓</span>
                    <span>Data integrity checks prevent typos and lost client profiles</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-emerald-500 font-bold mt-0.5">✓</span>
                    <span>Dashboard compiles real-time stats with zero administrative burden</span>
                  </li>
                </ul>
              </div>

              {/* Visual Grid Mockup of Dashboard Platform */}
              <div className="w-full lg:w-96 border border-border bg-background rounded-xl shadow-md overflow-hidden font-sans text-xs">
                <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 text-[10px] text-white flex items-center justify-between font-heading">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    FEZ OPERATIONS CONSOLE
                  </span>
                  <span className="text-emerald-400 text-[9px] px-1 bg-emerald-950/50 rounded font-sans">SYNCING LIVE</span>
                </div>
                <div className="p-3 grid grid-cols-2 gap-2 border-b border-border">
                  <div className="bg-muted p-2.5 rounded-lg border border-border">
                    <p className="text-[10px] text-muted-foreground">Total Bookings</p>
                    <p className="text-lg font-bold text-foreground mt-0.5 font-heading">14</p>
                  </div>
                  <div className="bg-muted p-2.5 rounded-lg border border-border">
                    <p className="text-[10px] text-muted-foreground">Time Saved</p>
                    <p className="text-lg font-bold text-emerald-500 mt-0.5 font-heading">18h / wk</p>
                  </div>
                </div>
                <div className="p-3">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase mb-2">Recent Automation Logs</p>
                  <div className="space-y-2 select-none">
                    <div className="flex items-center justify-between text-[10px]">
                      <div className="flex items-center gap-1">
                        <span className="text-muted-foreground/60">09:14</span>
                        <span className="font-semibold text-foreground">CIPA Check: Keneilwe</span>
                      </div>
                      <span className="text-emerald-500 font-bold">✓ Approved</span>
                    </div>
                    <div className="flex items-center justify-between text-[10px]">
                      <div className="flex items-center gap-1">
                        <span className="text-muted-foreground/60">09:15</span>
                        <span className="font-semibold text-foreground">SMS Dispatch: Bakang</span>
                      </div>
                      <span className="text-primary font-bold">✓ Sent</span>
                    </div>
                    <div className="flex items-center justify-between text-[10px]">
                      <div className="flex items-center gap-1">
                        <span className="text-muted-foreground/60">10:30</span>
                        <span className="font-semibold text-foreground">Coop Step 2 Assigned</span>
                      </div>
                      <span className="text-primary font-bold">✓ Active</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 6. Process Section */}
      <section id="process" className="py-24 border-t border-border bg-muted/10 transition-colors duration-300">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold text-primary uppercase tracking-widest">
              Execution Path
            </span>
            <h2 className="text-3xl font-bold tracking-tight font-heading mt-2">
              Our 4-Step Process
            </h2>
            <p className="text-muted-foreground mt-2 font-sans">
              From mapping your manual chaos to launching a supported pilot platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Step 1 */}
            <div className="space-y-4 text-left relative z-10">
              <div className="w-12 h-12 rounded-xl bg-primary text-primary-foreground font-heading font-bold text-lg flex items-center justify-center shadow-md shadow-primary/20">
                01
              </div>
              <h4 className="font-heading font-bold text-lg">Discovery Call</h4>
              <p className="text-sm text-muted-foreground leading-relaxed font-sans">
                We spend 1 hour mapping your current workflow, analyzing spreadsheets, and identifying critical manual bottlenecks.
              </p>
            </div>
            {/* Step 2 */}
            <div className="space-y-4 text-left relative z-10">
              <div className="w-12 h-12 rounded-xl bg-primary/90 text-primary-foreground font-heading font-bold text-lg flex items-center justify-center shadow-md">
                02
              </div>
              <h4 className="font-heading font-bold text-lg">Build Pilot</h4>
              <p className="text-sm text-muted-foreground leading-relaxed font-sans">
                We design and build a small, functional pilot system (within 14 days) to solve your single biggest operational bottleneck.
              </p>
            </div>
            {/* Step 3 */}
            <div className="space-y-4 text-left relative z-10">
              <div className="w-12 h-12 rounded-xl bg-primary/80 text-primary-foreground font-heading font-bold text-lg flex items-center justify-center shadow-md">
                03
              </div>
              <h4 className="font-heading font-bold text-lg">Launch</h4>
              <p className="text-sm text-muted-foreground leading-relaxed font-sans">
                We deploy the pilot system to your staff, migrate active spreadsheets, and train team members on how to use it.
              </p>
            </div>
            {/* Step 4 */}
            <div className="space-y-4 text-left relative z-10">
              <div className="w-12 h-12 rounded-xl bg-primary/70 text-primary-foreground font-heading font-bold text-lg flex items-center justify-center shadow-md">
                04
              </div>
              <h4 className="font-heading font-bold text-lg">Support</h4>
              <p className="text-sm text-muted-foreground leading-relaxed font-sans">
                We handle hosting, security, and minor layout modifications monthly to ensure the software evolves around how you work.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Pricing Section */}
      <section id="pricing" className="py-24 border-t border-border bg-background transition-colors duration-300">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold text-primary uppercase tracking-widest">
              Simple & Transparent
            </span>
            <h2 className="text-3xl font-bold tracking-tight font-heading mt-2">
              Our Pricing Model
            </h2>
            <p className="text-muted-foreground mt-2 font-sans">
              No hidden costs, no seat-based monthly markups. Pay for deliverables.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Pricing 1 */}
            <div className="border border-border rounded-2xl bg-muted/20 p-6 md:p-8 flex flex-col justify-between hover:border-primary/20 transition-all text-left">
              <div className="space-y-4">
                <div>
                  <span className="text-xs font-bold text-primary uppercase tracking-widest">Stage 1</span>
                  <h4 className="font-heading font-bold text-xl mt-1">Discovery</h4>
                </div>
                <div className="flex items-baseline">
                  <span className="text-3xl font-extrabold font-heading">P500</span>
                  <span className="text-xs text-muted-foreground ml-1">one-time</span>
                </div>
                <p className="text-xs leading-relaxed font-sans text-muted-foreground">
                  A 1-hour workshop mapping your process, locating bottlenecks, and creating a step-by-step custom platform blueprint.
                </p>
              </div>
              <button onClick={() => scrollToId("consultation")} className="w-full py-3 rounded-lg border border-border hover:border-primary text-foreground font-semibold text-xs mt-8 transition-colors cursor-pointer">
                Book Discovery
              </button>
            </div>

            {/* Pricing 2 */}
            <div className="border-2 border-primary rounded-2xl bg-background p-6 md:p-8 flex flex-col justify-between hover:shadow-lg transition-all relative text-left">
              <div className="absolute -top-3 right-6 px-3 py-1 rounded-full bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-wider">
                Most Popular
              </div>
              <div className="space-y-4">
                <div>
                  <span className="text-xs font-bold text-primary uppercase tracking-widest">Stage 2</span>
                  <h4 className="font-heading font-bold text-xl mt-1">Pilot System</h4>
                </div>
                <div className="flex items-baseline">
                  <span className="text-3xl font-extrabold font-heading">P3,000–P8,000+</span>
                </div>
                <p className="text-xs leading-relaxed font-sans text-muted-foreground">
                  A fully functional, customized database platform designed to replace a single key spreadsheet or manual WhatsApp workflow in 14 days.
                </p>
              </div>
              <button onClick={() => scrollToId("consultation")} className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-xs mt-8 hover:opacity-90 transition-colors shadow-md shadow-primary/15 cursor-pointer">
                Build Pilot
              </button>
            </div>

            {/* Pricing 3 */}
            <div className="border border-border rounded-2xl bg-muted/20 p-6 md:p-8 flex flex-col justify-between hover:border-primary/20 transition-all text-left">
              <div className="space-y-4">
                <div>
                  <span className="text-xs font-bold text-primary uppercase tracking-widest">Stage 3</span>
                  <h4 className="font-heading font-bold text-xl mt-1">Monthly Support</h4>
                </div>
                <div className="flex items-baseline">
                  <span className="text-3xl font-extrabold font-heading">P500–P2,000</span>
                  <span className="text-xs text-muted-foreground ml-1">/ month</span>
                </div>
                <p className="text-xs leading-relaxed font-sans text-muted-foreground">
                  Ongoing cloud hosting, support SLA, regular security updates, and incremental custom upgrades as your workflow expands.
                </p>
              </div>
              <button onClick={() => scrollToId("consultation")} className="w-full py-3 rounded-lg border border-border hover:border-primary text-foreground font-semibold text-xs mt-8 transition-colors cursor-pointer">
                Setup Support
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FAQ Section */}
      <section id="faq" className="py-24 border-t border-border bg-muted/10 transition-colors duration-300">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-xs font-semibold text-primary uppercase tracking-widest">
              FAQ
            </span>
            <h2 className="text-3xl font-bold tracking-tight font-heading mt-2">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4 text-left">
            {/* FAQ 1 */}
            <div className="border border-border rounded-xl bg-background overflow-hidden transition-colors">
              <button
                onClick={() => setFaqOpenIndex(faqOpenIndex === 0 ? null : 0)}
                className="w-full p-5 flex items-center justify-between text-left font-semibold text-foreground cursor-pointer"
              >
                <span>Why custom instead of SaaS?</span>
                <span className="text-muted-foreground">
                  {faqOpenIndex === 0 ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </span>
              </button>
              {faqOpenIndex === 0 && (
                <div className="p-5 pt-0 border-t border-border text-sm text-muted-foreground leading-relaxed font-sans">
                  SaaS products force you to pay monthly per-user fees and adjust your team's workflow to fit their template. Custom platforms match how you already work, have no seat-based markups, and are completely owned by you.
                </div>
              )}
            </div>

            {/* FAQ 2 */}
            <div className="border border-border rounded-xl bg-background overflow-hidden transition-colors">
              <button
                onClick={() => setFaqOpenIndex(faqOpenIndex === 1 ? null : 1)}
                className="w-full p-5 flex items-center justify-between text-left font-semibold text-foreground cursor-pointer"
              >
                <span>How long does a pilot take?</span>
                <span className="text-muted-foreground">
                  {faqOpenIndex === 1 ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </span>
              </button>
              {faqOpenIndex === 1 && (
                <div className="p-5 pt-0 border-t border-border text-sm text-muted-foreground leading-relaxed font-sans">
                  A basic usable pilot system targeting your biggest manual spreadsheet bottleneck takes exactly 14 days from discovery call to active deployment.
                </div>
              )}
            </div>

            {/* FAQ 3 */}
            <div className="border border-border rounded-xl bg-background overflow-hidden transition-colors">
              <button
                onClick={() => setFaqOpenIndex(faqOpenIndex === 2 ? null : 2)}
                className="w-full p-5 flex items-center justify-between text-left font-semibold text-foreground cursor-pointer"
              >
                <span>Do you support after launch?</span>
                <span className="text-muted-foreground">
                  {faqOpenIndex === 2 ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </span>
              </button>
              {faqOpenIndex === 2 && (
                <div className="p-5 pt-0 border-t border-border text-sm text-muted-foreground leading-relaxed font-sans">
                  Yes, our monthly support SLAs cover secure cloud hosting, routine database backups, SSL maintenance, and small feature additions so the platform evolves with your business.
                </div>
              )}
            </div>

            {/* FAQ 4 */}
            <div className="border border-border rounded-xl bg-background overflow-hidden transition-colors">
              <button
                onClick={() => setFaqOpenIndex(faqOpenIndex === 3 ? null : 3)}
                className="w-full p-5 flex items-center justify-between text-left font-semibold text-foreground cursor-pointer"
              >
                <span>Do you work with small businesses?</span>
                <span className="text-muted-foreground">
                  {faqOpenIndex === 3 ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </span>
              </button>
              {faqOpenIndex === 3 && (
                <div className="p-5 pt-0 border-t border-border text-sm text-muted-foreground leading-relaxed font-sans">
                  Yes, our sweet spot is businesses with 5 to 100 staff who rely heavily on shared Excel files, manual reporting, and WhatsApp groups, and are ready for operational systems.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 9. Book Consultation Form */}
      <section id="consultation" className="py-24 border-t border-border bg-background transition-colors duration-300">
        <div className="max-w-xl mx-auto px-6">
          <div className="text-center mb-10">
            <span className="text-xs font-semibold text-primary uppercase tracking-widest">
              Get Started
            </span>
            <h2 className="text-3xl font-bold tracking-tight font-heading mt-2">
              Book Consultation
            </h2>
            <p className="text-muted-foreground mt-2 font-sans text-sm">
              Briefly describe your process bottlenecks. We'll map a pilot platform for you.
            </p>
          </div>

          <div className="border border-border rounded-2xl bg-muted/20 p-6 md:p-8 hover:shadow-md transition-all text-left">
            {formStatus === "success" ? (
              <div className="text-center py-10 space-y-4 animate-fade-in font-sans">
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto animate-bounce">
                  <Check className="w-7 h-7" />
                </div>
                <h4 className="font-heading font-bold text-xl">Request Received</h4>
                <p className="text-sm text-muted-foreground max-w-sm mx-auto leading-relaxed">
                  Thanks. We’ll review your process and respond within 2 business days.
                </p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Your Name</label>
                    <div className="relative">
                      <input
                        required
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Tumisang"
                        className="w-full pl-9 pr-4 py-3 rounded-lg border border-border bg-background text-sm focus:border-primary focus:outline-none transition-colors"
                      />
                      <Users className="w-4 h-4 text-muted-foreground/60 absolute left-3 top-3.5" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="company" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Company</label>
                    <div className="relative">
                      <input
                        required
                        type="text"
                        name="company"
                        id="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        placeholder="Fez Digital"
                        className="w-full pl-9 pr-4 py-3 rounded-lg border border-border bg-background text-sm focus:border-primary focus:outline-none transition-colors"
                      />
                      <Building className="w-4 h-4 text-muted-foreground/60 absolute left-3 top-3.5" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Email Address</label>
                    <div className="relative">
                      <input
                        required
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="name@company.com"
                        className="w-full pl-9 pr-4 py-3 rounded-lg border border-border bg-background text-sm focus:border-primary focus:outline-none transition-colors"
                      />
                      <Mail className="w-4 h-4 text-muted-foreground/60 absolute left-3 top-3.5" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="phone" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Phone / WhatsApp</label>
                    <div className="relative">
                      <input
                        required
                        type="tel"
                        name="phone"
                        id="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+267 7123 4567"
                        className="w-full pl-9 pr-4 py-3 rounded-lg border border-border bg-background text-sm focus:border-primary focus:outline-none transition-colors"
                      />
                      <Phone className="w-4 h-4 text-muted-foreground/60 absolute left-3 top-3.5" />
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="bottleneck" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Current operational bottleneck</label>
                  <textarea
                    required
                    name="bottleneck"
                    id="bottleneck"
                    rows={4}
                    value={formData.bottleneck}
                    onChange={handleInputChange}
                    placeholder="We use 4 different Excel files to track student progress and staff coordinate updates manually over WhatsApp groups..."
                    className="w-full p-4 rounded-lg border border-border bg-background text-sm focus:border-primary focus:outline-none transition-colors resize-none"
                  ></textarea>
                </div>

                {formStatus === "error" && (
                  <p className="text-xs text-destructive font-sans">{errorMessage}</p>
                )}

                <button
                  type="submit"
                  disabled={formStatus === "submitting"}
                  className="w-full py-3.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                >
                  {formStatus === "submitting" ? (
                    <span>Submitting Request...</span>
                  ) : (
                    <>
                      <span>Send Request</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 10. Footer Section */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 transition-colors duration-300">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-3 text-left">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-gradient-to-tr from-primary to-primary/60 flex items-center justify-center text-primary-foreground font-heading font-black text-sm">
                F
              </div>
              <span className="font-heading font-bold text-white tracking-tight">FEZ DIGITAL</span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm font-sans leading-relaxed">
              We design custom business systems that replace spreadsheets, WhatsApp workflows, paper forms, and manual admin. We sell operational improvement.
            </p>
          </div>
          <div className="flex flex-col md:items-end gap-3 text-left md:text-right text-xs">
            <p>&copy; {new Date().getFullYear()} Fez Digital. All rights reserved.</p>
            <p>Built for Vercel deployment with Next.js & Tailwind CSS.</p>
            <div className="flex gap-4 mt-2">
              <button onClick={() => scrollToId("proof")} className="hover:text-white transition-colors">Concepts</button>
              <button onClick={() => scrollToId("what-we-build")} className="hover:text-white transition-colors">What We Build</button>
              <button onClick={() => scrollToId("consultation")} className="hover:text-white transition-colors">Contact</button>
            </div>
          </div>
        </div>
      </footer>

      {/* --- 11. Interactive Concept Modals --- */}
      <AnimatePresence>
        {/* Modal A: LSP Stay Live Preview */}
        {activeProjectModal === "lsp-stay" && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-background w-full max-w-2xl rounded-2xl border border-border shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="px-6 py-4 border-b border-border flex items-center justify-between">
                <div className="text-left">
                  <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Live Concept Sandbox</span>
                  <h4 className="font-heading font-bold text-lg">LSP Stay Prototype</h4>
                </div>
                <button
                  onClick={() => setActiveProjectModal(null)}
                  className="p-2 rounded-lg border border-border hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Active Room Image Showcase */}
                <div className="border border-border rounded-xl overflow-hidden h-64 bg-muted relative shadow-inner">
                  <img
                    src={lspRooms[lspStayRoom].image}
                    alt={lspRooms[lspStayRoom].title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-md px-3.5 py-1.5 rounded-full text-white font-semibold text-xs border border-white/10">
                    {lspRooms[lspStayRoom].price}
                  </div>
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-5 text-white text-left">
                    <h5 className="font-heading font-bold text-lg">{lspRooms[lspStayRoom].title}</h5>
                    <p className="text-xs text-slate-350 mt-1">{lspRooms[lspStayRoom].desc}</p>
                  </div>
                </div>

                {/* Custom Selector Wheel */}
                <div className="space-y-3">
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider text-left">Room Selection</p>
                  <div className="grid grid-cols-4 gap-3">
                    {lspRooms.map((room, idx) => (
                      <button
                        key={idx}
                        onClick={() => setLspStayRoom(idx)}
                        className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                          lspStayRoom === idx
                            ? "border-primary bg-primary/10 text-primary ring-2 ring-primary/20"
                            : "border-border bg-background hover:bg-muted text-foreground"
                        }`}
                      >
                        <p className="text-xs font-bold truncate">{room.title.split(" ")[1] || room.title}</p>
                        <p className="text-[9px] text-muted-foreground mt-0.5">{room.price}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Booking logic outcome */}
                <div className="border border-border rounded-xl bg-muted/40 p-4 space-y-4">
                  <div className="flex justify-between items-center text-xs text-left">
                    <div>
                      <p className="text-muted-foreground">Check In / Out</p>
                      <p className="font-semibold mt-0.5">Aug 21 → Aug 24</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Guests</p>
                      <p className="font-semibold mt-0.5">2 Adults</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Estimated Cost</p>
                      <p className="font-bold text-primary mt-0.5">P3,600</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      alert("Mock checkout triggered. Fez platforms support custom CIPA checks and payment APIs.");
                    }}
                    className="w-full py-3 bg-primary text-primary-foreground font-semibold text-xs rounded-lg hover:opacity-95 transition-colors cursor-pointer"
                  >
                    Test Checkout Integration
                  </button>
                </div>
              </div>
              
              <div className="px-6 py-4 border-t border-border bg-muted/40 flex items-center justify-between">
                <span className="text-[10px] text-muted-foreground">Next.js + Tailwind CSS prototype</span>
                <button
                  onClick={() => {
                    setActiveProjectModal(null);
                    scrollToId("consultation");
                  }}
                  className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 transition-colors cursor-pointer"
                >
                  Let's Build This For You
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Modal B: Staff Training Portal Live Preview */}
        {activeProjectModal === "training-portal" && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-background w-full max-w-2xl rounded-2xl border border-border shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="px-6 py-4 border-b border-border flex items-center justify-between">
                <div className="text-left">
                  <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Live Concept Sandbox</span>
                  <h4 className="font-heading font-bold text-lg">Training Portal Workflow</h4>
                </div>
                <button
                  onClick={() => {
                    setActiveProjectModal(null);
                    setTrainingEvidenceSubmitted(false);
                  }}
                  className="p-2 rounded-lg border border-border hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Header inside mockup */}
                <div className="border border-border rounded-xl p-4 bg-muted/30 space-y-4">
                  <div className="flex items-center justify-between border-b border-border pb-3">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-primary"></span>
                      <span className="text-xs font-bold">FEZ TRAINING</span>
                    </div>
                    {/* Language switch */}
                    <button
                      onClick={() => setTrainingLang(trainingLang === "en" ? "tn" : "en")}
                      className="px-2.5 py-1 rounded bg-muted hover:bg-primary hover:text-primary-foreground text-[10px] font-bold transition-colors cursor-pointer"
                    >
                      {trainingLang === "en" ? "Setswana" : "English"}
                    </button>
                  </div>

                  <div className="space-y-1 text-left">
                    <h5 className="font-bold text-sm">
                      {trainingText[trainingLang].welcome} <span className="text-primary">Thabo</span>
                    </h5>
                    <p className="text-[10px] text-muted-foreground leading-relaxed">
                      {trainingText[trainingLang].subtitle}
                    </p>
                  </div>
                </div>

                {/* Task Checklist progress */}
                <div className="space-y-3 text-left">
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{trainingText[trainingLang].track}</p>
                  <div className="border border-border rounded-xl overflow-hidden divide-y divide-border">
                    {/* Step 1 */}
                    <div className="p-3.5 flex items-center justify-between bg-emerald-500/5">
                      <div className="flex items-center gap-3">
                        <span className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-bold flex items-center justify-center">✓</span>
                        <span className="text-xs font-medium text-foreground">{trainingText[trainingLang].cap2}</span>
                      </div>
                      <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold uppercase">{trainingText[trainingLang].statusCompleted}</span>
                    </div>
                    {/* Step 2 */}
                    <div className="p-3.5 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">2</span>
                        <span className="text-xs font-medium text-foreground">{trainingText[trainingLang].cap1}</span>
                      </div>
                      <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase ${
                        trainingEvidenceSubmitted 
                          ? "bg-yellow-500/15 text-yellow-600 dark:text-yellow-400" 
                          : "bg-primary/15 text-primary"
                      }`}>
                        {trainingEvidenceSubmitted ? trainingText[trainingLang].statusPending : "Active"}
                      </span>
                    </div>
                    {/* Step 3 */}
                    <div className="p-3.5 flex items-center justify-between text-muted-foreground/60">
                      <div className="flex items-center gap-3">
                        <span className="w-5 h-5 rounded-full bg-muted text-muted-foreground text-xs font-bold flex items-center justify-center">3</span>
                        <span className="text-xs font-medium">{trainingText[trainingLang].cap3}</span>
                      </div>
                      <span className="text-[9px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground/60 font-bold uppercase">{trainingText[trainingLang].statusLocked}</span>
                    </div>
                  </div>
                </div>

                {/* Upload evidence mock */}
                <div className="border border-border rounded-xl bg-muted/20 p-4 text-left space-y-3">
                  <p className="text-xs font-bold text-foreground">
                    {trainingText[trainingLang].action}
                  </p>
                  <div className="space-y-2">
                    <label className="text-[10px] text-muted-foreground font-semibold">{trainingText[trainingLang].evidenceLabel}</label>
                    <input
                      readOnly
                      type="text"
                      value={trainingText[trainingLang].placeholder}
                      className="w-full p-2.5 border border-border bg-background rounded-lg text-xs focus:outline-none select-none text-muted-foreground/60"
                    />
                  </div>
                  <button
                    onClick={() => setTrainingEvidenceSubmitted(true)}
                    disabled={trainingEvidenceSubmitted}
                    className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold text-xs hover:opacity-95 transition-colors disabled:opacity-50 cursor-pointer"
                  >
                    {trainingEvidenceSubmitted ? trainingText[trainingLang].submitted : trainingText[trainingLang].submit}
                  </button>
                </div>
              </div>

              <div className="px-6 py-4 border-t border-border bg-muted/40 flex items-center justify-between">
                <span className="text-[10px] text-muted-foreground">Next.js + Tailwind CSS prototype</span>
                <button
                  onClick={() => {
                    setActiveProjectModal(null);
                    setTrainingEvidenceSubmitted(false);
                    scrollToId("consultation");
                  }}
                  className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 transition-colors cursor-pointer"
                >
                  Let's Build This For You
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Modal C: Business Operations Concept Sandbox */}
        {activeProjectModal === "ops-concept" && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-background w-full max-w-2xl rounded-2xl border border-border shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="px-6 py-4 border-b border-border flex items-center justify-between">
                <div className="text-left">
                  <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Live Concept Sandbox</span>
                  <h4 className="font-heading font-bold text-lg">Business Operations Pipeline</h4>
                </div>
                <button
                  onClick={() => {
                    setActiveProjectModal(null);
                    resetOpsSimulation();
                  }}
                  className="p-2 rounded-lg border border-border hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                <p className="text-muted-foreground text-xs text-left leading-relaxed">
                  Click <strong>"Start Automation Simulation"</strong> to witness a real-time system mapping. Watch how registration lookups, WhatsApp notifications, and automated checklists execute in sequence.
                </p>

                {/* Automation Node Graph */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center select-none font-sans">
                  {/* Node 1 */}
                  <div className={`p-3 rounded-xl border text-xs flex flex-col items-center gap-1.5 transition-all duration-300 ${
                    opsSimStep >= 1 
                      ? "border-primary bg-primary/10 text-primary scale-105" 
                      : "border-border bg-background text-muted-foreground"
                  }`}>
                    <Activity className="w-5 h-5" />
                    <span className="font-bold">1. API Trigger</span>
                    <span className="text-[8px] text-muted-foreground/60">Query CIPA Database</span>
                  </div>
                  {/* Node 2 */}
                  <div className={`p-3 rounded-xl border text-xs flex flex-col items-center gap-1.5 transition-all duration-300 ${
                    opsSimStep >= 2 
                      ? "border-primary bg-primary/10 text-primary scale-105" 
                      : "border-border bg-background text-muted-foreground"
                  }`}>
                    <CheckCircle2 className="w-5 h-5" />
                    <span className="font-bold">2. Verification</span>
                    <span className="text-[8px] text-muted-foreground/60">Validate Registration ID</span>
                  </div>
                  {/* Node 3 */}
                  <div className={`p-3 rounded-xl border text-xs flex flex-col items-center gap-1.5 transition-all duration-300 ${
                    opsSimStep >= 3 
                      ? "border-primary bg-primary/10 text-primary scale-105" 
                      : "border-border bg-background text-muted-foreground"
                  }`}>
                    <Smartphone className="w-5 h-5" />
                    <span className="font-bold">3. Alert Dispatch</span>
                    <span className="text-[8px] text-muted-foreground/60">WhatsApp Notification</span>
                  </div>
                  {/* Node 4 */}
                  <div className={`p-3 rounded-xl border text-xs flex flex-col items-center gap-1.5 transition-all duration-300 ${
                    opsSimStep >= 4 
                      ? "border-primary bg-primary/10 text-primary scale-105" 
                      : "border-border bg-background text-muted-foreground"
                  }`}>
                    <Layers className="w-5 h-5" />
                    <span className="font-bold">4. Next Task</span>
                    <span className="text-[8px] text-muted-foreground/60">Activate Poultry Step 2</span>
                  </div>
                </div>

                {/* Console Logs */}
                <div className="border border-border bg-slate-905 dark:bg-black p-4 rounded-xl font-mono text-[9px] text-slate-300 text-left min-h-28 flex flex-col justify-end space-y-1.5 shadow-inner">
                  {opsSimLogs.length === 0 ? (
                    <p className="text-muted-foreground text-center select-none font-sans py-6">Logs empty. Trigger simulation below.</p>
                  ) : (
                    opsSimLogs.map((log, idx) => (
                      <p key={idx} className="animate-in fade-in slide-in-from-left-2 duration-200">{log}</p>
                    ))
                  )}
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={runOpsSimulation}
                    disabled={isSimulating || opsSimStep > 0}
                    className="flex-1 py-3 bg-primary text-primary-foreground font-semibold text-xs rounded-lg transition-colors shadow-sm disabled:opacity-50 cursor-pointer"
                  >
                    {isSimulating ? "Simulating Workflow..." : opsSimStep > 0 ? "Simulation Complete" : "Start Automation Simulation"}
                  </button>
                  {opsSimStep > 0 && (
                    <button
                      onClick={resetOpsSimulation}
                      className="px-5 py-3 rounded-lg border border-border text-xs font-semibold text-muted-foreground hover:bg-muted cursor-pointer"
                    >
                      Reset
                    </button>
                  )}
                </div>
              </div>

              <div className="px-6 py-4 border-t border-border bg-muted/40 flex items-center justify-between">
                <span className="text-[10px] text-muted-foreground">Next.js + Tailwind CSS prototype</span>
                <button
                  onClick={() => {
                    setActiveProjectModal(null);
                    resetOpsSimulation();
                    scrollToId("consultation");
                  }}
                  className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 transition-colors cursor-pointer"
                >
                  Let's Build This For You
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      
    </div>
  );
}
