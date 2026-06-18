import { FiGithub, FiLinkedin, FiMail, FiArrowUp } from 'react-icons/fi';

const SOCIALS = [
  { icon: FiGithub,   href: 'https://github.com/sivadharshan',           label: 'GitHub' },
  { icon: FiLinkedin, href: 'https://www.linkedin.com/in/skdharshan',     label: 'LinkedIn' },
  { icon: FiMail,     href: 'mailto:sivadharshangiri222@gmail.com',        label: 'Email' },
];

export default function Footer() {
  return (
    <footer className="bg-black dark:bg-black border-t border-gray-100 dark:border-dark-border py-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
        <div className="flex flex-col items-center sm:items-start gap-1">
          <span className="font-playfair font-bold text-xl text-gray-900 dark:text-white">K. Sivadharshan</span>
          <p className="font-poppins text-xs text-gray-400 dark:text-gray-600 font-medium">
            B.Tech IT Student
          </p>
        </div>

        <div className="flex items-center gap-4">
          {SOCIALS.map(({ icon: Icon, href, label }) => (
            <a key={label} href={href} aria-label={label} target="_blank" rel="noopener noreferrer"
              className="p-2 rounded-full border border-gray-200 dark:border-dark-border text-gray-500 dark:text-gray-400 hover:border-gold hover:text-gold transition-all duration-200">
              <Icon size={16} />
            </a>
          ))}
        </div>

        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Scroll to top"
          className="p-2.5 rounded-full border border-gray-200 dark:border-dark-border text-gray-500 dark:text-gray-400 hover:border-gold hover:text-gold transition-all duration-200">
          <FiArrowUp size={16} />
        </button>
      </div>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mt-6 pt-6 border-t border-gray-100 dark:border-dark-border/50 text-center">
        <p className="font-poppins text-[10px] text-gray-400 dark:text-gray-500">
          &copy; {new Date().getFullYear()} K. Sivadharshan. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
