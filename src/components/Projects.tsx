import { motion } from 'framer-motion';
import { FiArrowUpRight, FiGithub } from 'react-icons/fi';
import { MdOutlineAirplaneTicket, MdSensors } from 'react-icons/md';

const PROJECTS = [
  {
    title: 'Air Nexus',
    subtitle: 'Airline Booking Deadlock Detection',
    description: 'A system that detects and resolves deadlocks in airline booking using Resource Allocation Graph (RAG) algorithms. Ensures safe resource allocation and prevents booking conflicts through cycle detection in the dependency graph.',
    tags: ['Python','Graph Algorithms','MySQL','Data Structures'],
    gradient: 'from-blue-900 via-blue-800 to-purple-900',
    accent: '#818CF8',
    Icon: MdOutlineAirplaneTicket,
    href: '#', github: '#',
    features: ['Circular wait detection using RAG','Safe state verification (Banker\'s algorithm)','Real-time deadlock resolution'],
  },
  {
    title: 'Smart Classroom',
    subtitle: 'Automation System (Smart Sense)',
    description: 'An IoT classroom automation system using NodeMCU and Blynk that intelligently manages lighting and resources. Automated lighting and fan control using PIR, LDR, and DHT11 sensors for real-time smart classroom management.',
    tags: ['Python','IoT','NodeMCU','Blynk','MySQL'],
    gradient: 'from-emerald-900 via-teal-800 to-cyan-900',
    accent: '#34D399',
    Icon: MdSensors,
    href: '#', github: '#',
    features: ['PIR motion detection for occupancy','LDR-based automatic lighting','DHT11 temperature & humidity monitoring'],
  },
];

function ProjectCard({ project, index }: { project: typeof PROJECTS[0]; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      whileHover={{ y: -8, transition: { duration: 0.25 } }}
      className="group bg-white dark:bg-dark-card rounded-3xl overflow-hidden border border-gray-100 dark:border-dark-border hover:border-gold/40 transition-all duration-300 shadow-sm hover:shadow-2xl">
      <div className={`relative h-60 bg-gradient-to-br ${project.gradient} overflow-hidden`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <project.Icon size={100} style={{ color: project.accent, opacity: 0.2 }}
            className="group-hover:scale-110 group-hover:opacity-30 transition-all duration-500" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
          {project.tags.map(tag => (
            <span key={tag} className="px-2.5 py-0.5 rounded-full text-xs font-poppins font-medium backdrop-blur-sm border"
              style={{ background: `${project.accent}20`, borderColor: `${project.accent}40`, color: project.accent }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div>
            <h3 className="font-playfair font-bold text-2xl text-gray-900 dark:text-white">{project.title}</h3>
            <p className="font-poppins text-xs font-medium mt-0.5" style={{ color: project.accent }}>{project.subtitle}</p>
          </div>
          <a href={project.github} aria-label="GitHub"
            className="p-2 rounded-full border border-gray-200 dark:border-dark-border text-gray-500 dark:text-gray-400 hover:border-gold hover:text-gold transition-all duration-200">
            <FiGithub size={16} />
          </a>
        </div>
        <p className="font-poppins text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-5">{project.description}</p>
        <ul className="space-y-2 mb-6">
          {project.features.map(f => (
            <li key={f} className="flex items-center gap-2.5 font-poppins text-xs text-gray-500">
              <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: project.accent }} />
              {f}
            </li>
          ))}
        </ul>
        <a href={project.href}
          className="inline-flex items-center gap-2 font-poppins font-semibold text-sm text-gray-900 dark:text-white hover:text-gold dark:hover:text-gold transition-colors group/link">
          View Project <FiArrowUpRight size={16} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
        </a>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-24 bg-black dark:bg-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.6 }} className="text-center mb-16">
          <p className="font-poppins text-xs text-gold tracking-widest uppercase font-medium mb-3">Portfolio</p>
          <h2 className="font-playfair font-bold text-4xl lg:text-5xl text-gray-900 dark:text-white">My Projects</h2>
          <p className="mt-4 font-poppins text-base text-gray-500 dark:text-gray-400">Things I've Built</p>
          <div className="mt-4 mx-auto w-16 h-0.5 bg-gold rounded-full" />
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {PROJECTS.map((p, i) => <ProjectCard key={p.title} project={p} index={i} />)}
        </div>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
          className="text-center mt-12 font-poppins text-sm text-gray-400 dark:text-gray-600">
          More projects coming soon — currently in development.
        </motion.p>
      </div>
    </section>
  );
}
