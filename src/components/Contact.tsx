import { useState, useRef, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { FiMail, FiGithub, FiLinkedin, FiSend, FiCheck, FiAlertCircle } from 'react-icons/fi';

// Replace with your actual EmailJS credentials
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';

const CONTACT_CARDS = [
  { icon: FiMail,     label: 'Email',    value: 'sivadharshangiri222@gmail.com',    href: 'mailto:sivadharshangiri222@gmail.com', color: '#C9A84C' },
  { icon: FiLinkedin, label: 'LinkedIn', value: 'linkedin.com/in/skdharshan',        href: 'https://www.linkedin.com/in/skdharshan', color: '#0A66C2' },
  { icon: FiGithub,   label: 'GitHub',   value: 'github.com/sivadharshan',           href: 'https://github.com/sivadharshan',        color: '#6E40C9' },
];

type Status = 'idle' | 'sending' | 'success' | 'error';

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    setStatus('sending');
    try {
      await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formRef.current, EMAILJS_PUBLIC_KEY);
      setStatus('success');
      formRef.current.reset();
      setTimeout(() => setStatus('idle'), 5000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section id="contact" className="py-24 bg-white dark:bg-dark-bg">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.6 }} className="text-center mb-16">
          <p className="font-poppins text-xs text-gold tracking-widest uppercase font-medium mb-3">Get In Touch</p>
          <h2 className="font-playfair font-bold text-4xl lg:text-5xl text-gray-900 dark:text-white">Let's Connect</h2>
          <p className="mt-4 font-poppins text-base text-gray-500 dark:text-gray-400 max-w-md mx-auto">Open to collaborations, internships, and learning opportunities</p>
          <div className="mt-4 mx-auto w-16 h-0.5 bg-gold rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Info */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.6 }} className="space-y-5">
            <div className="mb-8">
              <h3 className="font-playfair font-bold text-2xl text-gray-900 dark:text-white mb-3">Contact Information</h3>
              <p className="font-poppins text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                Whether you have a project in mind, want to collaborate, or just want to say hello — I'd love to hear from you. Based in Chennai, India.
              </p>
            </div>
            {CONTACT_CARDS.map(({ icon: Icon, label, value, href, color }, i) => (
              <motion.a key={label} href={href} target={label !== 'Email' ? '_blank' : undefined} rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ x: 4, transition: { duration: 0.2 } }}
                className="flex items-center gap-4 p-4 rounded-2xl border border-gray-100 dark:border-dark-border hover:border-gold/50 bg-gray-50 dark:bg-dark-card transition-all duration-300 group">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200"
                  style={{ background: `${color}18`, border: `1px solid ${color}30` }}>
                  <Icon size={20} style={{ color }} />
                </div>
                <div className="min-w-0">
                  <p className="font-poppins text-xs text-gray-400 font-medium uppercase tracking-wide">{label}</p>
                  <p className="font-poppins text-sm text-gray-800 dark:text-gray-200 font-medium truncate mt-0.5">{value}</p>
                </div>
              </motion.a>
            ))}
            <div className="pt-4 border-t border-gray-100 dark:border-dark-border">
              <p className="font-poppins text-xs text-gray-400 dark:text-gray-600">Location: Chennai, Tamil Nadu, India</p>
              <p className="font-poppins text-xs text-gray-400 dark:text-gray-600 mt-1">Phone: +91 9342132906</p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-gray-50 dark:bg-dark-card rounded-3xl p-8 border border-gray-100 dark:border-dark-border">
            <h3 className="font-playfair font-bold text-2xl text-gray-900 dark:text-white mb-6">Send a Message</h3>
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-poppins text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wide">Name</label>
                  <input type="text" name="from_name" required placeholder="Your name"
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-dark-bg border border-gray-200 dark:border-dark-border font-poppins text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:border-gold transition-colors" />
                </div>
                <div>
                  <label className="block font-poppins text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wide">Email</label>
                  <input type="email" name="from_email" required placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-dark-bg border border-gray-200 dark:border-dark-border font-poppins text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:border-gold transition-colors" />
                </div>
              </div>
              <div>
                <label className="block font-poppins text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wide">Subject</label>
                <input type="text" name="subject" required placeholder="What's this about?"
                  className="w-full px-4 py-3 rounded-xl bg-white dark:bg-dark-bg border border-gray-200 dark:border-dark-border font-poppins text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:border-gold transition-colors" />
              </div>
              <div>
                <label className="block font-poppins text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wide">Message</label>
                <textarea name="message" required rows={5} placeholder="Tell me about your project or idea..."
                  className="w-full px-4 py-3 rounded-xl bg-white dark:bg-dark-bg border border-gray-200 dark:border-dark-border font-poppins text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:border-gold transition-colors resize-none" />
              </div>

              {status === 'success' && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800">
                  <FiCheck size={16} className="text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                  <p className="font-poppins text-sm text-emerald-700 dark:text-emerald-400">Message sent! I'll get back to you soon.</p>
                </motion.div>
              )}
              {status === 'error' && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                  <FiAlertCircle size={16} className="text-red-600 dark:text-red-400 flex-shrink-0" />
                  <p className="font-poppins text-sm text-red-700 dark:text-red-400">Something went wrong. Please email me directly.</p>
                </motion.div>
              )}

              <button type="submit" disabled={status === 'sending'}
                className="w-full flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-poppins font-semibold text-sm hover:bg-gold dark:hover:bg-gold dark:hover:text-white disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300">
                {status === 'sending' ? (
                  <><svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>Sending...</>
                ) : (
                  <><FiSend size={15} />Send Message</>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
