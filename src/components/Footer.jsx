import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Mail, Instagram, Facebook, Github, Heart } from 'lucide-react';

const FOOTER_LINKS = {
  Product: [
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'FAQ', href: '#faq' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/privacypolicy' },
  ],
  Connect: [
    { label: 'bybsupport@budgetyourbudget.com', href: 'mailto:bybsupport@budgetyourbudget.com' },
  ],
};

const SOCIALS = [
  {
    icon: Instagram,
    href: 'https://www.instagram.com/budgetyourbudget/',
    label: 'Instagram',
  },
  {
    icon: Facebook,
    href: 'https://www.facebook.com/profile.php?id=61580548407756',
    label: 'Facebook',
  },
  {
    icon: Github,
    href: 'https://github.com/edupr90',
    label: 'GitHub',
  },
];

export default function Footer() {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  const handleClick = (href, e) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      if (!isHome) {
        navigate('/' + href);
        return;
      }
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-slate-900 dark:bg-slate-950 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">B</span>
              </div>
              <span className="font-bold text-lg text-white">Budget Your Budget</span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              A friendly daily budgeting app that helps you track spending, plan monthly expenses,
              and stay on top of your goals.
            </p>
            {/* Social Icons */}
            <div className="flex gap-3 mt-6">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-all"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Link Groups */}
          {Object.entries(FOOTER_LINKS).map(([group, links]) => (
            <div key={group}>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                {group}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith('/') ? (
                      <Link
                        to={link.href}
                        className="text-slate-400 hover:text-white text-sm transition-colors"
                      >
                        {link.label}
                      </Link>
                    ) : link.href.startsWith('mailto:') || link.href.startsWith('http') ? (
                      <a
                        href={link.href}
                        target={link.href.startsWith('http') ? '_blank' : undefined}
                        rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="text-slate-400 hover:text-white text-sm transition-colors flex items-center gap-2"
                      >
                        {link.href.startsWith('mailto:') && <Mail size={14} />}
                        {link.label}
                      </a>
                    ) : (
                      <a
                        href={link.href}
                        onClick={(e) => handleClick(link.href, e)}
                        className="text-slate-400 hover:text-white text-sm transition-colors cursor-pointer"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Store buttons */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href="https://apps.apple.com/us/app/id6472663180"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 22C7.79 22.05 6.8 20.68 5.96 19.47C4.25 16.56 2.93 11.3 4.7 7.72C5.57 5.94 7.36 4.86 9.28 4.84C10.56 4.81 11.78 5.72 12.57 5.72C13.36 5.72 14.85 4.62 16.4 4.8C17.04 4.83 18.82 5.07 19.97 6.71C19.88 6.77 17.66 8.09 17.69 10.82C17.72 14.13 20.52 15.21 20.56 15.22C20.53 15.31 20.1 16.86 19.04 18.46L18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
              </svg>
              App Store
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.evelez.byb"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.18 23.73C2.76 23.56 2.44 23.24 2.26 22.82C2.16 22.53 2.12 22.24 2.12 21.94V2.06C2.12 1.56 2.3 1.14 2.68 0.79L13.21 11.33L3.18 23.73ZM16.8 15.36L6.14 21.53L14.89 12.76L16.8 15.36ZM21.54 10.5C22 10.84 22.25 11.3 22.25 11.88C22.25 12.47 21.96 12.95 21.39 13.32L19.03 14.63L16.95 12.03L19.09 9.3L21.54 10.5ZM6.14 2.47L16.8 8.64L14.89 11.24L6.14 2.47Z" />
              </svg>
              Google Play
            </a>
          </div>

          <p className="text-slate-500 text-sm flex items-center gap-1">
            Made with <Heart size={14} className="text-red-400" /> &copy; {new Date().getFullYear()} Budget Your Budget
          </p>
        </div>
      </div>
    </footer>
  );
}
