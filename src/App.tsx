/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "motion/react";
import React, { useEffect, useRef, useState } from "react";
import { ChevronRight, ExternalLink, Mail, MapPin } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import ProjectDetailsPage from "./ProjectDetails";
import { ChatAssistant } from "./components/ChatAssistant";

// --- Types ---
interface Project {
  id: number;
  title: string;
  subtitle: string;
  role: string;
  category: string;
  description: string;
  imageUrl: string;
}

// --- Components ---

const GlassButton = ({ 
  children, 
  className, 
  variant = 'large',
  onClick
}: { 
  children: React.ReactNode; 
  className?: string; 
  variant?: 'small' | 'large';
  onClick?: () => void;
}) => (
  <button 
    onClick={onClick}
    className={cn(
    "liquid-glass rounded-full text-white transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer",
    variant === 'small' ? "px-6 py-2.5 text-sm" : "px-14 py-5 text-base",
    className
  )}>
    {children}
  </button>
);

const TiltCard = ({ children, className, image, title }: { children?: React.ReactNode; className?: string; image?: string; title?: string }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["20deg", "-20deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-20deg", "20deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
        perspective: "1000px"
      }}
      className={cn("relative liquid-glass rounded-[2rem] overflow-visible group", className)}
    >
      <div 
        style={{ transform: "translateZ(-20px)" }}
        className="absolute inset-0 bg-white/5 blur-xl rounded-full"
      />

      <div style={{ transform: "translateZ(60px)", transformStyle: "preserve-3d" }} className="w-full h-full relative z-10">
        {image ? (
          <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src={image} 
              alt={title || "Portfolio Image"} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <motion.div 
               style={{ 
                 background: "linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)",
                 transform: useTransform(mouseXSpring, [-0.5, 0.5], ["translateX(-100%)", "translateX(100%)"])
               }}
               className="absolute inset-0 pointer-events-none"
            />
          </div>
        ) : children}
      </div>

      <motion.div 
        style={{ 
          transform: "translateZ(100px)",
          x: useTransform(mouseXSpring, [-0.5, 0.5], ["10px", "-10px"]),
          y: useTransform(mouseYSpring, [-0.5, 0.5], ["10px", "-10px"])
        }}
        className="absolute -top-10 -right-10 w-24 h-24 liquid-glass rounded-2xl backdrop-blur-3xl border border-white/20 flex items-center justify-center z-20 pointer-events-none"
      >
         <div className="w-10 h-10 rounded-full border-2 border-white/40 border-dashed animate-spin-slow" />
      </motion.div>

      <motion.div 
        style={{ 
          transform: "translateZ(40px)",
          x: useTransform(mouseXSpring, [-0.5, 0.5], ["-20px", "20px"]),
          y: useTransform(mouseYSpring, [-0.5, 0.5], ["-20px", "20px"])
        }}
        className="absolute -bottom-8 -left-8 px-6 py-4 liquid-glass rounded-xl backdrop-blur-2xl border border-white/10 z-20 pointer-events-none"
      >
         <p className="text-[10px] uppercase tracking-widest text-white/40">Active Project</p>
         <p className="text-sm font-display">Fintech Hub 2026</p>
      </motion.div>
    </motion.div>
  );
};

const Home = ({ projects }: { projects: Project[] }) => {
  const navigate = useNavigate();
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const activeProject = projects[activeProjectIndex];

  // Auto-advance logic: Every 2 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveProjectIndex((prev) => (prev + 1) % projects.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [activeProjectIndex, projects.length]);

  return (
    <div className="relative min-h-screen bg-[hsl(var(--background))] text-left">
      {/* Video Background */}
      <div className="fixed inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-40 scale-[1.02]">
          <source src="https://d8j0nticm91z4.cloudfront.net/user_38xzZboKVIGWJOttw/XH07IWA1P/hf_20260314_131748_12ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[hsl(var(--background))]" />
      </div>

      <div className="relative z-10">
        <nav className="flex flex-row justify-between items-center px-8 py-6 max-w-7xl mx-auto">
          <div className="font-display text-3xl tracking-tight text-white flex items-baseline gap-1">
            Nhật Quang <sup className="text-[10px] font-body opacity-60 tracking-wider">SVF</sup>
          </div>
          <div className="hidden md:flex items-center gap-10">
            {['Home', 'Projects', 'Gallery', 'About'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-sm text-white/50 hover:text-white transition-colors duration-300 tracking-wide">{item}</a>
            ))}
            <a href="/docs/cv.pdf" target="_blank" className="text-xs font-body tracking-[0.2em] uppercase text-white/30 hover:text-white border border-white/10 px-4 py-2 rounded-lg transition-all">Resume PDF</a>
          </div>
          <GlassButton variant="small">Kết Nối</GlassButton>
        </nav>

        <section id="home" className="px-6 pt-32 pb-32 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-[1fr_400px] gap-16 items-start w-full mb-32">
            <div className="text-left space-y-8 pt-8">
              <h1 className="font-display text-5xl sm:text-7xl lg:text-[100px] leading-[0.95] tracking-[-0.03em] font-normal animate-fade-rise">Trần Nhật Quang</h1>
              <p className="text-white/60 text-lg sm:text-xl max-w-xl leading-relaxed animate-fade-rise-delay">"Là bản thể độc nhất, tôi chọn đầu tư vào sự phát triển cá nhân để tỏa sáng theo cách riêng. Thay vì so sánh, tôi trân trọng hành trình cá nhân và không ngừng hoàn thiện để trở thành phiên bản tốt đẹp nhất của chính mình."</p>
              <div className="animate-fade-rise-delay-2 pt-4">
                <GlassButton onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>Khám phá hành trình</GlassButton>
              </div>
            </div>
            <div className="relative animate-fade-rise-delay-2 group/hero">
              <TiltCard className="aspect-[3/4] w-full max-w-[400px] mx-auto" title="Nhật Quang" image="/assets/avatar.jpg" />
              <div className="absolute -bottom-6 -right-6 liquid-glass p-6 rounded-2xl hidden lg:block backdrop-blur-2xl border border-white/10 shadow-2xl z-30 min-w-[200px]">
                 <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">DATE OF BIRTH</p>
                 <p className="text-xl font-display">08/04/2003</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-24 items-start border-t border-white/5 pt-32 text-left">
              <div className="space-y-12">
                <div className="animate-fade-rise">
                  <h2 className="font-display text-5xl text-white mb-8">Học vấn & <em className="not-italic text-white/40">Chuyên môn</em></h2>
                  <div className="space-y-8">
                    <div className="group">
                      <p className="text-xs text-white/30 mb-1 tracking-widest">2021 — 2025</p>
                      <h4 className="text-xl font-display text-white">FPT University</h4>
                      <p className="text-white/50 text-sm">Bachelor of Software Engineering</p>
                    </div>
                    <div className="group border-t border-white/5 pt-8">
                      <p className="text-xs text-white/30 mb-1 tracking-widest">Professional Certificate</p>
                      <h4 className="text-xl font-display text-white">University of California, Irvine</h4>
                      <p className="text-white/50 text-sm">Project Management Project</p>
                    </div>
                    <div className="group border-t border-white/5 pt-8">
                      <p className="text-xs text-white/30 mb-1 tracking-widest">Professional Certificate</p>
                      <h4 className="text-xl font-display text-white">University of Michigan</h4>
                      <p className="text-white/50 text-sm">Introduction to UX Principles and Processes</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-12 animate-fade-rise">
                <div>
                  <h2 className="font-display text-5xl text-white mb-8">Kinh nghiệm <em className="not-italic text-white/40">Thực thi</em></h2>
                  <div className="space-y-8">
                    <div className="liquid-glass p-8 rounded-[2rem] border border-white/5 relative overflow-hidden group">
                      <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                         <MapPin className="w-12 h-12" />
                      </div>
                      <p className="text-xs text-white/30 mb-1 tracking-widest">2024 — Hiện tại</p>
                      <h4 className="text-2xl font-display text-white">Startup Vietnam Foundation (SVF)</h4>
                      <p className="text-white/60 mt-4 leading-relaxed">
                        Tham gia điều phối và quản trị các dự án đổi mới sáng tạo cấp quốc gia, kết nối hệ sinh thái khởi nghiệp Việt Nam với các nguồn lực quốc tế.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </section>

        <section id="projects" className="py-32 bg-black/40 backdrop-blur-md border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8 text-left">
              <div className="space-y-4">
                <h2 className="font-display text-5xl md:text-7xl text-white">Dự án <em className="not-italic text-white/40">Nổi bật</em></h2>
                <div className="h-1 w-24 bg-white/20" />
              </div>
              <p className="text-white/50 max-w-sm text-lg leading-relaxed">Những cột mốc trên hành trình xây dựng hệ sinh thái đổi mới sáng tạo và kết nối tri thức.</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-24 items-start">
              {/* Project Navigation List */}
              <div className="space-y-4 text-left max-h-[600px] overflow-y-auto pr-4 custom-scrollbar">
                {projects.map((project, index) => (
                  <button
                    key={project.id}
                    onClick={() => setActiveProjectIndex(index)}
                    className={cn(
                      "w-full text-left p-6 rounded-2xl transition-all duration-300 border group relative overflow-hidden",
                      activeProjectIndex === index 
                        ? "bg-white/10 border-white/20" 
                        : "bg-transparent border-transparent hover:bg-white/5"
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <span className={cn(
                        "text-[10px] font-mono opacity-40 transition-colors",
                        activeProjectIndex === index ? "text-white" : "text-white/20"
                      )}>
                        0{index + 1}
                      </span>
                      <div className="flex-1">
                        <p className={cn(
                          "text-[9px] tracking-[0.3em] uppercase mb-1",
                          activeProjectIndex === index ? "text-white/60" : "text-white/20"
                        )}>
                          {project.category}
                        </p>
                        <h4 className={cn(
                          "font-display text-lg transition-colors leading-tight",
                          activeProjectIndex === index ? "text-white" : "text-white/40"
                        )}>
                          {project.title}
                        </h4>
                      </div>
                    </div>
                    {activeProjectIndex === index && (
                      <motion.div 
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 2, ease: "linear" }}
                        className="absolute bottom-0 left-0 h-0.5 bg-white origin-left w-full pointer-events-none opacity-20"
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Active Project Card Display */}
              <div className="relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeProject.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="space-y-8 text-left"
                  >
                    <div 
                      onClick={() => navigate(`/project/${activeProject.id}`)} 
                      className="cursor-pointer"
                    >
                      <TiltCard 
                        image={activeProject.imageUrl} 
                        className="aspect-[16/10] w-full" 
                      />
                    </div>
                    
                    <div className="space-y-6 max-w-2xl">
                      <div className="flex items-center gap-4">
                        <span className="text-[10px] font-body tracking-[0.3em] uppercase text-white/40 px-3 py-1 border border-white/10 rounded-full">
                          {activeProject.role}
                        </span>
                      </div>
                      <h3 className="font-display text-4xl md:text-5xl text-white leading-[1.1]">
                        {activeProject.title}
                      </h3>
                      <p className="text-white/60 text-lg leading-relaxed font-light">
                        {activeProject.description}
                      </p>
                      <GlassButton variant="small" onClick={() => navigate(`/project/${activeProject.id}`)}>
                        Xem chi tiết dự án
                      </GlassButton>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

        <section id="gallery" className="py-32 bg-black/60 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-24 space-y-6">
              <h2 className="font-display text-5xl md:text-7xl text-white">Beyond the <em className="not-italic text-white/40">Workspace</em></h2>
              <p className="text-white/50 text-lg max-w-2xl mx-auto">Sự bền bỉ trên những cung đường Trekking và tinh thần đồng đội nảy lửa trên sân Bóng bầu dục.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[300px]">
              <div className="md:col-span-2 md:row-span-2">
                <TiltCard image="/assets/gallery/rugby3.jpg" className="w-full h-full">
                  <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
                    <p className="text-xs uppercase tracking-widest text-white/60">Sport</p>
                    <p className="text-2xl font-display text-white">Rugby Enthusiast</p>
                  </div>
                </TiltCard>
              </div>
              <div className="md:col-span-2 md:row-span-1"><TiltCard image="/assets/gallery/trekking4.jpg" className="w-full h-full" /></div>
              <div className="md:col-span-1 md:row-span-1"><TiltCard image="/assets/gallery/running1.jpg" className="w-full h-full" /></div>
              <div className="md:col-span-1 md:row-span-1"><TiltCard image="/assets/gallery/running2.jpg" className="w-full h-full" /></div>
              <div className="md:col-span-2 md:row-span-1"><TiltCard image="/assets/gallery/activity5.jpg" className="w-full h-full" /></div>
              <div className="md:col-span-2 md:row-span-1">
                 <div className="liquid-glass w-full h-full rounded-[2rem] flex flex-col items-center justify-center p-8 text-center border border-white/5">
                    <p className="font-display text-3xl text-white mb-2 italic">Life in Motion</p>
                    <p className="text-white/40 text-sm">Chạy bộ, Trekking và Rugby không chỉ là thể thao - đó là cách tôi rèn luyện sự bền bỉ và tinh thần kỷ luật.</p>
                 </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-32 bg-black border-t border-white/5 relative">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-24 items-center">
            <div className="space-y-8">
              <h2 className="font-display text-6xl md:text-8xl text-white leading-[0.9]">Let's Build <br/> <em className="not-italic text-white/40">Together.</em></h2>
              <p className="text-white/50 text-xl max-w-md">Luôn sẵn lòng cho những ý tưởng mới, những dự án đột phá và những cơ hội hợp tác ý nghĩa.</p>
              <div className="flex flex-col gap-4 text-white/80">
                <div className="flex items-center gap-4 group"><div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all"><Mail className="w-5 h-5" /></div><span>quangtnh.asi@gmail.com</span></div>
                <div className="flex items-center gap-4 group"><div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all"><MapPin className="w-5 h-5" /></div><span>Ho Chi Minh City, Vietnam</span></div>
              </div>
            </div>
            <div className="liquid-glass p-12 rounded-[2rem] space-y-8">
               <h4 className="text-2xl font-display">Gửi thông điệp</h4>
               <div className="space-y-4">
                  <input type="text" placeholder="Họ và tên" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 outline-none focus:border-white/30 transition-colors" />
                  <input type="email" placeholder="Email liên hệ" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 outline-none focus:border-white/30 transition-colors" />
                  <textarea placeholder="Nội dung" rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 outline-none focus:border-white/30 transition-colors" />
                  <button className="w-full bg-white text-black font-medium py-5 rounded-xl hover:bg-white/90 transition-all cursor-pointer">Gửi ngay</button>
               </div>
            </div>
          </div>
          <footer className="mt-32 pt-12 border-t border-white/5 max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8 pb-12">
            <div className="font-display text-2xl">Nhật Quang</div>
            <div className="text-xs tracking-[0.2em] uppercase text-white/30 flex items-center justify-center gap-2">
          © 2026 Xây dựng sự bền vững từ những hệ thống logic
          <div className="w-1 h-1 rounded-full bg-green-500/40 animate-pulse" />
        </div>
            <div className="flex gap-8 text-white/40 text-xs tracking-widest uppercase">
              <a href="#" className="hover:text-white transition-colors">Facebook</a>
              <a href="https://www.instagram.com/sapios_error/?hl=en" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>
              <a href="#" className="hover:text-white transition-colors">Behance</a>
            </div>
          </footer>
        </section>
      </div>
    </div>
  );
};

export default function App() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  const projects: Project[] = [
    {
      id: 8,
      title: "Vietnam Innovation Challenge (ViGen)",
      subtitle: "NIC x Meta x AI for Vietnam",
      role: "PROJECT COORDINATOR",
      category: "Quy mô quốc gia",
      description: "Xây dựng bộ dữ liệu ngôn ngữ tiếng Việt mở và chất lượng cao để thúc đẩy nghiên cứu, ứng dụng AI tại Việt Nam.",
      imageUrl: "/assets/projects/innovation_challenge/1.jpg"
    },
    {
      id: 4,
      title: "TECHFEST VIETNAM 2024",
      subtitle: "Bộ Khoa học và Công nghệ & SVF",
      role: "PROJECT COORDINATOR",
      category: "Quy mô quốc gia",
      description: "Vinh danh Top 3 Cuộc thi Tìm kiếm tài năng Khởi nghiệp Sáng tạo Quốc gia TECHFEST 2024 tại Lễ Khai mạc với sự tham dự của Thủ tướng Chính phủ.",
      imageUrl: "/assets/projects/techfest2024/1.jpg"
    },
    {
      id: 1,
      title: "Vietnam Fintech & Regtech Immersion 2026",
      subtitle: "Australia - Vietnam Financial Immersion",
      role: "PROJECT MANAGER",
      category: "Hợp tác Chính phủ (Australia)",
      description: "Điều phối chuỗi sự kiện tại TP.HCM và Hà Nội, kết nối mạng lưới đối tác chuyên sâu và kiến tạo hạ tầng tài chính hiện đại.",
      imageUrl: "/assets/projects/project1/1.jpg"
    },
    {
      id: 5,
      title: "Vietnam Market Deep-Dive Series",
      subtitle: "Austrade Market Entry Insights",
      role: "PROJECT COORDINATOR",
      category: "Hợp tác Chính phủ (Australia)",
      description: "Cung cấp cái nhìn thực tế về thị trường Việt Nam cho doanh nghiệp Australia, thúc đẩy kết nối giao thương bền vững.",
      imageUrl: "/assets/projects/vietnam_market/1.jpg"
    },
    {
      id: 2,
      title: "GreenBio Global Idea Bridge Lab 2025",
      subtitle: "Vietnam - Korea Bio-Tech Collaboration",
      role: "PROJECT MANAGER",
      category: "Hợp tác quốc tế",
      description: "Chương trình hợp tác quốc tế kéo dài 3 tháng, kết nối sinh viên Việt - Hàn trong các giải pháp công nghệ sinh học xanh và kinh tế tuần hoàn.",
      imageUrl: "/assets/projects/greenbio/1.jpg"
    },
    {
      id: 3,
      title: "Startup Field Trip: Global Mindset - Local Action",
      subtitle: "ChungNam National University x SVF",
      role: "PROJECT MANAGER",
      category: "Hợp tác quốc tế",
      description: "Hành trình 72 giờ thực chiến giúp sinh viên Hàn - Việt bản địa hóa ý tưởng khởi nghiệp thông qua khảo sát thị trường và kết nối chuyên gia.",
      imageUrl: "/assets/projects/startup_trip/1.jpg"
    },
    {
      id: 7,
      title: "Startups Meet Finland",
      subtitle: "SVF x Business Finland x Business Helsinki",
      role: "PROJECT MANAGER",
      category: "Hợp tác quốc tế",
      description: "Kết nối hệ sinh thái đổi mới sáng tạo Việt Nam - Phần Lan, mở ra cơ hội thâm nhập thị trường Bắc Âu và EU cho các startup Việt.",
      imageUrl: "/assets/projects/finland/1.jpg"
    },
    {
      id: 6,
      title: "Vietnam-Japan M&A Matching",
      subtitle: "NIC x SVF x SiteCatcher",
      role: "PROJECT COORDINATOR",
      category: "Kết nối đầu tư",
      description: "Cầu nối chiến lược cho các thương vụ sáp nhập và gọi vốn giữa doanh nghiệp Việt Nam và nhà đầu tư Nhật Bản.",
      imageUrl: "/assets/projects/sitecatcher/1.jpg"
    }
  ];

  if (!mounted) return null;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home projects={projects} />} />
        <Route path="/project/:id" element={<ProjectDetailsPage />} />
      </Routes>
      <ChatAssistant />
    </Router>
  );
}
