import { useState } from 'react';
import { Mail, MapPin, Send, CheckCircle, AlertCircle, Instagram, Youtube, Facebook, Clock } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import { useLang } from '@/i18n/LanguageContext';
import { supabase } from '@/lib/supabase';
import { naomiImages } from '@/data/content';
import Seo from '@/components/Seo';

export default function Contact() {
  const { lang, t } = useLang();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const { error } = await supabase.from('contact_messages').insert({
        name: form.name,
        email: form.email,
        subject: form.subject,
        message: form.message,
        lang,
      });
      if (error) throw error;
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const socials = [
    { Icon: Instagram, label: 'Instagram', href: 'https://instagram.com' },
    { Icon: Youtube, label: 'YouTube', href: 'https://youtube.com' },
    { Icon: Facebook, label: 'Facebook', href: 'https://facebook.com' },
  ];

  return (
    <>
      <Seo
        title="Contact"
        description="Neem contact op met Naomi Veenema voor samenwerkingen, sponsorship, media-aanvragen of algemene vragen. Reactie binnen 24-48 uur."
        path="/contact"
      />
      <PageHeader
        title={t.contact.title}
        subtitle={t.contact.subtitle}
        bgImage={naomiImages.action1}
      />

      <section className="section-pad">
        <div className="container-max">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact info sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-racing-dark border border-white/5 rounded-lg p-6">
                <h3 className="font-display font-bold text-white uppercase tracking-wider text-sm mb-6 racing-line pb-2">
                  {t.contact.info}
                </h3>
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-burgundy-800/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail size={18} className="text-gold-500" />
                    </div>
                    <div>
                      <div className="text-white/40 text-xs font-display uppercase tracking-wider mb-1">{t.contact.emailLabel}</div>
                      <a href="mailto:info@naomiveenema.nl" className="text-white hover:text-gold-500 transition-colors text-sm">
                        info@naomiveenema.nl
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-burgundy-800/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin size={18} className="text-gold-500" />
                    </div>
                    <div>
                      <div className="text-white/40 text-xs font-display uppercase tracking-wider mb-1">{t.contact.location}</div>
                      <div className="text-white text-sm">{t.contact.locationValue}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-burgundy-800/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock size={18} className="text-gold-500" />
                    </div>
                    <div>
                      <div className="text-white/40 text-xs font-display uppercase tracking-wider mb-1">
                        {lang === 'nl' ? 'Reactietijd' : 'Response time'}
                      </div>
                      <div className="text-white text-sm">24-48h</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social */}
              <div className="bg-racing-dark border border-white/5 rounded-lg p-6">
                <h3 className="font-display font-bold text-white uppercase tracking-wider text-sm mb-4 racing-line pb-2">
                  {t.contact.followTitle}
                </h3>
                <div className="flex gap-3">
                  {socials.map((social, i) => (
                    <a
                      key={i}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 flex items-center justify-center border border-white/10 rounded-lg text-white/60 hover:text-gold-500 hover:border-gold-500/50 transition-all duration-300"
                      aria-label={social.label}
                    >
                      <social.Icon size={20} />
                    </a>
                  ))}
                </div>
              </div>

              {/* Press */}
              <div className="bg-gradient-to-br from-burgundy-900/30 to-racing-dark border border-gold-500/20 rounded-lg p-6">
                <h3 className="font-display font-bold text-gold-500 uppercase tracking-wider text-sm mb-3">
                  {t.contact.pressTitle}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">{t.contact.pressText}</p>
                <a href="mailto:info@naomiveenema.nl" className="mt-3 inline-flex items-center gap-2 text-gold-500 text-sm font-display uppercase tracking-wider hover:gap-3 transition-all">
                  info@naomiveenema.nl
                  <Send size={14} />
                </a>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="bg-racing-dark border border-white/5 rounded-lg p-8">
                <div className="grid sm:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-white/60 text-xs font-display uppercase tracking-wider mb-2">
                      {t.contact.name} *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder={t.contact.namePlaceholder}
                      className="w-full bg-racing-black border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:border-gold-500/50 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-white/60 text-xs font-display uppercase tracking-wider mb-2">
                      {t.contact.email} *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder={t.contact.emailPlaceholder}
                      className="w-full bg-racing-black border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:border-gold-500/50 focus:outline-none transition-colors"
                    />
                  </div>
                </div>
                <div className="mb-6">
                  <label className="block text-white/60 text-xs font-display uppercase tracking-wider mb-2">
                    {t.contact.subject} *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    required
                    value={form.subject}
                    onChange={handleChange}
                    placeholder={t.contact.subjectPlaceholder}
                    className="w-full bg-racing-black border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:border-gold-500/50 focus:outline-none transition-colors"
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-white/60 text-xs font-display uppercase tracking-wider mb-2">
                    {t.contact.message} *
                  </label>
                  <textarea
                    name="message"
                    required
                    value={form.message}
                    onChange={handleChange}
                    placeholder={t.contact.messagePlaceholder}
                    rows={6}
                    className="w-full bg-racing-black border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:border-gold-500/50 focus:outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="btn-gold w-full sm:w-auto group disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === 'sending' ? (
                    <>{t.contact.sending}</>
                  ) : (
                    <>
                      {t.contact.send}
                      <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>

                {status === 'success' && (
                  <div className="mt-6 flex items-center gap-3 p-4 bg-green-600/10 border border-green-600/30 rounded-lg animate-fade-in">
                    <CheckCircle size={20} className="text-green-500 flex-shrink-0" />
                    <p className="text-green-400 text-sm">{t.contact.success}</p>
                  </div>
                )}
                {status === 'error' && (
                  <div className="mt-6 flex items-center gap-3 p-4 bg-red-600/10 border border-red-600/30 rounded-lg animate-fade-in">
                    <AlertCircle size={20} className="text-red-500 flex-shrink-0" />
                    <p className="text-red-400 text-sm">{t.contact.error}</p>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
