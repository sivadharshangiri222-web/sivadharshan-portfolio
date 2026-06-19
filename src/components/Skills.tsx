import { API_BASE_URL } from '../config';
import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { SiPython } from 'react-icons/si';
import { MdDesignServices } from 'react-icons/md';
import { FiCode, FiCpu, FiTerminal, FiCheckCircle } from 'react-icons/fi';

// Mapping of icon strings to components
const ICON_MAP: Record<string, any> = {
  FiCpu,
  FiTerminal,
  FiCode,
  FiCheckCircle,
  SiPython,
  MdDesignServices
};

const STATIC_SKILLS = [
  { name: 'Logical thinking',    icon: 'FiCpu',             color: '#3B82F6', bg: 'from-blue-500/20 to-blue-600/10',       desc: 'Analytical reasoning & structured planning', level: 90 },
  { name: 'Software debugging',  icon: 'FiTerminal',        color: '#EF4444', bg: 'from-red-500/20 to-red-600/10',         desc: 'Identifying, tracing & resolving code errors', level: 85 },
  { name: 'Computer programming',icon: 'FiCode',            color: '#10B981', bg: 'from-emerald-500/20 to-emerald-600/10', desc: 'Writing clean, structured & maintainable code', level: 88 },
  { name: 'Problem Solving',     icon: 'FiCheckCircle',     color: '#8B5CF6', bg: 'from-purple-500/20 to-purple-600/10',   desc: 'Designing effective algorithmic solutions', level: 92 },
  { name: 'Python',              icon: 'SiPython',          color: '#3776AB', bg: 'from-blue-500/20 to-blue-600/10',       desc: 'Scripting, data structures & graph automation', level: 80 },
  { name: 'UI/UX',               icon: 'MdDesignServices',  color: '#C9A84C', bg: 'from-gold/20 to-gold/10',               desc: 'User-centered layouts & responsive interfaces', level: 78 },
  { name: 'Problem Solving',     icon: 'FiCheckCircle',     color: '#EC4899', bg: 'from-pink-500/20 to-pink-600/10',       desc: 'Logical analysis & structural debugging', level: 92 },
];

const getSkillDetails = (name: string, iconStr: string) => {
  const normalized = name.toLowerCase();
  const staticMatch = STATIC_SKILLS.find(s => s.name.toLowerCase() === normalized);
  if (staticMatch) {
    return {
      desc: staticMatch.desc,
      color: staticMatch.color,
      bg: staticMatch.bg,
      icon: ICON_MAP[iconStr] || ICON_MAP[staticMatch.icon] || FiCode
    };
  }
  return {
    desc: 'Professional capability & technical proficiency',
    color: '#C9A84C',
    bg: 'from-gold/20 to-gold/10',
    icon: ICON_MAP[iconStr] || FiCode
  };
};

function SkillCard({ skill, index }: { skill: any; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const Icon = skill.icon;

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="group relative bg-white dark:bg-dark-card rounded-2xl p-6 border border-gray-100 dark:border-dark-border hover:border-gold/60 transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-gold/10">
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${skill.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
      <div className="relative z-10">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
          style={{ background: `${skill.color}20`, border: `1px solid ${skill.color}30` }}>
          <Icon size={24} style={{ color: skill.color }} />
        </div>
        <h3 className="font-playfair font-bold text-lg text-gray-900 dark:text-white mb-1">{skill.name}</h3>
        <p className="font-poppins text-xs text-gray-500 mb-4">{skill.desc}</p>
        <div className="h-1.5 bg-gray-100 dark:bg-dark-border rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
            transition={{ duration: 1, delay: index * 0.07 + 0.3 }}
            className="h-full rounded-full"
            style={{ background: `linear-gradient(90deg, ${skill.color}, ${skill.color}aa)` }} />
        </div>
        <div className="mt-1.5 flex justify-between">
          <span className="font-poppins text-xs text-gray-400">Proficiency</span>
          <span className="font-poppins text-xs font-semibold" style={{ color: skill.color }}>{skill.level}%</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const [skills, setSkills] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/skills`)
      .then(res => {
        if (!res.ok) throw new Error('API failed');
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          const mapped = data.map((s: any) => {
            const details = getSkillDetails(s.name, s.icon);
            return {
              name: s.name,
              level: s.level,
              ...details
            };
          });
          setSkills(mapped);
        } else {
          setSkills(STATIC_SKILLS.map(s => ({ ...s, icon: ICON_MAP[s.icon] || FiCode })));
        }
      })
      .catch(() => {
        setSkills(STATIC_SKILLS.map(s => ({ ...s, icon: ICON_MAP[s.icon] || FiCode })));
      });
  }, []);

  return (
    <section id="skills" className="py-24 bg-black dark:bg-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.6 }} className="text-center mb-16">
          <p className="font-poppins text-xs text-gold tracking-widest uppercase font-medium mb-3">Expertise</p>
          <h2 className="font-playfair font-bold text-4xl lg:text-5xl text-gray-900 dark:text-white">My Skills</h2>
          <p className="mt-4 font-poppins text-base text-gray-500 dark:text-gray-400">Technologies & Tools I Work With</p>
          <div className="mt-4 mx-auto w-16 h-0.5 bg-gold rounded-full" />
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((s, i) => <SkillCard key={`${s.name}-${i}`} skill={s} index={i} />)}
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 flex flex-wrap gap-3 justify-center">
          {['Logical Thinking','Software Debugging','Problem Solving','English (Fluent)','Tamil','IoT & Embedded Systems'].map(tag => (
            <span key={tag} className="px-4 py-2 rounded-full border border-gray-200 dark:border-dark-border font-poppins text-sm text-gray-600 dark:text-gray-400 hover:border-gold hover:text-gold transition-colors duration-200">{tag}</span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
