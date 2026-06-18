import { motion } from 'framer-motion';
import { FiCheck } from 'react-icons/fi';
import profilePhoto from '../assets/profile_photo.jpg';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: 'easeOut' as const },
});

const LEARNING = [
  'Advanced Python programming & data structures',
  'Full-stack web development (HTML, CSS, JavaScript)',
  'Database design and MySQL optimization',
  'UI/UX design principles and tools',
  'IoT systems and embedded automation',
  'Problem solving & algorithm design',
];

const TIMELINE = [
  { year: '2023–2024', title: 'Higher Secondary Education',      place: 'Christ the King School',         detail: 'Completed HSE with 86.5% — built strong analytical foundations.' },
  { year: '2024–2028', title: 'B.Tech Information Technology',   place: 'Sathyabama University, Chennai',  detail: 'Currently maintaining CGPA of 8.7, developing real-world software skills.' },
  { year: '2026',      title: 'Air Nexus — First Major Project', place: 'Deadlock Detection System',       detail: 'Built a Resource Allocation Graph system to solve airline booking deadlocks.' },
  { year: '2026',      title: 'Smart Sense — IoT Project',       place: 'NodeMCU & Blynk Automation',      detail: 'Automated classroom management using PIR, LDR, and DHT11 sensors.' },
];

export default function About() {
  return (
    <section id="about" className="py-24 bg-black dark:bg-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div {...fadeUp(0)} className="text-center mb-16">
          <p className="font-poppins text-xs text-gold tracking-widest uppercase font-medium mb-3">Who I Am</p>
          <h2 className="font-playfair font-bold text-4xl lg:text-5xl text-gray-900 dark:text-white">About Me</h2>
          <div className="mt-4 mx-auto w-16 h-0.5 bg-gold rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Visual Card */}
          <motion.div {...fadeUp(0.1)} className="max-w-md mx-auto lg:mx-0 w-full">
            <div className="rounded-3xl overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 aspect-square relative border border-gold/20 shadow-2xl p-5 flex flex-col items-center justify-between">
              {/* Image Container with spacing (Square aspect ratio matching the photo) */}
              <div className="w-[74%] aspect-square rounded-2xl overflow-hidden bg-gray-950/40 flex items-center justify-center border border-white/10 shadow-inner p-3">
                <img 
                  src={profilePhoto} 
                  alt="K. Sivadharshan" 
                  className="w-full h-full object-contain rounded-xl transition-transform duration-500 hover:scale-105" 
                />
              </div>
              {/* Text Information (No overlap) */}
              <div className="w-full flex flex-col justify-center items-center text-center mt-2">
                <h3 className="font-playfair font-bold text-xl text-white leading-tight mb-0.5">
                  K. Sivadharshan
                </h3>
                <p className="font-poppins text-xs text-gray-300 leading-normal">
                  B.Tech Information Technology
                </p>
                <p className="font-poppins text-[10px] text-gray-400 mt-1">
                  Sathyabama University · CGPA 8.7
                </p>
              </div>
            </div>
          </motion.div>

          {/* Bio */}
          <div className="space-y-8">
            <motion.div {...fadeUp(0.2)}>
              <p className="font-poppins text-base text-gray-600 dark:text-gray-400 leading-loose">
                I'm an enthusiastic and detail-oriented B.Tech Information Technology student at Sathyabama Institute of Science and Technology, Chennai, with a strong interest in software development, AI, and problem-solving.
              </p>
              <p className="font-poppins text-base text-gray-600 dark:text-gray-400 leading-loose mt-4">
                Skilled in Python, UI/UX and web technologies with hands-on experience in developing real-world academic projects. Passionate about learning emerging technologies and building impactful software solutions.
              </p>
            </motion.div>

            <motion.div {...fadeUp(0.3)}>
              <h3 className="font-playfair font-bold text-xl text-gray-900 dark:text-white mb-4">What I'm Learning</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {LEARNING.map((item, i) => (
                  <motion.div key={item} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.05 }} className="flex items-start gap-2.5">
                    <div className="mt-0.5 w-5 h-5 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center flex-shrink-0">
                      <FiCheck size={11} className="text-gold" />
                    </div>
                    <span className="font-poppins text-sm text-gray-600 dark:text-gray-400">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div {...fadeUp(0.4)}>
              <h3 className="font-playfair font-bold text-xl text-gray-900 dark:text-white mb-5">My Journey</h3>
              <div className="relative">
                <div className="absolute left-3 top-0 bottom-0 w-px bg-gradient-to-b from-gold via-gold/50 to-transparent" />
                <div className="space-y-6 pl-10">
                  {TIMELINE.map((item, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: -15 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 + i * 0.08 }} className="relative">
                      <div className="absolute -left-7 top-1 w-3 h-3 rounded-full bg-gold shadow-[0_0_8px_rgba(201,168,76,0.6)] border-2 border-white dark:border-dark-card" />
                      <span className="font-poppins text-xs text-gold font-semibold tracking-wide uppercase">{item.year}</span>
                      <h4 className="font-playfair font-semibold text-base text-gray-900 dark:text-white mt-0.5">{item.title}</h4>
                      <p className="font-poppins text-xs text-gray-500 font-medium">{item.place}</p>
                      <p className="font-poppins text-sm text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">{item.detail}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
