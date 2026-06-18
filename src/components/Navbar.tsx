import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';
import { useActiveSection } from '../hooks/useActiveSection';

const NAV_LINKS = [
  { label: 'Home',     href: '#home' },
  { label: 'About',    href: '#about' },
  { label: 'Skills',   href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact',  href: '#contact' },
];

const SECTION_IDS = ['home','about','skills','projects','contact'];

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const activeSection = useActiveSection(SECTION_IDS);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const go = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'backdrop-blur-md bg-white/80 dark:bg-dark-bg/80 border-b border-gray-200/50 dark:border-dark-border/50 shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="w-10 h-1" /> {/* Spacer replacing KS brand */}

          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(link => {
              const active = activeSection === link.href.slice(1);
              return (
                <button key={link.href} onClick={() => go(link.href)}
                  className={`relative font-poppins text-sm font-medium transition-colors ${
                    active ? 'text-gold' : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                  }`}>
                  {link.label}
                  {active && (
                    <motion.span layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gold rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3">

            <button onClick={() => setMenuOpen(v => !v)} aria-label="Toggle menu"
              className="md:hidden p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-card transition-colors">
              <AnimatePresence mode="wait" initial={false}>
                {menuOpen
                  ? <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}><FiX size={22} /></motion.span>
                  : <motion.span key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}><FiMenu size={22} /></motion.span>
                }
              </AnimatePresence>
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-white dark:bg-dark-bg flex flex-col items-center justify-center md:hidden">
            <nav className="flex flex-col items-center gap-8">
              {NAV_LINKS.map((link, i) => (
                <motion.button key={link.href} onClick={() => go(link.href)}
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                  className={`font-playfair text-3xl font-bold transition-colors ${
                    activeSection === link.href.slice(1) ? 'text-gold' : 'text-gray-800 dark:text-white hover:text-gold'
                  }`}>
                  {link.label}
                </motion.button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
