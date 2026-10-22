import { useState } from 'react';
import { Calendar, MapPin } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import { useLang } from '@/i18n/LanguageContext';
import { raceCalendar, naomiImages } from '@/data/content';
import Seo from '@/components/Seo';

export default function Agenda() {
  const { lang, t } = useLang();
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('all');

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(lang === 'nl' ? 'nl-NL' : 'en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const formatShort = (dateStr: string) => {
    const date = new Date(dateStr);
    return {
      day: date.toLocaleDateString(lang === 'nl' ? 'nl-NL' : 'en-GB', { day: '2-digit' }),
      month: date.toLocaleDateString(lang === 'nl' ? 'nl-NL' : 'en-GB', { month: 'short' }).toUpperCase(),
    };
  };

  const formatEndDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(lang === 'nl' ? 'nl-NL' : 'en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const allRaces = [...raceCalendar].sort((a, b) => {
    if (a.status !== b.status) return a.status === 'scheduled' ? -1 : 1;

    const dateDifference = new Date(a.date).getTime() - new Date(b.date).getTime();
    return a.status === 'scheduled' ? dateDifference : -dateDifference;
  });

  const filteredRaces = allRaces.filter((r) => {
    if (filter === 'upcoming') return r.status === 'scheduled';
    if (filter === 'past') return r.status === 'finished';
    return true;
  });

  const filters = [
    { key: 'all' as const, label: t.agenda.all },
    { key: 'upcoming' as const, label: t.agenda.upcoming },
    { key: 'past' as const, label: t.agenda.past },
  ];

  return (
    <>
      <Seo
        title="Agenda"
        description="Bekijk de race-agenda van Naomi Veenema. Alle aankomende en afgelopen races, data, circuits en resultaten op één plek."
        path="/agenda"
      />
      <PageHeader
        title={t.agenda.title}
        subtitle={t.agenda.subtitle}
        bgImage={naomiImages.action1}
      />

      <section className="section-pad">
        <div className="container-max">
          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-10">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`px-5 py-2.5 font-display font-medium text-sm uppercase tracking-wider rounded transition-all duration-300 ${
                  filter === f.key
                    ? 'bg-burgundy-800 text-white'
                    : 'bg-racing-dark text-white/60 border border-white/10 hover:text-white hover:border-gold-500/30'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Race list */}
          {filteredRaces.length === 0 ? (
            <p className="text-white/50 text-center py-20">{t.agenda.noRaces}</p>
          ) : (
            <div className="space-y-4">
              {filteredRaces.map((race, i) => {
                const d = formatShort(race.date);
                return (
                  <div
                    key={race.id}
                    className={`group relative bg-racing-dark border rounded-lg overflow-hidden transition-all duration-300 hover:border-gold-500/40 animate-fade-in-up ${
                      race.status === 'finished' ? 'border-white/5' : 'border-burgundy-800/30'
                    }`}
                    style={{ animationDelay: `${i * 60}ms` }}
                  >
                    <div className="flex flex-col sm:flex-row items-stretch">
                      {/* Date block */}
                      <div className="flex-shrink-0 sm:w-28 bg-racing-black flex flex-row sm:flex-col items-center justify-center py-4 sm:py-6 gap-1 border-b sm:border-b-0 sm:border-r border-white/5">
                        <span className="font-display font-bold text-3xl text-white">{d.day}</span>
                        <span className="font-display text-gold-500 text-sm uppercase tracking-wider">{d.month}</span>
                      </div>

                      {/* Race info */}
                      <div className="flex-1 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            {race.round != null && (
                              <span className="font-display text-gold-500 text-sm font-bold">
                                {t.agenda.round} {race.round}
                              </span>
                            )}
                            <span className="text-white/30">|</span>
                            <span className="text-white/50 text-sm">{race.flag} {lang === 'nl' ? race.country : race.countryEn}</span>
                          </div>
                          <h3 className="font-display font-bold text-xl md:text-2xl text-white uppercase mb-1 group-hover:text-gold-500 transition-colors">
                            {race.name}
                          </h3>
                          <div className="flex flex-wrap items-center gap-4 text-white/50 text-sm mt-2">
                            <span className="flex items-center gap-1.5">
                              <MapPin size={14} className="text-gold-500" />
                              {race.circuit}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Calendar size={14} className="text-gold-500" />
                              {formatDate(race.date)}
                              {race.endDate ? ` — ${formatEndDate(race.endDate)}` : ''}
                            </span>
                          </div>
                        </div>

                        {/* Status */}
                        <div className="flex items-center gap-4">
                          {race.status === 'finished' && (
                            <span className="px-4 py-2 bg-white/5 text-white/50 text-xs font-display uppercase tracking-wider rounded whitespace-nowrap">
                              {t.agenda.finished}
                            </span>
                          )}
                          {race.status === 'scheduled' && (
                            <span className="px-4 py-2 bg-burgundy-800/30 text-burgundy-200 text-xs font-display uppercase tracking-wider rounded whitespace-nowrap">
                              {t.agenda.scheduled}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    {/* Bottom accent line */}
                    <div className="h-0.5 bg-gradient-to-r from-burgundy-800 via-gold-500 to-transparent w-0 group-hover:w-full transition-all duration-500" />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

    </>
  );
}
