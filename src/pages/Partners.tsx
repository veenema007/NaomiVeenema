import { Eye, Gift, TrendingUp, Heart, ArrowRight, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHeader from '@/components/PageHeader';
import { useLang } from '@/i18n/LanguageContext';
import { partners, naomiImages } from '@/data/content';
import Seo from '@/components/Seo';

export default function Partners() {
  const { lang, t } = useLang();

  const benefits = [
    { icon: Eye, title: t.partners.benefit1Title, text: t.partners.benefit1Text },
    { icon: Gift, title: t.partners.benefit2Title, text: t.partners.benefit2Text },
    { icon: TrendingUp, title: t.partners.benefit3Title, text: t.partners.benefit3Text },
    { icon: Heart, title: t.partners.benefit4Title, text: t.partners.benefit4Text },
  ];

  const tierStyles: Record<string, string> = {
    title: 'border-gold-500/40 bg-gradient-to-br from-gold-500/10 to-transparent',
    premium: 'border-burgundy-700/40 bg-gradient-to-br from-burgundy-900/20 to-transparent',
    partner: 'border-white/10 bg-racing-dark',
  };

  const tierLabels: Record<string, { nl: string; en: string }> = {
    title: { nl: 'Hoofdsponsor', en: 'Title Partner' },
    partner: { nl: 'Partner', en: 'Partner' },
  };

  const titlePartners = partners.filter((p) => p.tier === 'title');
  const premiumPartners = partners.filter((p) => p.tier === 'premium');
  const regularPartners = partners.filter((p) => p.tier === 'partner');

  const renderPartnerCard = (partner: typeof partners[0], i: number) => (
    <a
      key={partner.id}
      href={partner.website}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative border rounded-lg p-8 flex flex-col items-center justify-center text-center transition-all duration-300 hover:scale-105 animate-scale-in ${tierStyles[partner.tier]}`}
      style={{ animationDelay: `${i * 80}ms` }}
    >
      {partner.tier === 'title' && (
        <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-gold-500 text-racing-black text-xs font-display font-bold uppercase tracking-wider rounded">
          {tierLabels[partner.tier][lang === 'nl' ? 'nl' : 'en']}
        </span>
      )}
      <div className="w-24 h-16 flex items-center justify-center mb-4">
        <img
          src={partner.logo}
          alt={partner.name}
          className="max-h-14 max-w-full object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300"
        />
      </div>
      <h3 className="font-display font-semibold text-white text-sm uppercase tracking-wider group-hover:text-gold-500 transition-colors">
        {partner.name}
      </h3>
    </a>
  );

  return (
    <>
      <Seo
        title="Partners"
        description="Ontdek de partners en sponsoren die Naomi Veenema steunen op haar racereis. Word ook partner en maak deel uit van dit raceteam."
        path="/partners"
      />
      <PageHeader
        title={t.partners.title}
        subtitle={t.partners.subtitle}
        bgImage={naomiImages.drsZwolle}
      />

      {/* Intro */}
      <section className="section-pad">
        <div className="container-max">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12 bg-gold-500" />
              <span className="font-display text-gold-500 text-sm uppercase tracking-[0.3em]">Partnerships</span>
              <div className="h-px w-12 bg-gold-500" />
            </div>
            <p className="text-white/70 text-lg leading-relaxed">{t.partners.intro}</p>
          </div>
        </div>
      </section>

      {/* Title partner - large display */}
      {titlePartners.length > 0 && (
        <section className="pb-8">
          <div className="container-max px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-6">
              {titlePartners.map((partner, i) => (
                <a
                  key={partner.id}
                  href={partner.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative border rounded-xl p-10 md:p-14 flex flex-col items-center justify-center text-center transition-all duration-300 hover:scale-[1.02] animate-scale-in ${tierStyles[partner.tier]}`}
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gold-500 text-racing-black text-xs font-display font-bold uppercase tracking-wider rounded">
                    {tierLabels[partner.tier][lang === 'nl' ? 'nl' : 'en']}
                  </span>
                  <div className="h-28 md:h-36 w-full flex items-center justify-center mb-4">
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="max-h-28 md:max-h-36 max-w-full object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                  <h3 className="font-display font-bold text-white text-lg md:text-xl uppercase tracking-wider group-hover:text-gold-500 transition-colors">
                    {partner.name}
                  </h3>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Premium partners */}
      {premiumPartners.length > 0 && (
        <section className="pb-8">
          <div className="container-max px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {premiumPartners.map((p, i) => renderPartnerCard(p, i))}
            </div>
          </div>
        </section>
      )}

      {/* Regular partners */}
      {regularPartners.length > 0 && (
        <section className="pb-16">
          <div className="container-max px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {regularPartners.map((p, i) => renderPartnerCard(p, i))}
            </div>
          </div>
        </section>
      )}

      {/* Benefits */}
      <section className="bg-racing-dark border-y border-white/5 section-pad">
        <div className="container-max">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="h-px w-12 bg-gold-500" />
              <span className="font-display text-gold-500 text-sm uppercase tracking-[0.3em]">Sponsorship</span>
              <div className="h-px w-12 bg-gold-500" />
            </div>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-white uppercase">{t.partners.partnerBenefits}</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, i) => (
              <div
                key={i}
                className="bg-racing-black border border-white/5 rounded-lg p-8 hover:border-gold-500/40 transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-burgundy-800/30 rounded-lg flex items-center justify-center mb-6 group-hover:bg-burgundy-800/50 transition-colors">
                  <benefit.icon size={28} className="text-gold-500" />
                </div>
                <h3 className="font-display font-bold text-lg text-white uppercase mb-3">{benefit.title}</h3>
                <p className="text-white/60 leading-relaxed text-sm">{benefit.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad">
        <div className="container-max">
          <div className="relative bg-gradient-to-r from-burgundy-900/40 via-racing-dark to-racing-dark border border-gold-500/20 rounded-lg p-8 md:p-12 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/5 rounded-full blur-3xl" />
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h2 className="font-display font-bold text-2xl md:text-3xl text-white uppercase mb-3">
                  {t.partners.becomePartner}
                </h2>
                <p className="text-white/60 max-w-xl">{t.partners.ctaText}</p>
                <a
                  href="mailto:info@naomiveenema.nl"
                  className="mt-4 inline-flex items-center gap-2 text-gold-500 text-sm font-display uppercase tracking-wider hover:gap-3 transition-all"
                >
                  <Mail size={16} />
                  info@naomiveenema.nl
                </a>
              </div>
              <Link to="/contact" className="btn-gold group flex-shrink-0">
                {t.partners.becomePartner}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
