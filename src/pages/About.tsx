import { Target, Eye, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHeader from '@/components/PageHeader';
import { useLang } from '@/i18n/LanguageContext';
import { careerHistory, naomiImages } from '@/data/content';

export default function About() {
  const { lang, t } = useLang();

  const traits = [
    { icon: Target, title: t.about.trait1Title, text: t.about.trait1Text },
    { icon: Eye, title: t.about.trait2Title, text: t.about.trait2Text },
    { icon: Users, title: t.about.trait3Title, text: t.about.trait3Text },
  ];

  const stats = [
    { value: '90', label: t.home.statsRaces },
    { value: '13', label: t.home.statsWins },
    { value: '24', label: t.home.statsPodiums },
    { value: '2', label: t.home.statsSeasons },
  ];

  return (
    <>
      <PageHeader
        title={t.about.title}
        subtitle={t.about.subtitle}
        bgImage={naomiImages.action2}
      />

      {/* Intro */}
      <section className="section-pad">
        <div className="container-max">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="rounded-lg overflow-hidden">
                <img
                  src={naomiImages.portraitRace}
                  alt="Naomi Veenema"
                  className="w-full h-[560px] object-cover object-[center_20%]"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 border-2 border-gold-500/30 rounded-lg -z-10" />
            </div>
            <div className="order-1 lg:order-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-12 bg-gold-500" />
                <span className="font-display text-gold-500 text-sm uppercase tracking-[0.3em]">{t.about.subtitle}</span>
              </div>
              <p className="text-white/80 text-xl leading-relaxed mb-6">{t.about.intro}</p>
              <div className="space-y-6">
                <div>
                  <h3 className="font-display font-bold text-lg text-gold-500 uppercase mb-2">{t.about.bio1Title}</h3>
                  <p className="text-white/60 leading-relaxed">{t.about.bio1Text}</p>
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-gold-500 uppercase mb-2">{t.about.bio2Title}</h3>
                  <p className="text-white/60 leading-relaxed">{t.about.bio2Text}</p>
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-gold-500 uppercase mb-2">{t.about.bio3Title}</h3>
                  <p className="text-white/60 leading-relaxed">{t.about.bio3Text}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-racing-dark border-y border-white/5 section-pad">
        <div className="container-max">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white uppercase text-center mb-12">
            {t.about.statsTitle}
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="bg-racing-black border border-white/5 rounded-lg p-8 text-center hover:border-gold-500/40 transition-all duration-300"
              >
                <div className="font-display font-bold text-5xl text-gradient-gold mb-2">{stat.value}</div>
                <div className="font-display text-white/50 text-sm uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Career table */}
      <section className="section-pad">
        <div className="container-max">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white uppercase mb-2 racing-line pb-3">
            {t.about.careerTitle}
          </h2>
          <div className="mt-10 overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-4 px-4 font-display text-gold-500 text-sm uppercase tracking-wider">{t.about.careerYear}</th>
                  <th className="text-left py-4 px-4 font-display text-gold-500 text-sm uppercase tracking-wider">{t.about.careerSeries}</th>
                  <th className="text-left py-4 px-4 font-display text-gold-500 text-sm uppercase tracking-wider">{t.about.careerResult}</th>
                </tr>
              </thead>
              <tbody>
                {careerHistory.map((entry, i) => (
                  <tr
                    key={i}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors group"
                  >
                    <td className="py-4 px-4 font-display font-bold text-white text-lg">{entry.year}</td>
                    <td className="py-4 px-4 text-white/70">{lang === 'nl' ? entry.series : entry.seriesEn}</td>
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center px-3 py-1 bg-burgundy-800/30 text-gold-400 text-sm font-display uppercase tracking-wider rounded group-hover:bg-burgundy-800/50 transition-colors">
                        {lang === 'nl' ? entry.result : entry.resultEn}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Personality traits */}
      <section className="bg-racing-dark border-y border-white/5 section-pad">
        <div className="container-max">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="h-px w-12 bg-gold-500" />
              <span className="font-display text-gold-500 text-sm uppercase tracking-[0.3em]">{t.about.personalitySubtitle}</span>
              <div className="h-px w-12 bg-gold-500" />
            </div>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-white uppercase">{t.about.personalityTitle}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {traits.map((trait, i) => (
              <div
                key={i}
                className="bg-racing-black border border-white/5 rounded-lg p-8 hover:border-gold-500/40 transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-burgundy-800/30 rounded-lg flex items-center justify-center mb-6 group-hover:bg-burgundy-800/50 transition-colors">
                  <trait.icon size={28} className="text-gold-500" />
                </div>
                <h3 className="font-display font-bold text-xl text-white uppercase mb-3">{trait.title}</h3>
                <p className="text-white/60 leading-relaxed">{trait.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad">
        <div className="container-max">
          <div className="bg-gradient-to-r from-burgundy-900/40 to-racing-dark border border-gold-500/20 rounded-lg p-8 md:p-12 text-center">
            <h2 className="font-display font-bold text-2xl md:text-3xl text-white uppercase mb-4">
              {t.home.ctaTitle}
            </h2>
            <p className="text-white/60 mb-6 max-w-xl mx-auto">{t.partners.becomePartnerText}</p>
            <Link to="/contact" className="btn-gold inline-flex group">
              {t.partners.becomePartner}
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
