/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { 
  MessageCircle, 
  CheckCircle2, 
  ShieldCheck, 
  HardHat, 
  Home, 
  Building2, 
  Wrench, 
  Users, 
  ChevronDown, 
  Menu, 
  X,
  MapPin,
  Mail,
  ArrowRight,
  Globe,
  ShieldAlert,
  Clock,
  Quote,
  Play,
  Maximize2,
  Map as MapIcon,
  ExternalLink,
  Eye,
  Paintbrush,
  Hammer,
  Trees,
  Instagram,
  Send,
  User,
  Phone,
  FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility for tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

gsap.registerPlugin(ScrollTrigger);

// Constants
const LOGO_ID = '19JXlY8o9YwcJqVPXUSXz8ZaIq6ayJd1a';
const HERO_BG_ID = '1kzLjVFqJA81FHVB5YuCw2uTePoEcZrj7';
const WHATSAPP_LINK = "https://wa.me/5547989085767?text=Olá! Gostaria de solicitar um orçamento para reforma e manutenção.";
const getImageUrl = (id: string) => `https://lh3.googleusercontent.com/d/${id}`;

// --- Components ---

const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const outlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (dotRef.current && outlineRef.current) {
        gsap.to(dotRef.current, { x: e.clientX, y: e.clientY, duration: 0 });
        gsap.to(outlineRef.current, { x: e.clientX, y: e.clientY, duration: 0.15, ease: "power2.out" });
      }
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot hidden md:block" />
      <div ref={outlineRef} className="cursor-outline hidden md:flex" />
    </>
  );
};

const SpotlightCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={cn("spotlight-card rounded-[2rem] p-8 group overflow-hidden", className)}
      style={{
        '--mouse-x': '0px',
        '--mouse-y': '0px'
      } as React.CSSProperties}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
           style={{
             background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(47, 127, 180, 0.1), transparent 40%)`
           }} 
      />
      <div className="relative z-10 h-full flex flex-col">
        {children}
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<{ id: string; title: string; category: string } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // GSAP Animations
    const ctx = gsap.context(() => {
      // Hero animations
      gsap.from(".reveal-text", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "power4.out"
      });

      // Narrative scrolly text
      const words = gsap.utils.toArray(".highlight-word");
      gsap.fromTo(words, 
        { opacity: 0.1, filter: "blur(8px)", y: 20 },
        { 
          opacity: 1, 
          filter: "blur(0px)", 
          y: 0, 
          stagger: 0.1,
          scrollTrigger: {
            trigger: "#narrative",
            start: "top center",
            end: "bottom center",
            scrub: 1,
          }
        }
      );

      // Horizontal scroll for services - desktop only
      let mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        const track = document.querySelector(".services-track");
        if (track) {
          gsap.to(track, {
            x: () => -(track.scrollWidth - window.innerWidth + 100),
            ease: "none",
            scrollTrigger: {
              trigger: "#servicos-pin",
              start: "top top",
              end: () => `+=${track.scrollWidth}`,
              pin: true,
              scrub: 1,
              invalidateOnRefresh: true,
            }
          });
        }
      });
    }, containerRef);

    return () => {
      ctx.revert();
      lenis.destroy();
    };
  }, []);

  return (
    <div ref={containerRef} className="bg-[#012D46] text-white selection:bg-blue-500/30 selection:text-blue-200">
      <CustomCursor />
      <div className="noise" />

      {/* Ambient Blobs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-blue-500/10 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-blue-400/5 blur-[150px]" />
      </div>

      {/* Navbar */}
      <nav className="fixed top-4 md:top-8 left-0 right-0 z-50 flex justify-center pointer-events-none px-4">
        <div className="pointer-events-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-2 py-2 flex items-center shadow-2xl transition-all hover:bg-white/10 w-full max-w-fit justify-between">
          <div className="hidden md:flex items-center">
            {[
              { label: 'Início', id: 'inicio' },
              { label: 'Soluções', id: 'servicos' },
              { label: 'Processo', id: 'qualidade' },
              { label: 'Diferenciais', id: 'galeria' },
              { label: 'Contato', id: 'contato' }
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-4 lg:px-6 py-2 text-xs font-medium text-white/70 hover:text-white rounded-full hover:bg-white/5 transition-all whitespace-nowrap"
              >
                {item.label}
              </button>
            ))}
            <div className="w-px h-4 bg-white/10 mx-2" />
          </div>

          <button 
            className="md:hidden px-4 pl-2 py-2 text-white/70 hover:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <a 
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="group px-4 md:px-6 py-2 text-xs font-bold text-[#012D46] bg-white rounded-full hover:bg-[#2F7FB4] hover:text-white transition-all shadow-lg whitespace-nowrap ml-2 md:ml-0 flex items-center shrink-0"
          >
            Agendar Reunião Técnica <ArrowRight size={14} className="inline-block ml-1 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-20 left-4 right-4 z-40 bg-[#012D46]/95 backdrop-blur-3xl border border-white/10 rounded-3xl p-4 flex flex-col gap-2 md:hidden shadow-2xl"
          >
            {[
              { label: 'Início', id: 'inicio' },
              { label: 'Soluções', id: 'servicos' },
              { label: 'Processo', id: 'qualidade' },
              { label: 'Diferenciais', id: 'galeria' },
              { label: 'Contato', id: 'contato' }
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  setIsMenuOpen(false);
                  document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full text-left px-6 py-4 text-sm font-medium text-white/70 hover:text-white rounded-2xl hover:bg-white/5 transition-all"
              >
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="inicio" className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        <div className="perspective-grid opacity-30" />
        <div className="absolute inset-0 z-0">
          <img 
            src="/banner-hero.jpg" 
            alt="Background" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="relative z-10 text-center max-w-7xl px-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-10 shadow-lg"
          >
            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full shadow-[0_0_10px_#2F7FB4]" />
            <span className="text-[10px] uppercase tracking-widest text-white/80 font-medium">Balneário Piçarras e Região</span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-medium tracking-tighter text-[#012D46] leading-[0.9] mb-10">
            <div className="overflow-hidden py-2"><span className="block reveal-text">Engenharia e Manutenção</span></div>
            <div className="overflow-hidden py-2"><span className="block reveal-text text-[#2F7FB4] animate-text-shimmer">Predial</span></div>
          </h1>

          <p className="text-lg md:text-xl text-slate-600 max-w-xl mx-auto leading-relaxed mb-14 font-light">
            Especialistas em reformas estruturais e revitalização de fachadas em Balneário Piçarras. Garantimos conformidade total com as normas ABNT e tranquilidade para a gestão do síndico.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
            <a 
              href={WHATSAPP_LINK}
              className="group relative px-9 py-4 bg-[#012D46] text-white rounded-full overflow-hidden transition-all hover:scale-105 shadow-xl"
            >
              <span className="relative z-10 text-sm font-bold flex items-center gap-2">
                Agendar Reunião Diagnóstica Sem Custo
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </a>
            <button 
              onClick={() => document.getElementById('servicos')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-9 py-4 rounded-full border border-[#012D46]/10 bg-[#012D46]/5 backdrop-blur-sm hover:bg-[#012D46]/10 transition-all text-[#012D46] font-medium text-sm"
            >
              Ver Soluções
            </button>
          </div>
        </div>
      </section>

      {/* Bento Grid / Provenance */}
      <section id="qualidade" className="py-40 relative z-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-4 flex flex-col justify-center p-6">
              <div className="inline-flex items-center gap-3 mb-6">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                <span className="text-xs text-blue-400 font-mono tracking-widest uppercase">Autoridade</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-white mb-8 leading-[1.1]">
                Engenharia Predial <br />
                <span className="text-white/40">com Responsabilidade.</span>
              </h2>
              <p className="text-slate-400 text-base mb-10 leading-relaxed border-l border-white/10 pl-6">
                A Becker atua no mercado de Santa Catarina com foco em infraestrutura e segurança predial. Nossa equipe é liderada por especialistas com registro ativo no CREA-SC e experiência em normas NBR 15.575.
              </p>
            </div>

            <div className="md:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <SpotlightCard className="h-full min-h-[300px] flex flex-col justify-between">
                <div className="relative z-10">
                  <div className="flex items-start gap-1">
                    <span className="text-7xl font-medium text-white tracking-tighter">100</span>
                    <span className="text-blue-400 text-5xl font-light mt-1">%</span>
                  </div>
                  <div className="text-xl text-white font-medium mt-2">Foco em Segurança</div>
                   <p className="text-sm text-slate-400 mt-2">Equipe treinada em NR-35 (Trabalho em Altura) e NR-18, com seguro de responsabilidade civil.</p>
                </div>
                <ShieldCheck className="text-blue-400/20 absolute right-6 bottom-6" size={120} />
              </SpotlightCard>

              <div className="flex flex-col gap-6">
                <SpotlightCard className="min-h-[180px]">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-full bg-blue-400/10 border border-blue-400/20">
                      <Clock className="text-blue-400" size={20} />
                    </div>
                    <span className="text-xl font-medium text-white">Cronograma Rigoroso</span>
                  </div>
                  <p className="text-sm text-slate-400">Cronograma físico-financeiro com relatórios semanais para controle total do condomínio.</p>
                </SpotlightCard>
                <SpotlightCard className="min-h-[180px]">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-full bg-blue-400/10 border border-blue-400/20">
                      <MapPin className="text-blue-400" size={20} />
                    </div>
                    <span className="text-xl font-medium text-white">ART em Todos os Serviços</span>
                  </div>
                  <p className="text-sm text-slate-400">Emissão de Anotação de Responsabilidade Técnica garantindo conformidade legal em cada etapa.</p>
                </SpotlightCard>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Narrative Section */}
      <section id="narrative" className="min-h-screen flex items-center justify-center relative overflow-hidden z-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-4xl md:text-6xl lg:text-7xl font-normal leading-tight tracking-tight text-white flex flex-wrap justify-center gap-x-4 gap-y-2">
            {"Você sabe o que é a responsabilidade civil e criminal de um síndico diante de uma obra mal executada? Infiltrações negligenciadas e reformas sem acompanhamento técnico são riscos graves à segurança dos moradores. A Becker entrega conformidade legal e valorização imobiliária.".split(" ").map((word, i) => (
              <span key={i} className="highlight-word inline-block">{word}</span>
            ))}
          </p>
        </div>
      </section>

      {/* Horizontal Services Section */}
      <div id="servicos" className="relative z-30">
        <section id="servicos-pin" className="md:h-screen relative overflow-hidden bg-[#012D46] border-t border-white/5 py-20 md:py-0">
          <div className="md:absolute top-12 left-12 z-20 px-6 md:px-0 mb-12 md:mb-0">
            <span className="text-xs text-blue-400 font-mono mb-3 block tracking-widest uppercase">[ Nossas Soluções Corporativas ]</span>
            <h2 className="text-4xl font-medium text-white tracking-tight">Especialidades em Engenharia Predial</h2>
          </div>

          <div className="services-track flex flex-col md:flex-row gap-8 md:gap-16 px-6 md:px-24 md:pl-[20vw] items-center md:h-full md:w-max">
            {[
              {
                title: 'Revitalização e Pintura de Fachadas',
                desc: 'Tratamento de fissuras, lavagem técnica e pintura com tintas elastoméricas de alta durabilidade para proteção contra a maresia.',
                icon: <div className="p-4 rounded-3xl bg-blue-400/10 border border-blue-400/20 shadow-[0_0_30px_rgba(47,127,180,0.2)]"><Paintbrush className="text-blue-400" size={40} /></div>,
                img: '110mp0drTx6sJISMihQHh75dV6RnGNtV4'
              },
              {
                title: 'Impermeabilização Estrutural',
                desc: 'Soluções definitivas para lajes, reservatórios, piscinas e garagens, eliminando infiltrações e protegendo a armadura de ferro.',
                icon: <div className="p-4 rounded-3xl bg-blue-400/10 border border-blue-400/20 shadow-[0_0_30px_rgba(47,127,180,0.2)]"><Building2 className="text-blue-400" size={40} /></div>,
                img: '1BElxhCE0C27iqRib3PfjgD4ur12rCHtV'
              },
              {
                title: 'Recuperação Estrutural',
                desc: 'Diagnóstico e reparo de patologias em vigas, pilares e sacadas, garantindo a integridade da edificação a longo prazo.',
                icon: <div className="p-4 rounded-3xl bg-blue-400/10 border border-blue-400/20 shadow-[0_0_30px_rgba(47,127,180,0.2)]"><Hammer className="text-blue-400" size={40} /></div>,
                img: '14rn3N9G1QKkU5Ij8O5D_JpnYQr6uKU0E'
              },
              {
                title: 'Manutenção Preventiva Contratual',
                desc: 'Planos anuais de vistoria e pequenos reparos que evitam gastos emergenciais elevados e mantêm o valor do imóvel.',
                icon: <div className="p-4 rounded-3xl bg-blue-400/10 border border-blue-400/20 shadow-[0_0_30px_rgba(47,127,180,0.2)]"><Trees className="text-blue-400" size={40} /></div>,
                img: '1COlEk5fy9OhRgg9N-ZnCafKJZQ4Wpen9'
              }
            ].map((service, i) => (
              <div key={i} className="w-full md:w-[70vw] max-w-[800px] h-auto md:h-[60vh] spotlight-card rounded-[2rem] md:rounded-[3rem] p-8 md:p-16 shrink-0 flex flex-col md:flex-row items-center gap-8 md:gap-12 border border-white/10 bg-white/[0.02]">
                <div className="w-full md:w-1/2 flex flex-col justify-center">
                  <div className="mb-6 md:mb-8">{service.icon}</div>
                  <h3 className="text-3xl md:text-5xl text-white font-medium mb-4 md:mb-6 tracking-tight">{service.title}</h3>
                  <p className="text-base md:text-lg text-slate-400 leading-relaxed">{service.desc}</p>
                </div>
                <div className="w-full md:w-1/2 h-64 md:h-full rounded-2xl overflow-hidden border border-white/5">
                  <img 
                    src={getImageUrl(service.img)} 
                    alt={service.title} 
                    className="w-full h-full object-cover grayscale md:hover:grayscale-0 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Maturity / Timeline Section */}
      <section className="py-40 bg-[#012D46] border-t border-white/5 relative z-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="lg:sticky lg:top-32 self-start">
              <span className="text-xs text-blue-400 font-mono mb-6 block tracking-widest uppercase">[ Timeline de Execução Predial ]</span>
              <h2 className="text-4xl md:text-6xl font-medium text-white tracking-tight mb-8 leading-[1.1]">
                Como entregamos <br /> <span className="text-white/40">Excelência.</span>
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed mb-12">
                SLA Becker: Garantia de 5 anos para serviços estruturais conforme legislação vigente.
              </p>
              <a href={WHATSAPP_LINK} className="group inline-flex items-center gap-3 text-white text-sm font-medium hover:text-blue-400 transition-colors">
                <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-blue-400 group-hover:bg-blue-400/10 transition-all bg-white/5">
                  <ArrowRight size={18} />
                </div>
                <span>Agendar Reunião Técnica</span>
              </a>
            </div>

            <div className="relative pl-12 border-l border-white/10 space-y-16">
              {[
                { step: '01', title: 'Diagnóstico e Planejamento', desc: 'Vistoria técnica detalhada, mapeamento de danos e elaboração da proposta técnica com cronograma. (Semana 1-2)' },
                { step: '02', title: 'Preparação e Mobilização', desc: 'Instalação de balancins/andaimes, isolamento de áreas de risco e treinamento de segurança específico para o local. (Semana 3)' },
                { step: '03', title: 'Execução Técnica', desc: 'Trabalho setorizado para minimizar o impacto visual e sonoro, com relatórios fotográficos semanais para o conselho.' },
                { step: '04', title: 'Inspeção Final e Entrega', desc: 'Vistoria de qualidade, limpeza fina e entrega de certificados de garantia e manuais de manutenção.' }
              ].map((item, i) => (
                <div key={i} className="group cursor-pointer transition-all hover:translate-x-2">
                  <div className="text-xs font-mono text-slate-500 mb-2 group-hover:text-blue-400 transition-colors">PASSO {item.step}</div>
                  <h3 className="text-2xl text-white mb-2 font-medium">{item.title}</h3>
                  <p className="text-base text-slate-500 group-hover:text-slate-400 transition-colors">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-40 bg-[#012D46] border-t border-white/5 relative z-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div className="max-w-2xl">
              <span className="text-xs text-blue-400 font-mono mb-6 block tracking-widest uppercase">[ Depoimentos ]</span>
              <h2 className="text-4xl md:text-6xl font-medium text-white tracking-tight leading-[1.1]">
                O que nossos <br /> <span className="text-white/40">Clientes dizem.</span>
              </h2>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-12 h-12 rounded-full border-2 border-[#012D46] bg-slate-800 overflow-hidden">
                    <img src={`https://i.pravatar.cc/150?u=${i + 10}`} alt="User" className="w-full h-full object-cover grayscale" />
                  </div>
                ))}
              </div>
              <div className="text-sm">
                <div className="text-white font-medium">+50 Clientes</div>
                <div className="text-slate-500">Satisfeitos na região</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Ricardo Santos",
                service: "Reforma Residencial",
                quote: "A equipe da Becker foi extremamente profissional. O prazo foi cumprido à risca e a qualidade do acabamento superou minhas expectativas."
              },
              {
                name: "Ana Paula",
                service: "Manutenção Predial",
                quote: "Contratamos a Becker para a manutenção do nosso condomínio e a diferença na organização e segurança é nítida. Recomendo fortemente."
              },
              {
                name: "Marcos Oliveira",
                service: "Reparos em Geral",
                quote: "Serviço rápido, limpo e muito técnico. É difícil encontrar profissionais tão comprometidos hoje em dia."
              }
            ].map((testimonial, i) => (
              <SpotlightCard key={i} className="bg-white/[0.02] border border-white/5 flex flex-col justify-between min-h-[320px]">
                <div className="relative">
                  <Quote className="text-blue-400/20 mb-8" size={48} />
                  <p className="text-lg text-slate-300 leading-relaxed italic mb-8">
                    "{testimonial.quote}"
                  </p>
                </div>
                <div className="mt-auto pt-8 border-t border-white/5">
                  <div className="text-white font-medium text-lg">{testimonial.name}</div>
                  <div className="text-blue-400 text-xs font-mono uppercase tracking-wider mt-1">{testimonial.service}</div>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      {/* Video Testimonials Section */}
      <section className="py-20 bg-[#012D46] border-t border-white/5 relative z-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-12">
          <span className="text-xs text-blue-400 font-mono mb-4 block tracking-widest uppercase text-center">[ Experiências Reais ]</span>
          <h2 className="text-3xl md:text-4xl font-medium text-white tracking-tight text-center">Depoimentos em Vídeo</h2>
        </div>
        
        <div className="flex overflow-hidden group">
          <div className="flex animate-marquee whitespace-nowrap py-4">
            {[
              { id: '1vu8a1xXX_e04xSRjGdbzEzaSpa1dRLL6', name: 'Ricardo S.', city: 'Piçarras', quote: 'Obra limpa e rápida!' },
              { id: '1nDtXPKJlkNrLuTUtQvksIZt1Lf8l4nz_', name: 'Ana P.', city: 'Penha', quote: 'Super recomendo!' },
              { id: '18aR2HfzXlZiovN4Kqdmnot6tWRUMhnbW', name: 'Marcos O.', city: 'Barra Velha', quote: 'Profissionalismo nota 10.' },
              { id: '1EhyVW-mCOM1ZfSiM_0wQwvGIVE6RT4Mn', name: 'Juliana F.', city: 'Piçarras', quote: 'Prazos cumpridos.' },
              { id: '1vu8a1xXX_e04xSRjGdbzEzaSpa1dRLL6', name: 'Ricardo S.', city: 'Piçarras', quote: 'Obra limpa e rápida!' },
              { id: '1nDtXPKJlkNrLuTUtQvksIZt1Lf8l4nz_', name: 'Ana P.', city: 'Penha', quote: 'Super recomendo!' },
              { id: '18aR2HfzXlZiovN4Kqdmnot6tWRUMhnbW', name: 'Marcos O.', city: 'Barra Velha', quote: 'Profissionalismo nota 10.' },
              { id: '1EhyVW-mCOM1ZfSiM_0wQwvGIVE6RT4Mn', name: 'Juliana F.', city: 'Piçarras', quote: 'Prazos cumpridos.' }
            ].map((video, i) => (
              <div key={i} className="inline-block w-[300px] h-[500px] mx-4 rounded-3xl overflow-hidden border border-white/10 bg-white/5 relative group/video">
                <img 
                  src={getImageUrl(video.id)} 
                  alt="Video Thumbnail" 
                  className="w-full h-full object-cover opacity-60 group-hover/video:opacity-100 transition-opacity duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover/video:scale-110 transition-transform">
                    <Play className="text-white fill-white ml-1" size={24} />
                  </div>
                </div>
                <div className="absolute bottom-6 left-6 right-6 whitespace-normal">
                  <div className="text-blue-400 font-mono text-[10px] uppercase tracking-widest mb-1">"{video.quote}"</div>
                  <div className="text-white font-medium text-sm">{video.name}</div>
                  <div className="text-white/60 text-xs">{video.city}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Gallery Section */}
      <section id="galeria" className="py-40 bg-[#012D46] border-t border-white/5 relative z-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div className="max-w-2xl">
              <span className="text-xs text-blue-400 font-mono mb-6 block tracking-widest uppercase">[ Portfólio ]</span>
              <h2 className="text-4xl md:text-6xl font-medium text-white tracking-tight leading-[1.1]">
                Projetos que <br /> <span className="text-white/40">Transformamos.</span>
              </h2>
            </div>
            <p className="text-slate-400 max-w-sm text-sm leading-relaxed">
              Cada obra é um compromisso com a excelência. Explore nossa galeria de reformas residenciais e comerciais concluídas com sucesso.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { id: '110mp0drTx6sJISMihQHh75dV6RnGNtV4', title: 'Reforma de Cobertura', category: 'Residencial' },
              { id: '1BElxhCE0C27iqRib3PfjgD4ur12rCHtV', title: 'Manutenção de Fachada', category: 'Predial' },
              { id: '14rn3N9G1QKkU5Ij8O5D_JpnYQr6uKU0E', title: 'Área Gourmet', category: 'Lazer' },
              { id: '1COlEk5fy9OhRgg9N-ZnCafKJZQ4Wpen9', title: 'Piscina e Deck', category: 'Lazer' },
              { id: '1vu8a1xXX_e04xSRjGdbzEzaSpa1dRLL6', title: 'Interior Moderno', category: 'Residencial' },
              { id: '1nDtXPKJlkNrLuTUtQvksIZt1Lf8l4nz_', title: 'Reforma Comercial', category: 'Comercial' }
            ].map((project, i) => (
              <ProjectCard key={i} project={project} onClick={() => setSelectedProject(project)} />
            ))}
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section id="localizacao" className="py-40 bg-[#012D46] border-t border-white/5 relative z-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <span className="text-xs text-blue-400 font-mono mb-6 block tracking-widest uppercase">[ Onde Estamos ]</span>
              <h2 className="text-4xl md:text-6xl font-medium text-white tracking-tight mb-8 leading-[1.1]">
                Nossa Base em <br /> <span className="text-white/40">Balneário Piçarras.</span>
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed mb-10">
                Estamos estrategicamente localizados para atender todo o litoral norte de Santa Catarina com agilidade e eficiência.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4 p-6 rounded-3xl bg-white/[0.02] border border-white/5">
                  <MapIcon className="text-blue-400 shrink-0" size={24} />
                  <div>
                    <div className="text-white font-medium mb-1">Endereço</div>
                    <div className="text-slate-400 text-sm">Balneário Piçarras, SC - Brasil</div>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-6 rounded-3xl bg-white/[0.02] border border-white/5">
                  <Clock className="text-blue-400 shrink-0" size={24} />
                  <div>
                    <div className="text-white font-medium mb-1">Horário de Atendimento</div>
                    <div className="text-slate-400 text-sm">Segunda a Sexta: 08:00 - 18:00</div>
                  </div>
                </div>
              </div>

              <a 
                href="https://www.google.com/maps/search/Balneário+Piçarras" 
                target="_blank" 
                rel="noopener noreferrer"
                className="mt-10 inline-flex items-center gap-2 text-blue-400 hover:text-white transition-colors text-sm font-medium"
              >
                Abrir no Google Maps <ExternalLink size={14} />
              </a>
            </div>

            <div className="h-[500px] rounded-[3rem] overflow-hidden border border-white/10 relative group">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14254.444444444445!2d-48.67!3d-26.76!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94d9299999999999%3A0x9999999999999999!2sBalneário%20Piçarras%2C%20SC!5e0!3m2!1spt-BR!2sbr!4v1620000000000!5m2!1spt-BR!2sbr" 
                width="100%" 
                height="100%" 
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(0.8) contrast(1.2)' }} 
                allowFullScreen={true} 
                loading="lazy"
                title="Localização Becker Reformas"
              ></iframe>
              <div className="absolute inset-0 pointer-events-none border-[20px] border-[#012D46] rounded-[3rem]"></div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ & Final CTA */}
      <section id="contato" className="py-40 bg-[#012D46] border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-20">
            <span className="text-xs text-blue-400 font-mono mb-4 block tracking-widest uppercase">[ Perguntas Frequentes ]</span>
            <h2 className="text-3xl md:text-4xl font-medium text-white tracking-tight">Tire suas dúvidas</h2>
          </div>
          
          <div className="space-y-4 mb-32">
            {[
              { q: 'Como vocês garantem a segurança dos moradores durante a obra?', a: 'Isolamos 100% das áreas de circulação abaixo dos pontos de trabalho e instalamos redes de proteção e bandejas conforme a NR-18.' },
              { q: 'Vocês parcelam o valor da obra para o condomínio?', a: 'Sim, oferecemos condições facilitadas e parcelamento direto durante o período de execução para viabilizar o fluxo de caixa do fundo de reserva.' },
              { q: 'A empresa possui seguro contra danos a terceiros?', a: 'Sim, mantemos apólice de seguro ativa que cobre qualquer eventual dano ao patrimônio ou a veículos de moradores durante o serviço.' },
              { q: 'O engenheiro acompanha a obra diariamente?', a: 'Toda obra possui um mestre de obras residente e visitas técnicas sistemáticas do engenheiro responsável para validação de cada etapa.' }
            ].map((faq, i) => (
              <FaqItem key={i} question={faq.q} answer={faq.a} />
            ))}
          </div>

          {/* Contact Form Section */}
          <div id="orcamento" className="mb-40">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div>
                <span className="text-xs text-blue-400 font-mono mb-4 block tracking-widest uppercase">[ Consultoria Diagnóstica ]</span>
                <h2 className="text-4xl md:text-5xl font-medium text-white tracking-tight mb-8 leading-tight">
                  Pronto para garantir a segurança e a <span className="text-white/40">valorização do seu condomínio?</span>
                </h2>
                <p className="text-slate-400 text-lg leading-relaxed mb-10">
                  Agende uma reunião diagnóstica gratuita com nosso engenheiro. Em 60 minutos, apresentaremos uma análise preliminar da situação do seu prédio e os caminhos para uma manutenção eficiente.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-4 text-white/70">
                    <div className="w-10 h-10 rounded-full bg-blue-400/10 flex items-center justify-center text-blue-400">
                      <CheckCircle2 size={20} />
                    </div>
                    <span>Emissão de ART em todos os serviços</span>
                  </div>
                  <div className="flex items-center gap-4 text-white/70">
                    <div className="w-10 h-10 rounded-full bg-blue-400/10 flex items-center justify-center text-blue-400">
                      <CheckCircle2 size={20} />
                    </div>
                    <span>Cronograma físico-financeiro rigoroso para o condomínio</span>
                  </div>
                  <div className="flex items-center gap-4 text-white/70">
                    <div className="w-10 h-10 rounded-full bg-blue-400/10 flex items-center justify-center text-blue-400">
                      <CheckCircle2 size={20} />
                    </div>
                    <span>Seguro de responsabilidade civil para proteção do patrimônio</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/[0.02] border border-white/10 rounded-[3rem] p-8 md:p-12 backdrop-blur-sm">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Instagram Section */}
      <section className="py-32 bg-white relative z-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-full p-1 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600">
                <div className="w-full h-full rounded-full bg-white p-1">
                  <img 
                    src={getImageUrl(LOGO_ID)} 
                    alt="Becker Logo" 
                    className="w-full h-full object-contain rounded-full"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#012D46]">becker_reformas</h3>
                <p className="text-slate-500 text-sm">Balneário Piçarras • Engenharia e Manutenção Predial</p>
              </div>
            </div>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-8 py-3 bg-[#012D46] text-white rounded-full font-bold text-sm hover:bg-[#2F7FB4] transition-all flex items-center gap-2"
            >
              <Instagram size={18} />
              Seguir no Instagram
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
            {[
              '110mp0drTx6sJISMihQHh75dV6RnGNtV4',
              '1BElxhCE0C27iqRib3PfjgD4ur12rCHtV',
              '14rn3N9G1QKkU5Ij8O5D_JpnYQr6uKU0E',
              '1COlEk5fy9OhRgg9N-ZnCafKJZQ4Wpen9',
              '1vu8a1xXX_e04xSRjGdbzEzaSpa1dRLL6',
              '1nDtXPKJlkNrLuTUtQvksIZt1Lf8l4nz_',
              '18aR2HfzXlZiovN4Kqdmnot6tWRUMhnbW',
              '1EhyVW-mCOM1ZfSiM_0wQwvGIVE6RT4Mn',
              '1kzLjVFqJA81FHVB5YuCw2uTePoEcZrj7'
            ].map((id, i) => (
              <div key={i} className="aspect-square rounded-2xl overflow-hidden group relative cursor-pointer">
                <img 
                  src={getImageUrl(id)} 
                  alt={`Instagram Post ${i + 1}`} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Instagram className="text-white" size={32} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-40 bg-[#012D46] border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-6xl md:text-8xl font-medium tracking-tightest text-white mb-10 leading-[0.85]">
            Seu condomínio — <br /> <span className="text-white/30 italic font-serif">protegido e valorizado.</span>
          </h2>
          <a 
            href={WHATSAPP_LINK}
            className="group relative inline-flex bg-white text-[#012D46] px-16 py-6 rounded-full font-bold text-xl overflow-hidden transition-transform hover:scale-105 shadow-2xl"
          >
            <span className="relative z-10 flex items-center gap-3">
              Receber Consultoria Diagnóstica Gratuita
              <MessageCircle size={24} />
            </span>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-24 px-6 border-t border-white/5 bg-[#012D46] overflow-hidden">
        <div className="absolute bottom-[-5%] left-0 right-0 select-none pointer-events-none flex justify-center opacity-[0.03]">
          <h1 className="text-[18vw] font-bold text-white tracking-tighter leading-none uppercase">Becker</h1>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12 mb-24">
            <div>
              <h4 className="text-white font-medium mb-8 text-xs uppercase tracking-[0.2em] opacity-80">Empresa</h4>
              <ul className="space-y-5 text-sm text-slate-400 font-light">
                <li><button onClick={() => document.getElementById('inicio')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors">Sobre Nós</button></li>
                <li><button onClick={() => document.getElementById('qualidade')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors">Segurança</button></li>
                <li><button onClick={() => document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors">Contato</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-8 text-xs uppercase tracking-[0.2em] opacity-80">Serviços</h4>
              <ul className="space-y-5 text-sm text-slate-400 font-light">
                <li><button onClick={() => document.getElementById('servicos')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors">Reformas</button></li>
                <li><button onClick={() => document.getElementById('servicos')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors">Manutenção</button></li>
                <li><button onClick={() => document.getElementById('servicos')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors">Predial</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-8 text-xs uppercase tracking-[0.2em] opacity-80">Contato</h4>
              <ul className="space-y-5 text-sm text-slate-400 font-light">
                <li><a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">(47) 98908-5767</a></li>
                <li><a href="mailto:beckerluciano09@gmail.com" className="hover:text-white transition-colors">beckerluciano09@gmail.com</a></li>
                <li><button onClick={() => document.getElementById('localizacao')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors">Balneário Piçarras - SC</button></li>
              </ul>
            </div>
            <div className="flex flex-col items-end">
              <img 
                src={getImageUrl(LOGO_ID)} 
                alt="Becker Logo" 
                className="h-12 w-auto mb-8 brightness-0 invert opacity-50"
                referrerPolicy="no-referrer"
              />
              <p className="text-xs text-slate-500 text-right">© 2026 Becker Engenharia. <br /> Todos os direitos reservados. <br /> Site Desenvolvido por{' '}<a href="https://wa.me/5511996612056?text=Oi%20Daniel%20acabei%20de%20ver%20o%20Site%20da%20Becker%20e%20gostaria%20de%20fazer%20um%20or%C3%A7amento%20para%20o%20site%20da%20minha%20empresa" target="_blank" rel="noopener noreferrer" className="underline hover:text-white transition-colors">Daniel Yada</a></p>
            </div>
          </div>
        </div>
      </footer>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12"
          >
            <div className="absolute inset-0 bg-[#012D46]/95 backdrop-blur-xl" onClick={() => setSelectedProject(null)} />
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-5xl bg-white/[0.02] border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row h-full max-h-[80vh]"
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-8 right-8 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
              >
                <X size={24} />
              </button>

              <div className="w-full md:w-2/3 h-64 md:h-auto relative">
                <img 
                  src={getImageUrl(selectedProject.id)} 
                  alt={selectedProject.title} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              <div className="w-full md:w-1/3 p-12 flex flex-col justify-center">
                <span className="text-xs text-blue-400 font-mono mb-4 block tracking-widest uppercase">[{selectedProject.category}]</span>
                <h2 className="text-4xl font-medium text-white tracking-tight mb-8 leading-tight">{selectedProject.title}</h2>
                <p className="text-slate-400 leading-relaxed mb-10">
                  Projeto executado com excelência técnica em Balneário Piçarras. Foco total em acabamento premium e satisfação do cliente.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm text-white/80">
                    <CheckCircle2 className="text-blue-400" size={18} />
                    <span>Acabamento de Alto Padrão</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-white/80">
                    <CheckCircle2 className="text-blue-400" size={18} />
                    <span>Prazo Cumprido</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-white/80">
                    <CheckCircle2 className="text-blue-400" size={18} />
                    <span>Segurança Total</span>
                  </div>
                </div>
                <a 
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-12 inline-flex items-center gap-3 bg-white text-[#012D46] px-8 py-4 rounded-full font-bold text-sm hover:scale-105 transition-transform"
                >
                  Solicitar Orçamento Similar
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const FaqItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={cn(
      "border transition-all duration-500 rounded-3xl overflow-hidden",
      isOpen ? "border-blue-400/30 bg-white/[0.04] shadow-[0_0_50px_rgba(47,127,180,0.1)]" : "border-white/5 bg-white/[0.02] hover:bg-white/[0.04]"
    )}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-8 text-left focus:outline-none"
      >
        <span className={cn("text-xl transition-colors duration-300", isOpen ? "text-white" : "text-white/70")}>{question}</span>
        <div className={cn(
          "w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-500",
          isOpen ? "border-blue-400 bg-blue-400 text-[#012D46] rotate-180" : "border-white/10 text-blue-400"
        )}>
          <ChevronDown size={20} />
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-8 text-slate-400 leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ContactForm = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    
    const formData = new FormData(e.currentTarget);
    
    try {
      // Usando Object.fromEntries para converter FormData em JSON para a API Node.js
      const data = Object.fromEntries(formData.entries());
      
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (response.ok) {
        setStatus('success');
        (e.target as HTMLFormElement).reset();
        // Redireciona para a página de obrigado após 1.5 segundos para o usuário ver o feedback de sucesso
        setTimeout(() => {
          window.location.href = '/obrigado.html';
        }, 1500);
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-mono text-white/50 uppercase tracking-widest flex items-center gap-2">
            <User size={12} /> Nome Completo
          </label>
          <input 
            required
            name="name"
            type="text" 
            placeholder="Seu nome"
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-blue-400 transition-colors"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-mono text-white/50 uppercase tracking-widest flex items-center gap-2">
            <Mail size={12} /> E-mail
          </label>
          <input 
            required
            name="email"
            type="email" 
            placeholder="seu@email.com"
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-blue-400 transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-mono text-white/50 uppercase tracking-widest flex items-center gap-2">
            <Phone size={12} /> Telefone / WhatsApp
          </label>
          <input 
            required
            name="phone"
            type="tel" 
            placeholder="(47) 99999-9999"
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-blue-400 transition-colors"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-mono text-white/50 uppercase tracking-widest flex items-center gap-2">
            <Wrench size={12} /> Tipo de Serviço
          </label>
          <select 
            required
            name="service"
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-blue-400 transition-colors appearance-none"
          >
            <option value="" className="bg-[#012D46]">Selecione um serviço</option>
            <option value="Reforma Residencial" className="bg-[#012D46]">Reforma Residencial</option>
            <option value="Manutenção Predial" className="bg-[#012D46]">Manutenção Predial</option>
            <option value="Reparos em Geral" className="bg-[#012D46]">Reparos em Geral</option>
            <option value="Áreas de Lazer" className="bg-[#012D46]">Áreas de Lazer</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-mono text-white/50 uppercase tracking-widest flex items-center gap-2">
          <MapPin size={12} /> Localização da Obra
        </label>
        <input 
          required
          name="location"
          type="text" 
          placeholder="Bairro / Cidade"
          className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-blue-400 transition-colors"
        />
      </div>

      <div className="space-y-2">
        <label className="text-xs font-mono text-white/50 uppercase tracking-widest flex items-center gap-2">
          <FileText size={12} /> Mensagem / Detalhes do Projeto
        </label>
        <textarea 
          required
          name="message"
          rows={4}
          placeholder="Conte-nos um pouco sobre o que você precisa..."
          className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-blue-400 transition-colors resize-none"
        />
      </div>

      <button 
        disabled={status === 'loading'}
        className={cn(
          "w-full py-5 rounded-full font-bold text-lg transition-all flex items-center justify-center gap-3 shadow-xl",
          status === 'success' ? "bg-green-500 text-white" : "bg-white text-[#012D46] hover:scale-[1.02]"
        )}
      >
        {status === 'loading' ? (
          <div className="w-6 h-6 border-2 border-[#012D46] border-t-transparent rounded-full animate-spin" />
        ) : status === 'success' ? (
          <>Enviado com Sucesso! <CheckCircle2 size={24} /></>
        ) : status === 'error' ? (
          <>Erro ao enviar. Tente novamente.</>
        ) : (
          <><span>Receber Consultoria Diagnóstica Gratuita</span> <Send size={20} /></>
        )}
      </button>
    </form>
  );
};

const ProjectCard: React.FC<{ project: { id: string; title: string; category: string }; onClick: () => void }> = ({ project, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="group relative h-[400px] rounded-[2.5rem] overflow-hidden cursor-pointer border border-white/5"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <img 
        src={getImageUrl(project.id)} 
        alt={project.title} 
        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#012D46] via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
      
      <div className="absolute inset-0 p-8 flex flex-col justify-end">
        <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
          <span className="text-[10px] font-mono text-blue-400 uppercase tracking-[0.2em] mb-2 block">
            {project.category}
          </span>
          <h3 className="text-2xl text-white font-medium tracking-tight mb-4">
            {project.title}
          </h3>
          <div className="flex items-center gap-2 text-white/0 group-hover:text-white/100 transition-all duration-500">
            <span className="text-xs font-medium">Ver Detalhes</span>
            <Eye size={14} />
          </div>
        </div>
      </div>

      <div className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <Maximize2 size={18} className="text-white" />
      </div>
    </div>
  );
};
