import { motion } from "motion/react";
import React, { useEffect, useState } from "react";
import { ArrowLeft, Calendar, User, MapPin } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { cn } from "@/src/lib/utils";

interface ProjectDetails {
  id: number;
  title: string;
  role: string;
  description: string;
  longDescription: string;
  location: string;
  date: string;
  images: string[];
}

const projectData: Record<string, ProjectDetails> = {
  "8": {
    id: 8,
    title: "Vietnam Innovation Challenge (ViGen)",
    role: "PROJECT COORDINATOR",
    description: "Sáng kiến quốc gia thúc đẩy hệ sinh thái AI Việt Nam.",
    longDescription: "Sáng 1/10 tại NIC (Hòa Lạc), Ngày hội Đổi mới sáng tạo Quốc gia 2025 đã khai mạc với sự hiện diện của lãnh đạo Chính phủ. Điểm nhấn là ViGen – sáng kiến hợp tác giữa NIC, Meta và AI for Vietnam nhằm xây dựng bộ dữ liệu ngôn ngữ tiếng Việt mở và chất lượng cao.\n\nViGen không chỉ là tài nguyên AI mà còn là chiến lược giúp Việt Nam làm chủ công nghệ, đa dạng hóa hệ sinh thái AI nội địa và khẳng định năng lực số quốc gia với khẩu hiệu 'Đưa bản sắc Việt vào AI'. Metat cam kết mở ra các công cụ AI để cộng đồng cùng sáng tạo, trao quyền cho mọi cá nhân để không ai bị bỏ lại phía sau.",
    location: "NIC Hoa Lac, Hanoi",
    date: "October 2025",
    images: [
      "/assets/projects/innovation_challenge/1.jpg",
      "/assets/projects/innovation_challenge/2.jpg",
      "/assets/projects/innovation_challenge/3.jpg",
      "/assets/projects/innovation_challenge/4.jpg",
      "/assets/projects/innovation_challenge/5.jpg",
      "/assets/projects/innovation_challenge/6.jpg",
      "/assets/projects/innovation_challenge/7.jpg",
      "/assets/projects/innovation_challenge/8.jpg"
    ]
  },
  "1": {
    id: 1,
    title: "Vietnam Fintech & Regtech Immersion 2026",
    role: "PROJECT MANAGER",
    description: "Điều phối chuỗi sự kiện tại TP.HCM và Hà Nội.",
    longDescription: "Sự kiện Vietnam Fintech & Regtech Immersion Program 2026 đánh dấu cột mốc quan trọng trong quan hệ hợp tác tài chính Australia - Việt Nam. Chương trình tập trung vào việc định hình tầm nhìn chiến lược và kiến tạo hạ tầng trọng yếu cho Trung tâm Tài chính Quốc tế Việt Nam tại TP.HCM (VIFC-HCMC), đồng thời thúc đẩy đối thoại chính sách và kết nối mạng lưới đối tác chuyên sâu tại Hà Nội.",
    location: "TP.HCM & Hà Nội, Vietnam",
    date: "April 2026",
    images: [
      "/assets/projects/project1/1.jpg", "/assets/projects/project1/2.jpg", "/assets/projects/project1/3.jpg", "/assets/projects/project1/4.jpg", "/assets/projects/project1/5.jpg", "/assets/projects/project1/6.jpg", "/assets/projects/project1/7.jpg", "/assets/projects/project1/8.jpg", "/assets/projects/project1/9.jpg", "/assets/projects/project1/10.jpg", "/assets/projects/project1/11.jpg", "/assets/projects/project1/12.jpg", "/assets/projects/project1/13.jpg", "/assets/projects/project1/14.jpg", "/assets/projects/project1/15.jpg", "/assets/projects/project1/16.jpg", "/assets/projects/project1/17.jpg"
    ]
  },
  "4": {
    id: 4,
    title: "TECHFEST VIETNAM 2024",
    role: "PROJECT COORDINATOR",
    description: "Vinh danh Top 3 Cuộc thi Tìm kiếm tài năng Khởi nghiệp Sáng tạo Quốc gia TECHFEST 2024.",
    longDescription: "Tại Hải Phòng, Thủ tướng Chính phủ Phạm Minh Chính đã dự Lễ khai mạc TECHFEST 2024 với chủ đề “Chung tay phát triển hệ sinh thái khởi nghiệp sáng tạo Việt Nam”. Top 3 đội thi xuất sắc nhất đã được vinh danh, nhận lãnh trách nhiệm truyền cảm hứng về vai trò của đổi mới sáng tạo trong thời đại mới.",
    location: "Hai Phong, Vietnam",
    date: "November 2024",
    images: [
      "/assets/projects/techfest2024/1.jpg", "/assets/projects/techfest2024/2.jpg", "/assets/projects/techfest2024/3.jpg", "/assets/projects/techfest2024/4.jpg", "/assets/projects/techfest2024/5.jpg", "/assets/projects/techfest2024/6.jpg", "/assets/projects/techfest2024/7.jpg", "/assets/projects/techfest2024/8.jpg", "/assets/projects/techfest2024/9.jpg", "/assets/projects/techfest2024/10.jpg", "/assets/projects/techfest2024/11.jpg", "/assets/projects/techfest2024/12.jpg"
    ]
  },
  "2": {
    id: 2,
    title: "GreenBio Global Idea Bridge Lab 2025",
    role: "PROJECT MANAGER",
    description: "Chương trình hợp tác quốc tế kéo dài 3 tháng về công nghệ sinh học xanh.",
    longDescription: "Hành trình kéo dài hơn 3 tháng giúp sinh viên Việt Nam - Hàn Quốc cùng nhau giải quyết các thách thức như biến đổi khí hậu và kinh tế tuần hoàn. Pitching & Demo Day đã vinh danh Top 3 dự án xuất sắc nhất: DO YOUR BEST AND PREPARE WELL, BIODA, và AKESIO. Đây là không gian đối thoại học thuật và ứng dụng thực tiễn bền vững.",
    location: "TP.HCM, Vietnam",
    date: "Oct 2024 - Jan 2025",
    images: [
      "/assets/projects/greenbio/1.jpg", "/assets/projects/greenbio/2.jpg", "/assets/projects/greenbio/3.jpg", "/assets/projects/greenbio/4.jpg", "/assets/projects/greenbio/5.jpg", "/assets/projects/greenbio/6.jpg", "/assets/projects/greenbio/7.jpg", "/assets/projects/greenbio/8.jpg", "/assets/projects/greenbio/9.jpg", "/assets/projects/greenbio/10.jpg", "/assets/projects/greenbio/11.jpg", "/assets/projects/greenbio/12.jpg", "/assets/projects/greenbio/13.jpg"
    ]
  },
  "3": {
    id: 3,
    title: "Startup Field Trip: Global Mindset - Local Action",
    role: "PROJECT MANAGER",
    description: "Hành trình 72 giờ thực chiến giúp sinh viên Hàn - Việt bản địa hóa ý tưởng.",
    longDescription: "Startup Field Trip tập trung vào tư duy 'Global Mindset - Local Action'. Sinh viên Hàn Quốc và Việt Nam đã trải qua 3 chặng: Kích hoạt tư duy chiến lược, Dấn thân vào thị trường thực tế (Field Trip), và Bùng nổ với pitching các mô hình kinh doanh đã được bản địa hóa như Smart Farm, Space Mate, và AI Healthcare.",
    location: "Ho Chi Minh City, Vietnam",
    date: "August 2025",
    images: [
      "/assets/projects/startup_trip/1.jpg", "/assets/projects/startup_trip/2.jpg", "/assets/projects/startup_trip/3.jpg", "/assets/projects/startup_trip/4.jpg", "/assets/projects/startup_trip/5.jpg", "/assets/projects/startup_trip/6.jpg", "/assets/projects/startup_trip/7.jpg", "/assets/projects/startup_trip/8.jpg"
    ]
  },
  "5": {
    id: 5,
    title: "Vietnam Market Deep-Dive Series",
    role: "PROJECT COORDINATOR",
    description: "Điều phối khung hậu cần cho các workshop và kết nối kinh doanh.",
    longDescription: "Dự án hợp tác với Austrade nhằm cung cấp cái nhìn thực tế về thị trường Việt Nam cho doanh nghiệp Australia. Tôi chịu trách nhiệm điều phối khung hậu cần, chuẩn bị tài liệu sự kiện và đảm bảo sự sẵn sàng cho đại diện Austrade để kiến tạo các kết nối thương mại bền vững giữa hai quốc gia.",
    location: "Ho Chi Minh City, Vietnam",
    date: "April - May 2025",
    images: [
      "/assets/projects/vietnam_market/1.jpg", "/assets/projects/vietnam_market/2.jpg"
    ]
  },
  "6": {
    id: 6,
    title: "Vietnam-Japan M&A Matching",
    role: "PROJECT COORDINATOR",
    description: "Kết nối đầu tư M&A giữa doanh nghiệp Nhật Bản và Việt Nam.",
    longDescription: "Chương trình được NIC, SVF và SiteCatcher phối hợp tổ chức, thu hút 20 doanh nghiệp Việt và 6 nhà đầu tư Nhật Bản. Dự án tập trung thúc đẩy M&A, mở rộng thị trường và gia tăng hiểu biết song phương thông qua các phiên kết nối trực tiếp và chuyên sâu.",
    location: "Hanoi, Vietnam",
    date: "June 20, 2025",
    images: [
      "/assets/projects/sitecatcher/1.jpg", "/assets/projects/sitecatcher/2.jpg", "/assets/projects/sitecatcher/3.jpg", "/assets/projects/sitecatcher/4.jpg", "/assets/projects/sitecatcher/5.jpg"
    ]
  },
  "7": {
    id: 7,
    title: "Startups Meet Finland",
    role: "PROJECT MANAGER",
    description: "Kết nối hệ sinh thái đổi mới sáng tạo Việt Nam - Phần Lan.",
    longDescription: "Startups Meet Finland mở ra không gian gặp gỡ giữa hệ sinh thái khởi nghiệp Việt Nam và Phần Lan. Phiên Private Session - Matching 1:1 đã giúp các startup xuất sắc trực tiếp kết nối cùng Business Finland và các tổ chức hang đầu Bắc Âu để thảo luận chiến lược vươn ra thị trường EU.",
    location: "Ho Chi Minh City, Vietnam",
    date: "September 2025",
    images: [
      "/assets/projects/finland/1.jpg", "/assets/projects/finland/2.jpg", "/assets/projects/finland/3.jpg", "/assets/projects/finland/4.jpg", "/assets/projects/finland/5.jpg", "/assets/projects/finland/6.jpg", "/assets/projects/finland/7.jpg", "/assets/projects/finland/8.jpg", "/assets/projects/finland/9.jpg", "/assets/projects/finland/10.jpg"
    ]
  }
};

export default function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = id ? projectData[id] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-display text-white/40 italic">Dự án không tồn tại</h2>
          <button 
            onClick={() => navigate('/')} 
            className="text-white hover:underline underline-offset-4 cursor-pointer"
          >
            Quay lại trang chủ
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 inset-x-0 z-50 p-8 flex justify-between items-center pointer-events-none">
        <button 
          onClick={() => navigate('/')}
          className="pointer-events-auto liquid-glass w-12 h-12 rounded-full flex items-center justify-center hover:scale-110 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="pointer-events-auto hidden md:block">
            <span className="text-[10px] tracking-[0.3em] text-white/40 uppercase">Project Details / {id}</span>
        </div>
      </nav>

      {/* Hero Header */}
      <section className="pt-40 pb-20 px-8 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-end">
          <div className="space-y-6">
            <div className="flex items-center gap-4 animate-fade-rise">
              <span className="text-[10px] font-body tracking-[0.3em] uppercase text-white/40 px-3 py-1 border border-white/10 rounded-full">
                {project.role}
              </span>
            </div>
            <h1 className="font-display text-6xl md:text-8xl leading-[0.95] tracking-tight animate-fade-rise">
              {project.title}
            </h1>
          </div>
          <div className="animate-fade-rise-delay space-y-8 pb-4">
             <div className="flex flex-wrap gap-8 text-white/40 text-sm">
                <div className="flex items-center gap-2">
                   <MapPin className="w-4 h-4" />
                   <span>{project.location}</span>
                </div>
                <div className="flex items-center gap-2">
                   <Calendar className="w-4 h-4" />
                   <span>{project.date}</span>
                </div>
             </div>
             <p className="text-white/60 text-xl leading-relaxed font-light">
                {project.longDescription}
             </p>
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="px-8 max-w-7xl mx-auto pb-40">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {project.images.map((img, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={cn(
                "liquid-glass rounded-[2rem] overflow-hidden",
                i === 0 ? "aspect-[16/10]" : "aspect-[16/11]",
                i === 0 && "md:col-span-2"
              )}
            >
              <img 
                src={img} 
                alt={`${project.title} - ${i}`} 
                className="w-full h-full object-cover transition-all duration-1000 transform hover:scale-105" 
                referrerPolicy="no-referrer"
              />
            </motion.div>
          ))}
        </div>

        <div className="mt-32 text-center animate-fade-rise">
           <h3 className="font-display text-4xl text-white/40 italic">"Xây dựng hành trình từ những cảm xúc thực tế."</h3>
           <button 
             onClick={() => navigate('/')}
             className="mt-12 liquid-glass px-12 py-4 rounded-full text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-all cursor-pointer"
           >
             Quay lại dánh sách
           </button>
        </div>
      </section>

      {/* Footer Minimal */}
      <footer className="p-12 text-center border-t border-white/5 text-[10px] tracking-widest text-white/20 uppercase">
        © 2026 Nhật Quang Portfolio - All feelings captured
      </footer>
    </div>
  );
}
