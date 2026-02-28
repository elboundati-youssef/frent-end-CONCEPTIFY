import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform, useInView, animate } from 'motion/react';
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { 
  Building2, 
  Sparkles, 
  GraduationCap, 
  HeartPulse, 
  Instagram, 
  Globe, 
  Image as ImageIcon,
  ArrowRight,
  ArrowLeft,
  ArrowUpRight,
  ArrowDown,
  Menu,
  X
} from 'lucide-react';

export const projectsData = [
  { 
    id: 1, client: "Emaar Properties", category: "REAL ESTATE", img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800", height: "h-[400px]",
    gallery: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1600607687931-cecebd802404?auto=format&fit=crop&q=80&w=1200' },
      { type: 'video', url: 'https://www.w3schools.com/html/mov_bbb.mp4' }
    ]
  },
  { 
    id: 2, client: "Atlas Santé", category: "SANTÉ ET BIEN-ÊTRE", img: "https://images.unsplash.com/photo-1538108149393-ce90bb2424ad?auto=format&fit=crop&q=80&w=800", height: "h-[300px]",
    gallery: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1538108149393-ce90bb2424ad?auto=format&fit=crop&q=80&w=1200' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1200' }
    ]
  },
  { 
    id: 3, client: "Lycée Descartes", category: "GROUPES SCOLAIRES", img: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800", height: "h-[500px]",
    gallery: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1200' },
      { type: 'video', url: 'https://www.w3schools.com/html/mov_bbb.mp4' }
    ]
  },
  { 
    id: 4, client: "Morocco Mall", category: "PROJETS SPÉCIAUX", img: "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?auto=format&fit=crop&q=80&w=800", height: "h-[350px]",
    gallery: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1519999482648-25049ddd37b1?auto=format&fit=crop&q=80&w=1200' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1200' }
    ]
  },
  { 
    id: 5, client: "Royal Mansour", category: "REAL ESTATE", img: "https://images.unsplash.com/photo-1542314831-c6a4d14d837e?auto=format&fit=crop&q=80&w=800", height: "h-[450px]",
    gallery: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1542314831-c6a4d14d837e?auto=format&fit=crop&q=80&w=1200' },
      { type: 'video', url: 'https://www.w3schools.com/html/mov_bbb.mp4' }
    ]
  },
  { 
    id: 6, client: "Tech Hub", category: "PROJETS SPÉCIAUX", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800", height: "h-[300px]",
    gallery: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1200' }
    ]
  },
];

const PageTransition = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const Magnetic = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { name: 'Accueil', href: isHome ? '#' : '/' },
    { name: 'Qui sommes-nous', href: isHome ? '#about' : '/#about' },
    { name: 'Expertises', href: isHome ? '#expertises' : '/#expertises' },
    { name: 'Portfolio', href: isHome ? '#portfolio' : '/#portfolio' },
    { name: 'Contact', href: isHome ? '#contact' : '/#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-bg/80 backdrop-blur-lg border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="text-2xl font-display font-bold tracking-tighter">
          CONCEPTIFY.
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a key={link.name} href={link.href} className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
              {link.name}
            </a>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-surface border-b border-white/5 overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              {links.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="text-lg font-medium text-gray-300 hover:text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const ScrollIndicator = () => {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <motion.div 
      style={{ opacity }}
      className="absolute bottom-10 right-10 md:bottom-16 md:right-16 z-50 hidden md:flex items-center justify-center pointer-events-none"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
        className="relative w-32 h-32 flex items-center justify-center"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
          <defs>
            <path
              id="circlePath"
              d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
            />
          </defs>
          <text className="text-[10.5px] font-bold uppercase tracking-[0.18em] fill-white">
            <textPath href="#circlePath" startOffset="0%">
              Conceptify • Agence de créativité • Conceptify • Agence de créativité • 
            </textPath>
          </text>
        </svg>
      </motion.div>
      <div className="absolute flex items-center justify-center w-12 h-12 rounded-full border border-white/20 bg-black/50 backdrop-blur-sm">
        <ArrowDown className="w-5 h-5 text-[#0dcaf0]" />
      </div>
    </motion.div>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background gradient/video placeholder */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(111,66,193,0.15),_rgba(5,5,5,1)_60%)]" />
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[120px] mix-blend-screen animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#0dcaf0]/20 rounded-full blur-[120px] mix-blend-screen animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6"
        >
          Chez CONCEPTIFY,<br />
          nous créons <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6f42c1] to-[#0dcaf0]">l'exception.</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg md:text-2xl text-gray-400 max-w-3xl mx-auto mb-12 font-light"
        >
          Bien plus qu'une agence, nous réinventons la connexion entre les marques et leur public.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <Magnetic className="relative group inline-block">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#6f42c1] to-[#0dcaf0] rounded-full blur opacity-25 group-hover:opacity-100 transition duration-500 group-hover:duration-200" />
            <a href="#portfolio" className="relative inline-flex items-center justify-center px-8 py-4 font-medium text-white transition-all duration-300 bg-surface rounded-full hover:bg-surface-hover border border-white/10 hover:border-white/20 overflow-hidden">
              <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-150%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(150%)]">
                <div className="relative h-full w-8 bg-white/20" />
              </div>
              <span className="relative flex items-center gap-2">
                Découvrir nos projets
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </a>
          </Magnetic>
        </motion.div>
      </div>
      
      <ScrollIndicator />
    </section>
  );
};

const About = () => {
  return (
    <section className="py-32 relative z-10 bg-surface" id="about">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              L'art de la<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6f42c1] to-[#0dcaf0]">connexion.</span>
            </h2>
            <p className="text-lg text-gray-400 mb-8 leading-relaxed">
              Basée au Maroc depuis 2018, CONCEPTIFY est une agence créative indépendante qui repousse les limites de la communication traditionnelle. Nous concevons des stratégies sur-mesure et des expériences mémorables pour des marques ambitieuses. Notre ADN : Créativité, Innovation et Expertise.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-square rounded-full overflow-hidden border border-white/10 relative">
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1000" 
                alt="Notre équipe" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-accent/10 mix-blend-overlay" />
            </div>
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#0dcaf0]/20 rounded-full blur-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Expertise = () => {
  const categories = [
    { 
      title: "Real Estate", 
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200",
      desc: "Valorisation de biens et promotion immobilière d'exception. Nous créons des expériences visuelles immersives et des stratégies de marque pour l'immobilier haut de gamme.",
      className: "md:col-span-2 md:row-span-2"
    },
    { 
      title: "Projets Spéciaux", 
      image: "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?auto=format&fit=crop&q=80&w=1200",
      desc: "Campagnes sur-mesure et concepts événementiels inédits.",
      className: "md:col-span-2 md:row-span-1"
    },
    { 
      title: "Groupes Scolaires", 
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1200",
      desc: "Communication éducative ciblée et stratégies d'attractivité.",
      className: "md:col-span-1 md:row-span-1"
    },
    { 
      title: "Santé et Bien-être", 
      image: "https://images.unsplash.com/photo-1538108149393-ce90bb2424ad?auto=format&fit=crop&q=80&w=1200",
      desc: "Marketing médical, image de marque et communication patient.",
      className: "md:col-span-1 md:row-span-1"
    }
  ];

  return (
    <section className="py-32 relative z-10 bg-[#050505] overflow-hidden" id="expertises">
      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-20">
          <p className="text-sm text-gray-400 uppercase tracking-widest mb-4">NOS SECTEURS</p>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 text-white">Domaines d'Intervention</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[300px]">
          {categories.map((cat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className={`group relative rounded-3xl overflow-hidden cursor-pointer ${cat.className}`}
            >
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                <img 
                  src={cat.image} 
                  alt={cat.title} 
                  className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
              
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-0 group-hover:mb-3 transition-all duration-500 ease-out">
                  {cat.title}
                </h3>
                <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-out">
                  <div className="overflow-hidden">
                    <p className="text-gray-300 text-base leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out delay-100">
                      {cat.desc}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('Tous');
  const navigate = useNavigate();

  const categories = ['Tous', 'PROJETS SPÉCIAUX', 'REAL ESTATE', 'GROUPES SCOLAIRES', 'SANTÉ ET BIEN-ÊTRE'];

  const filteredProjects = activeFilter === 'Tous' 
    ? projectsData 
    : projectsData.filter(p => p.category === activeFilter);

  return (
    <section className="py-32 relative z-10 bg-bg" id="portfolio">
      <div className="container mx-auto px-6">
        <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">Nos Références</h2>
            <div className="w-20 h-1 bg-accent" />
          </div>
          <button className="flex items-center gap-2 text-sm font-medium hover:text-accent transition-colors">
            Voir tout le portfolio <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-12">
          {categories.map((cat) => (
            <Magnetic key={cat} className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#6f42c1] to-[#0dcaf0] rounded-full blur opacity-0 group-hover:opacity-50 transition duration-500" />
              <button
                onClick={() => setActiveFilter(cat)}
                className={`relative px-6 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 border ${
                  activeFilter === cat 
                    ? 'bg-white text-black border-white' 
                    : 'bg-surface text-gray-400 border-white/10 hover:border-white/30 hover:text-white'
                }`}
              >
                {cat}
              </button>
            </Magnetic>
          ))}
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className={`relative rounded-3xl overflow-hidden group break-inside-avoid mb-6 ${project.height}`}
              >
              <img 
                src={project.img} 
                alt={project.client} 
                className="w-full h-full object-cover scale-100 group-hover:scale-[1.05] transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 opacity-60 group-hover:opacity-90 transition-opacity duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)]" />
              
              <div className="absolute inset-0 p-8 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <span className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-sm font-medium border border-white/20 text-white">
                    {project.client}
                  </span>
                </div>
                
                <div className="flex gap-4">
                  <button className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 hover:bg-[#6f42c1] hover:border-[#6f42c1] transition-all duration-500 ease-out text-white translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 group-hover:delay-[100ms]">
                    <Instagram className="w-5 h-5" />
                  </button>
                  <button className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 hover:bg-[#0dcaf0] hover:border-[#0dcaf0] transition-all duration-500 ease-out text-white translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 group-hover:delay-[150ms]">
                    <Globe className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => navigate(`/reference/${project.id}`)}
                    className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 hover:bg-gradient-to-r hover:from-[#6f42c1] hover:to-[#0dcaf0] hover:border-transparent transition-all duration-500 ease-out text-white translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 group-hover:delay-[200ms]"
                  >
                    <ImageIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="relative bg-surface pt-32 pb-10 border-t border-white/5" id="contact">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-32">
          <div>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
              Prêt à créer<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6f42c1] to-[#0dcaf0]">l'exception ?</span>
            </h2>
            <p className="text-xl text-gray-400 mb-12 max-w-md">
              Discutons de votre prochain projet et voyons comment nous pouvons vous aider à atteindre vos objectifs.
            </p>
            
            <div className="space-y-8">
              <div>
                <p className="text-sm text-gray-500 uppercase tracking-wider mb-2">Appelez-nous</p>
                <a href="tel:+212654179010" className="text-3xl font-display font-medium hover:text-accent transition-colors">
                  +212 654 17 90 10
                </a>
              </div>
              <div>
                <p className="text-sm text-gray-500 uppercase tracking-wider mb-2">Écrivez-nous</p>
                <a href="mailto:hello@conceptify.ma" className="text-3xl font-display font-medium hover:text-accent transition-colors">
                  hello@conceptify.ma
                </a>
              </div>
            </div>
          </div>

          <div className="bg-bg p-8 md:p-12 rounded-3xl border border-white/5 shadow-2xl">
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Nom complet</label>
                <input 
                  type="text" 
                  className="w-full bg-surface border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-accent transition-colors"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                <input 
                  type="email" 
                  className="w-full bg-surface border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-accent transition-colors"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                <textarea 
                  rows={4}
                  className="w-full bg-surface border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-accent transition-colors resize-none"
                  placeholder="Parlez-nous de votre projet..."
                />
              </div>
              <button className="w-full bg-white text-black font-semibold py-4 rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 group">
                Envoyer le message
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-white/10">
          <div className="text-2xl font-display font-bold tracking-tighter mb-4 md:mb-0">
            CONCEPTIFY.
          </div>
          <div className="flex gap-6 text-gray-400">
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-white transition-colors">Behance</a>
          </div>
          <div className="text-sm text-gray-600 mt-4 md:mt-0">
            © {new Date().getFullYear()} Conceptify. Tous droits réservés.
          </div>
        </div>
      </div>
    </footer>
  );
};

const AnimatedCounter = ({ from, to, duration = 2, isK = false }: { from: number, to: number, duration?: number, isK?: boolean }) => {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (inView && nodeRef.current) {
      const controls = animate(from, to, {
        duration,
        ease: "easeOut",
        onUpdate(value) {
          if (nodeRef.current) {
            let val = Math.round(value);
            if (isK && val === to) {
              nodeRef.current.textContent = (val / 1000).toString() + "K";
            } else {
              nodeRef.current.textContent = val.toString();
            }
          }
        },
      });
      return () => controls.stop();
    }
  }, [from, to, duration, inView, isK]);

  return <span ref={nodeRef}>{from}</span>;
};

const DomainesExpertise = () => {
  const [activeService, setActiveService] = useState(0);

  const services = [
    {
      title: "Marketing & Communication",
      desc: "Nous créons des stratégies marketing puissantes et des campagnes de communication engageantes qui positionnent votre marque au centre de l'attention.",
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1200"
    },
    {
      title: "Événementiel",
      desc: "Nous concevons des expériences immersives et uniques, adaptées à chaque marque et chaque occasion. Que vous organisiez un lancement de produit ou une conférence internationale.",
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=1200"
    },
    {
      title: "Accompagnement Professionnel",
      desc: "Nous proposons des programmes d'accompagnement, du coaching, de la formation et du conseil pour développer vos talents, structurer votre croissance et atteindre l'excellence.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200"
    }
  ];

  const stats = [
    { num: 6, label: "Années d'expérience", isK: false },
    { num: 45, label: "Clients uniques", isK: false },
    { num: 1000, label: "Projets terminés", isK: true }
  ];

  return (
    <div className="bg-[#050505] relative z-10">
      <section id="domaines-expertise" className="min-h-screen relative container mx-auto px-6 py-24 flex flex-col lg:flex-row">
        {/* Colonne Gauche (Navigation Interactive) */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center gap-12 lg:pr-12 z-10">
          <div className="mb-8">
            <p className="text-sm text-gray-400 uppercase tracking-widest mb-4">NOS SERVICES</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Domaines d'Expertise</h2>
          </div>
          
          <div className="flex flex-col gap-8">
            {services.map((service, index) => (
              <div 
                key={index}
                className="group cursor-pointer"
                onMouseEnter={() => setActiveService(index)}
              >
                {/* Desktop View */}
                <h3 
                  className={`hidden lg:block text-5xl xl:text-7xl font-black uppercase tracking-tighter transition-all duration-500
                    ${activeService === index 
                      ? 'text-transparent bg-clip-text bg-gradient-to-r from-[#6f42c1] to-[#0dcaf0]' 
                      : 'text-transparent'}`}
                  style={activeService !== index ? { WebkitTextStroke: '1px rgba(255,255,255,0.2)' } : {}}
                >
                  {service.title}
                </h3>

                {/* Mobile View (Accordion style) */}
                <div className="lg:hidden">
                  <h3 
                    className={`text-4xl font-black uppercase tracking-tighter transition-all duration-500 mb-4
                      ${activeService === index 
                        ? 'text-transparent bg-clip-text bg-gradient-to-r from-[#6f42c1] to-[#0dcaf0]' 
                        : 'text-transparent'}`}
                    style={activeService !== index ? { WebkitTextStroke: '1px rgba(255,255,255,0.2)' } : {}}
                    onClick={() => setActiveService(index)}
                  >
                    {service.title}
                  </h3>
                  <AnimatePresence>
                    {activeService === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="relative aspect-video rounded-2xl overflow-hidden mb-4 mt-4">
                          <img src={service.image} alt={service.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          <div className="absolute inset-0 bg-black/40" />
                        </div>
                        <p className="text-gray-300 mb-6 text-lg">{service.desc}</p>
                        <button className="px-6 py-3 rounded-full border border-[#0dcaf0] text-white text-sm font-bold uppercase tracking-wider hover:bg-[#0dcaf0] hover:text-black transition-colors mb-8">
                          Explorer
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Colonne Droite (Contenu Dynamique & Collant) - Hidden on Mobile */}
        <div className="hidden lg:block w-full lg:w-1/2 relative">
          <div className="sticky top-32 h-[70vh] w-full rounded-3xl overflow-hidden bg-[#111]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                <img 
                  src={services[activeService].image} 
                  alt={services[activeService].title} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                
                {/* Overlay & Content */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-12">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    <p className="text-2xl text-white font-light leading-relaxed mb-8 max-w-lg backdrop-blur-sm bg-black/20 p-6 rounded-2xl border border-white/10">
                      {services[activeService].desc}
                    </p>
                    
                    <Magnetic>
                      <button className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-300 bg-black/50 backdrop-blur-md rounded-full border border-[#0dcaf0] hover:bg-[#0dcaf0] hover:text-black overflow-hidden">
                        <span className="relative z-10 flex items-center gap-2 uppercase tracking-wider text-sm">
                          Explorer
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </button>
                    </Magnetic>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Bandeau Statistiques Animé */}
      <section className="border-y border-white/10 bg-[#0a0a0a] py-16 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#6f42c1]/5 to-[#0dcaf0]/5" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12 divide-y md:divide-y-0 md:divide-x divide-white/10">
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="flex flex-col items-center justify-center flex-1 pt-8 md:pt-0 w-full"
              >
                <div className="text-6xl md:text-7xl font-black tracking-tighter flex items-baseline text-transparent bg-clip-text bg-gradient-to-r from-[#6f42c1] to-[#0dcaf0]">
                  <AnimatedCounter from={0} to={stat.num} isK={stat.isK} />
                  <span className="text-[#0dcaf0]">+</span>
                </div>
                <p className="text-xs text-gray-400 font-light uppercase tracking-[0.3em] mt-4 text-center">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const InfiniteMarquee = () => {
  const items = [
    "Service fiable",
    "Solutions personnalisées",
    "Disponibilité 24/7",
    "Conseils d'experts",
    "Approche innovante",
    "Stratégies sur mesure"
  ];

  const MarqueeContent = ({ outline = false }: { outline?: boolean }) => (
    <div className="flex items-center gap-12 px-6">
      {items.map((item, idx) => (
        <React.Fragment key={idx}>
          <span 
            className={`text-6xl md:text-8xl font-black uppercase tracking-tighter ${outline ? 'text-transparent' : 'text-white'}`} 
            style={outline ? { WebkitTextStroke: '2px #0dcaf0' } : {}}
          >
            {item}
          </span>
          <span className={`text-5xl ${outline ? 'text-[#0dcaf0]' : 'text-[#6f42c1]'}`}>✦</span>
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <section className="py-10 bg-[#111] overflow-hidden border-y-4 border-[#6f42c1] relative z-20 flex flex-col gap-6 transform -skew-y-3 my-24 shadow-[0_0_50px_rgba(111,66,193,0.2)]">
      {/* Ligne 1 : vers la gauche */}
      <div className="flex whitespace-nowrap relative">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 35 }}
        >
          <MarqueeContent />
          <MarqueeContent />
          <MarqueeContent />
          <MarqueeContent />
        </motion.div>
      </div>

      {/* Ligne 2 : vers la droite */}
      <div className="flex whitespace-nowrap relative">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: ["-50%", "0%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 35 }}
        >
          <MarqueeContent outline />
          <MarqueeContent outline />
          <MarqueeContent outline />
          <MarqueeContent outline />
        </motion.div>
      </div>
    </section>
  );
};

const LogoMarquee = () => {
  const logos = [
    { name: "EMAAR", icon: Building2 },
    { name: "ATLAS", icon: HeartPulse },
    { name: "DESCARTES", icon: GraduationCap },
    { name: "MALL", icon: Globe },
    { name: "MANSOUR", icon: Sparkles },
    { name: "STUDIO", icon: ImageIcon },
  ];

  const LogoItem = ({ logo }: { logo: any }) => (
    <div className="flex items-center justify-center gap-4 px-16 py-12 border-r border-gray-800 min-w-[350px] opacity-60 hover:opacity-100 transition-opacity duration-300">
      <logo.icon className="w-8 h-8 text-white" />
      <span className="text-3xl font-display font-bold text-white tracking-wider uppercase">{logo.name}</span>
    </div>
  );

  return (
    <section className="py-32 bg-black relative z-10">
      <div className="relative flex overflow-hidden w-full border-y border-gray-800">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
        >
          {/* First set */}
          <div className="flex items-center">
            {logos.map((logo, idx) => (
              <LogoItem key={`logo-1-${idx}`} logo={logo} />
            ))}
          </div>
          {/* Second set for infinite loop */}
          <div className="flex items-center">
            {logos.map((logo, idx) => (
              <LogoItem key={`logo-2-${idx}`} logo={logo} />
            ))}
          </div>
        </motion.div>
      </div>

      <div className="mt-20 flex justify-center">
        <a href="#portfolio" className="px-10 py-4 rounded-full border border-white text-white text-xs font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-colors duration-300">
          Voir plus
        </a>
      </div>
    </section>
  );
};

const Home = () => {
  return (
    <PageTransition>
      <Hero />
      <InfiniteMarquee />
      <About />
      <DomainesExpertise />
      <Expertise />
      <LogoMarquee />
      <Portfolio />
    </PageTransition>
  );
};

const ReferenceDetail = () => {
  const { id } = useParams();
  const project = projectsData.find(p => p.id === Number(id));
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-3xl font-bold">Projet introuvable</h1>
      </div>
    );
  }

  return (
    <PageTransition className="pt-32 pb-20 min-h-screen container mx-auto px-6">
      <Link to="/#portfolio" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-12 transition-colors group">
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Retour au portfolio
      </Link>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 font-display tracking-tight">
            {project.client}
          </h1>
          <div className="flex items-center gap-4">
            <span className="px-5 py-2.5 rounded-full bg-white/5 backdrop-blur-md text-sm font-medium border border-white/10 text-white">
              {project.category}
            </span>
            <div className="flex gap-2">
              <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="w-11 h-11 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent border border-white/10 transition-colors">
                <Instagram className="w-4 h-4" />
              </motion.button>
              <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="w-11 h-11 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent border border-white/10 transition-colors">
                <Globe className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        {project.gallery?.map((item: any, i: number) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: (i % 3) * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="break-inside-avoid relative group rounded-2xl overflow-hidden cursor-pointer bg-white/5 border border-white/10"
            onClick={() => item.type === 'image' && setSelectedImage(item.url)}
          >
            {item.type === 'image' ? (
              <>
                <img src={item.url} alt={`${project.client} ${i}`} className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
              </>
            ) : (
              <video src={item.url} controls className="w-full h-auto object-cover" />
            )}
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 md:p-12 cursor-zoom-out"
          >
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              src={selectedImage}
              alt="En plein écran"
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              referrerPolicy="no-referrer"
            />
            <button 
              onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
              className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransition>
  );
};

const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    mass: 0.1,
    stiffness: 100,
    damping: 20,
    restDelta: 0.001
  });

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#6f42c1] to-[#0dcaf0] origin-left z-[100]"
        style={{ scaleX: smoothProgress }}
      />
      {children}
    </>
  );
};

const NoiseOverlay = () => (
  <div 
    className="fixed inset-0 z-50 pointer-events-none opacity-[0.04] mix-blend-overlay"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
    }}
  />
);

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/reference/:id" element={<ReferenceDetail />} />
      </Routes>
    </AnimatePresence>
  );
};

export default function App() {
  return (
    <Router>
      <NoiseOverlay />
      <SmoothScroll>
        <div className="min-h-screen bg-bg text-white selection:bg-accent selection:text-white font-sans">
          <Navbar />
          <AnimatedRoutes />
          <Footer />
        </div>
      </SmoothScroll>
    </Router>
  );
}
