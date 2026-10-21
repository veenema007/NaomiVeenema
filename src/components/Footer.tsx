import { Link } from 'react-router-dom';
import { Instagram, Youtube, Facebook, Mail, MapPin, Send } from 'lucide-react';
import { useLang } from '@/i18n/LanguageContext';

export default function Footer() {
  const { t } = useLang();
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

  return (
    <footer className="bg-racing-darker border-t border-white/10">
      <div className="container-max px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-4 group">
              <span className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#D3AE36] bg-black p-2 shadow-lg transition-transform duration-300 group-hover:scale-105">
                <img
                  src="/images/logo/ndv-logo.png"
                  alt="NDV Racing"
                  className="h-full w-full scale-110 object-contain"
                />
              </span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-6">{t.footer.tagline}</p>
            <div className="flex gap-3">
              {[
                { Icon: Instagram, href: 'https://www.instagram.com/naomiveenema/' },
                { Icon: Youtube, href: 'https://youtube.com/@naomiveenema' },
                { Icon: Facebook, href: 'https://www.facebook.com/profile.php?id=100076864294541' }
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center border border-white/10 rounded text-white/60 hover:text-gold-500 hover:border-gold-500/50 transition-all duration-300"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-display font-semibold text-white uppercase tracking-wider text-sm mb-4 racing-line pb-2">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2">
              {links.slice(0, 5).map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-white/60 hover:text-gold-500 text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More links */}
          <div>
            <h4 className="font-display font-semibold text-white uppercase tracking-wider text-sm mb-4 racing-line pb-2">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2">
              {links.slice(5).map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-white/60 hover:text-gold-500 text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-display font-semibold text-white uppercase tracking-wider text-sm mb-4 racing-line pb-2">
              {t.footer.newsletter}
            </h4>
            <p className="text-white/60 text-sm mb-4">{t.footer.newsletterText}</p>
            <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
              <input
                type="email"
                placeholder={t.footer.emailPlaceholder}
                className="flex-1 bg-racing-black border border-white/10 rounded px-3 py-2.5 text-white text-sm placeholder:text-white/30 focus:border-gold-500/50 focus:outline-none transition-colors"
              />
              <button type="submit" className="px-4 py-2.5 bg-burgundy-800 hover:bg-burgundy-700 text-white rounded transition-colors">
                <Send size={16} />
              </button>
            </form>
            <div className="mt-6 flex items-center gap-3 text-white/40 text-sm">
              <Mail size={16} className="text-gold-500" />
              <span>info@naomiveenema.nl</span>
            </div>
            <div className="mt-2 flex items-center gap-3 text-white/40 text-sm">
              <MapPin size={16} className="text-gold-500" />
              <span>Nederland</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-xs">
            © {new Date().getFullYear()} Naomi Veenema. {t.footer.rights}
          </p>
          <p className="text-white/40 text-xs font-display uppercase tracking-wider">{t.footer.madeWith}</p>
        </div>
      </div>
    </footer>
  );
}
