import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Mail, Instagram, Facebook, Github, Heart } from 'lucide-react';

const FOOTER_LINKS = {
  Product: [
    { label: 'Features', href: '#features' },
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
    <footer className="bg-surface-950 border-t border-surface-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-5">
              <img
                src="/screenshots/byblogo.png"
                alt="BYB Logo"
                className="w-9 h-9 rounded-xl"
              />
              <span className="font-display font-bold text-lg text-white tracking-tight">Budget Your Budget</span>
            </Link>
            <p className="text-surface-400 text-sm leading-relaxed max-w-xs">
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
                  className="w-10 h-10 rounded-xl bg-surface-800/60 hover:bg-surface-700 flex items-center justify-center text-surface-400 hover:text-white transition-all duration-200"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Link Groups */}
          {Object.entries(FOOTER_LINKS).map(([group, links]) => (
            <div key={group}>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-5">
                {group}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith('/') ? (
                      <Link
                        to={link.href}
                        className="text-surface-400 hover:text-white text-sm transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    ) : link.href.startsWith('mailto:') || link.href.startsWith('http') ? (
                      <a
                        href={link.href}
                        target={link.href.startsWith('http') ? '_blank' : undefined}
                        rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="text-surface-400 hover:text-white text-sm transition-colors duration-200 flex items-center gap-2"
                      >
                        {link.href.startsWith('mailto:') && <Mail size={14} />}
                        {link.label}
                      </a>
                    ) : (
                      <a
                        href={link.href}
                        onClick={(e) => handleClick(link.href, e)}
                        className="text-surface-400 hover:text-white text-sm transition-colors duration-200 cursor-pointer"
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
        <div className="mt-14 pt-8 border-t border-surface-800/50 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href="https://apps.apple.com/us/app/id6472663180"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block hover:scale-[1.03] active:scale-[0.97] transition-transform duration-200"
            >
              <img
                src="/screenshots/appstore.png"
                alt="Download on the App Store"
                className="h-10 w-auto"
              />
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.evelez.byb"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block hover:scale-[1.03] active:scale-[0.97] transition-transform duration-200"
            >
              <img
                src="/screenshots/playstore.png"
                alt="Get it on Google Play"
                className="h-10 w-auto"
              />
            </a>
          </div>

          <p className="text-surface-500 text-sm flex items-center gap-1.5">
            Made with <Heart size={14} className="text-rose-400" /> &copy; {new Date().getFullYear()} Budget Your Budget
          </p>
        </div>
      </div>
    </footer>
  );
}
