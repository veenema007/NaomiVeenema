import { Link, NavLink, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';
import { useLang } from '@/i18n/LanguageContext';

export default function Navbar() {
  const { lang, setLang, t } = useLang();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const location = useLocation();

  const links = [
    { to: '/', label: t.nav.home },
    { to: '/over-mij', label: t.nav.about },
    { to: '/agenda', label: t.nav.agenda },
    { to: '/partners', label: t.nav.partners },
    { to: '/nieuws', label: t.nav.news },
    { to: '/fotogalerij', label: t.nav.gallery },
    { to: '/merchandise', label: t.nav.merch },
    { to: '/contact', label: t.nav.contact },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const isHome = location.pathname === '/';

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || !isHome
            ? 'glass-dark border-b border-white/10'
            : 'bg-gradient-to-b from-black/70 to-transparent'
        }`}
      >
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <span className="flex h-40 w-40 translate-y-2 items-center justify-center rounded-full border-[3px] border-[#D3AE36] bg-black p-5 shadow-lg transition-transform duration-300 group-hover:scale-105">
                <img
                  src="/images/logo/ndv-logo.png"
                  alt="NDV Racing"
                  className="h-full w-full scale-[1.2] object-contain"
                />
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `px-3 py-2 font-display font-medium text-sm uppercase tracking-wider transition-all duration-200 ${
                      isActive
                        ? 'text-gold-500'
                        : 'text-white/80 hover:text-white'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            {/* Right side - language + mobile toggle */}
            <div className="flex items-center gap-3">
              {/* Language switcher */}
              <div className="relative">
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  className="flex items-center gap-1.5 px-3 py-2 text-white/80 hover:text-gold-500 transition-colors font-display text-sm uppercase tracking-wider"
                >
                  <Globe size={18} />
                  <span className="hidden sm:inline">{lang.toUpperCase()}</span>
                  <ChevronDown size={14} className={`transition-transform ${langOpen ? 'rotate-180' : ''}`} />
                </button>
                {langOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setLangOpen(false)} />
                    <div className="absolute right-0 top-full mt-2 z-50 bg-racing-dark border border-white/10 rounded-md overflow-hidden min-w-[120px]">
                      <button
                        onClick={() => { setLang('nl'); setLangOpen(false); }}
                        className={`w-full px-4 py-2.5 text-left font-display text-sm uppercase tracking-wider transition-colors ${
                          lang === 'nl' ? 'text-gold-500 bg-white/5' : 'text-white/70 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        Nederlands
                      </button>
                      <button
                        onClick={() => { setLang('en'); setLangOpen(false); }}
                        className={`w-full px-4 py-2.5 text-left font-display text-sm uppercase tracking-wider transition-colors ${
                          lang === 'en' ? 'text-gold-500 bg-white/5' : 'text-white/70 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        English
                      </button>
                    </div>
                  </>
                )}
              </div>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden text-white p-2 hover:text-gold-500 transition-colors"
                aria-label="Menu"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="absolute inset-0 bg-racing-black/95 backdrop-blur-md" onClick={() => setIsOpen(false)} />
        <nav className="absolute right-0 top-0 bottom-0 w-72 bg-racing-dark border-l border-white/10 flex flex-col pt-24 pb-8 px-6 overflow-y-auto">
          {links.map((link, i) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `py-3 font-display font-medium text-lg uppercase tracking-wider border-b border-white/5 transition-all duration-200 ${
                  isActive ? 'text-gold-500' : 'text-white/80 hover:text-white'
                }`
              }
              style={{ animationDelay: `${i * 50}ms` }}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </>
  );
}
