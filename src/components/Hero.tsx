import { API_BASE_URL } from '../config';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiArrowRight } from 'react-icons/fi';
import profilePhoto from '../assets/profile_photo.jpg';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

const STATS = [
  { value: '5+',   label: 'Projects Completed' },
  { value: '3+',   label: 'Technologies Learned' },
  { value: '8.7',  label: 'CGPA at Sathyabama' },
  { value: '✓',   label: 'Open to Opportunities' },
];

const SOCIALS = [
  { icon: FiGithub,   href: 'https://github.com/sivadharshan',              label: 'GitHub' },
  { icon: FiLinkedin, href: 'https://www.linkedin.com/in/skdharshan',        label: 'LinkedIn' },
  { icon: FiMail,     href: 'mailto:sivadharshangiri222@gmail.com',           label: 'Email' },
];

export default function Hero() {
  const [profile, setProfile] = useState({
    name: 'K. Sivadharshan',
    designation: 'B.Tech IT Student',
    cgpa: '8.7',
    bio: 'Passionate about building modern web applications, AI solutions and innovative projects.'
  });

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/profile`)
      .then(res => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(data => {
        if (data && data.name) {
          setProfile({
            name: data.name,
            designation: data.designation,
            cgpa: data.cgpa || '8.7',
            bio: data.bio
          });
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section id="home" className="min-h-screen pt-16 flex items-center bg-black dark:bg-black relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">

          {/* Left */}
          <div className="lg:col-span-1 space-y-6">
            <motion.p {...fadeUp} transition={{ duration: 0.5, delay: 0.1 }}
              className="font-poppins text-sm font-medium text-gray-500 dark:text-gray-400 tracking-widest uppercase">
              Hello, I'm
            </motion.p>

            <motion.h1 {...fadeUp} transition={{ duration: 0.6, delay: 0.2 }}
              className="font-playfair font-bold text-5xl lg:text-6xl xl:text-7xl leading-none text-gray-900 dark:text-white break-words">
              {profile.name}
            </motion.h1>

            <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center gap-2 font-poppins text-sm font-medium">
              <span className="flex items-center gap-2">
                <span className="text-gray-700 dark:text-gray-300">{profile.designation}</span>
              </span>
            </motion.div>

            <motion.p {...fadeUp} transition={{ duration: 0.5, delay: 0.4 }}
              className="font-poppins text-base text-gray-600 dark:text-gray-400 leading-relaxed max-w-sm">
              {profile.bio}
            </motion.p>

            <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.5 }} className="flex flex-wrap gap-3">
              <button onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-poppins font-medium text-sm hover:bg-gold dark:hover:bg-gold dark:hover:text-white transition-all duration-300">
                View My Work <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>

            <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.6 }} className="flex items-center gap-4">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} aria-label={label} target="_blank" rel="noopener noreferrer"
                  className="p-2.5 rounded-full border border-gray-200 dark:border-dark-border text-gray-600 dark:text-gray-400 hover:border-gold hover:text-gold transition-all duration-300 hover:scale-110">
                  <Icon size={18} />
                </a>
              ))}
            </motion.div>
          </div>

          {/* Center */}
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:col-span-1 flex flex-col items-center gap-4">
            <div className="relative">
              <div className="w-72 h-72 lg:w-80 lg:h-80 rounded-3xl overflow-hidden border-2 border-gray-100 dark:border-dark-border shadow-2xl relative bg-gray-800 flex items-center justify-center">
                <img src={profilePhoto} alt="K. Sivadharshan" className="w-full h-full object-cover" />
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm p-4 text-center border-t border-white/10">
                  <p className="font-poppins text-white text-sm font-semibold tracking-wide">{profile.name}</p>
                  <p className="font-poppins text-gray-300 text-xs mt-0.5">{profile.designation}</p>
                </div>
              </div>
              <div className="absolute -inset-3 rounded-3xl border border-gold/20 pointer-events-none" />
            </div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
              className="flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-gray-50 dark:bg-dark-card border border-gray-200 dark:border-dark-border shadow-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="font-poppins text-sm font-medium text-gray-700 dark:text-gray-300">Open to Opportunities</span>
            </motion.div>
          </motion.div>

          {/* Right — Stats */}
          <div className="lg:col-span-1 grid grid-cols-2 lg:grid-cols-1 gap-4">
            {STATS.map((stat, i) => (
              <motion.div key={stat.label}
                initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                className="rounded-2xl p-5 bg-gray-50 dark:bg-dark-card border border-gray-100 dark:border-dark-border hover:border-gold/50 transition-colors duration-300">
                <p className="font-playfair font-bold text-3xl text-gold">{stat.label.includes('CGPA') ? profile.cgpa || stat.value : stat.value}</p>
                <p className="font-poppins text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="font-poppins text-xs text-gray-400 dark:text-gray-600 tracking-widest uppercase">Scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-px h-8 bg-gradient-to-b from-gray-400 to-transparent dark:from-gray-600" />
      </motion.div>
    </section>
  );
}
