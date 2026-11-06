import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ArrowRight, Trophy, Flag, Clock, Calendar, MapPin, Volume2, VolumeX } from 'lucide-react';
import { useLang } from '@/i18n/LanguageContext';
import { raceCalendar, newsArticles, partners, naomiImages } from '@/data/content';
import Seo from '@/components/Seo';

type CountdownValues = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
};

const targetDate = new Date('2026-12-13T12:45:00');

function getCountdownValues(): CountdownValues {
  const total = Math.max(0, targetDate.getTime() - Date.now());
  const totalSeconds = Math.floor(total / 1000);

  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    total,
  };
}

function playTick(audioContext: AudioContext): void {
  const now = audioContext.currentTime;

  const osc = audioContext.createOscillator();
  const subOsc = audioContext.createOscillator();
  const noiseGain = audioContext.createGain();
  const masterGain = audioContext.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(110, now);
  osc.frequency.exponentialRampToValueAtTime(55, now + 0.18);

  subOsc.type = 'sine';
  subOsc.frequency.setValueAtTime(55, now);
  subOsc.frequency.exponentialRampToValueAtTime(27.5, now + 0.22);

  const noiseBuffer = audioContext.createBuffer(1, audioContext.sampleRate * 0.12, audioContext.sampleRate);
  const data = noiseBuffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
  const noise = audioContext.createBufferSource();
  noise.buffer = noiseBuffer;
  noiseGain.gain.setValueAtTime(0.35, now);
  noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

  masterGain.gain.setValueAtTime(0.9, now);
  masterGain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

  osc.connect(masterGain);
  subOsc.connect(masterGain);
  noise.connect(noiseGain);
  noiseGain.connect(masterGain);
  masterGain.connect(audioContext.destination);

  osc.start(now);
  osc.stop(now + 0.35);
  subOsc.start(now);
  subOsc.stop(now + 0.35);
  noise.start(now);
}

function Countdown() {
  const { t } = useLang();
  const [countdown, setCountdown] = useState<CountdownValues>(getCountdownValues);
  const [soundOn, setSoundOn] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCountdown(getCountdownValues());
    }, 1000);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!soundOn || countdown.total <= 0) return;

    const audioContext = audioContextRef.current;
    if (audioContext?.state === 'running') playTick(audioContext);
  }, [countdown.total, soundOn]);

  const toggleSound = async (): Promise<void> => {
    if (!audioContextRef.current) audioContextRef.current = new AudioContext();
    const audioContext = audioContextRef.current;

    if (soundOn) {
      setSoundOn(false);
      return;
    }

    await audioContext.resume();
    playTick(audioContext);
    setSoundOn(true);
  };

  const units = [
    { value: countdown.days, label: t.home.countdownDays },
    { value: countdown.hours, label: t.home.countdownHours },
    { value: countdown.minutes, label: t.home.countdownMinutes },
    { value: countdown.seconds, label: t.home.countdownSeconds },
  ];

  return (
    <section className="relative overflow-hidden bg-carbon border-y border-gold-500/20 section-pad">
      <div className="absolute inset-0 bg-gradient-to-r from-burgundy-900/40 via-transparent to-burgundy-900/40" />
      <div className="container-max relative z-10">
        <div className="flex items-center justify-center">
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5">
            {units.map((unit) => (
              <div key={unit.label} className="min-w-[68px] sm:min-w-[88px] text-center">
                <div className="rounded-lg border border-white/10 bg-racing-black/80 px-2 py-3 sm:px-4 sm:py-4 shadow-lg shadow-black/20">
                  <span className="block font-display font-bold text-3xl sm:text-5xl text-white tabular-nums">{String(unit.value).padStart(2, '0')}</span>
                </div>
                <span className="mt-2 block font-display text-xs uppercase tracking-widest text-white/50">{unit.label}</span>
              </div>
            ))}
            <button
              type="button"
              onClick={toggleSound}
              aria-pressed={soundOn}
              className="ml-1 inline-flex h-12 w-12 items-center justify-center rounded-full border border-gold-500/50 text-gold-400 transition-colors hover:bg-gold-500/10"
              aria-label={soundOn ? t.home.countdownSoundOff : t.home.countdownSoundOn}
              title={soundOn ? t.home.countdownSoundOff : t.home.countdownSoundOn}
            >
              {soundOn ? <Volume2 size={20} /> : <VolumeX size={20} />}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const { lang, t } = useLang();

  const stats = [
    { icon: Flag, value: '90', label: t.home.statsRaces },
    { icon: Trophy, value: '13', label: t.home.statsWins },
    { icon: Trophy, value: '24', label: t.home.statsPodiums },
    { icon: Clock, value: '2', label: t.home.statsSeasons },
  ];

  const upcomingRaces = raceCalendar
    .filter((r) => r.status === 'scheduled')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3);
  const latestNews = [...newsArticles].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 3);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(lang === 'nl' ? 'nl-NL' : 'en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <>
      <Seo
        title="Naomi Veenema | Officiële Website & Racing Driver"
        description="Ontdek de officiële website van Naomi Veenema, talentvolle Nederlandse autocoureur. Volg haar racereis, agenda, laatste nieuws en partners op het circuit."
        path="/"
      />
      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={naomiImages.portraitRace}
            alt="Naomi Veenema"
            className="w-full h-full object-cover object-[center_20%]"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-racing-black via-racing-black/80 to-racing-black/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-racing-black via-transparent to-racing-black/50" />
        </div>

        {/* Racing stripes accent */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-burgundy-800 via-gold-500 to-burgundy-800 z-10" />

        <div className="container-max px-4 sm:px-6 lg:px-8 relative z-10 pt-20">
          <div className="max-w-2xl">
            <div className="animate-fade-in-up flex items-center gap-3 mb-6">
              <div className="h-px w-16 bg-gold-500" />
              <span className="font-display text-gold-500 text-sm uppercase tracking-[0.3em] font-medium">
                {t.home.heroTagline}
              </span>
            </div>

            <h1 className="animate-fade-in-up text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold text-white uppercase tracking-tight text-shadow-lg" style={{ animationDelay: '100ms' }}>
              {t.home.heroTitle}
            </h1>

            <p className="animate-fade-in-up mt-6 text-lg md:text-xl text-white/80 leading-relaxed max-w-xl" style={{ animationDelay: '200ms' }}>
              {t.home.heroSubtitle}
            </p>

            <p className="animate-fade-in-up mt-4 text-xl md:text-2xl font-display font-medium text-gradient-gold italic" style={{ animationDelay: '250ms' }}>
              "{t.home.heroSlogan}"
            </p>

            <div className="animate-fade-in-up mt-10 flex flex-wrap gap-4" style={{ animationDelay: '300ms' }}>
              <Link to="/over-mij" className="btn-gold group">
                {t.home.heroCta}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/agenda" className="btn-outline">
                {t.home.heroCta2}
                <ChevronRight size={18} />
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2 animate-pulse">
          <span className="text-white/40 text-xs font-display uppercase tracking-widest">{t.home.scrollDown}</span>
          <div className="w-px h-12 bg-gradient-to-b from-gold-500 to-transparent" />
        </div>
      </section>

      <Countdown />

      {/* Stats */}
      <section className="bg-racing-dark border-y border-white/5 section-pad">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-3xl md:text-4xl text-white uppercase">{t.home.statsTitle}</h2>
            <div className="mt-4 flex items-center justify-center gap-3">
              <div className="h-px w-12 bg-gold-500" />
              <Trophy size={20} className="text-gold-500" />
              <div className="h-px w-12 bg-gold-500" />
            </div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="group relative bg-racing-black border border-white/5 rounded-lg p-8 text-center hover:border-gold-500/40 transition-all duration-300 animate-scale-in"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-0.5 bg-gold-500/0 group-hover:bg-gold-500 transition-all duration-300" />
                <stat.icon size={32} className="mx-auto mb-4 text-gold-500 group-hover:scale-110 transition-transform" />
                <div className="font-display font-bold text-4xl md:text-5xl text-white mb-2">{stat.value}</div>
                <div className="font-display text-white/50 text-sm uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About preview */}
      <section className="section-pad relative overflow-hidden">
        <div className="container-max">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="relative rounded-lg overflow-hidden">
                <img
                  src={naomiImages.action1}
                  alt="Naomi Veenema op het circuit"
                  className="w-full h-[500px] object-cover object-[center_25%]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-racing-black/60 to-transparent" />
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 border-2 border-gold-500/30 rounded-lg -z-10" />
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-burgundy-800/20 rounded-lg -z-10" />
            </div>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-12 bg-gold-500" />
                <span className="font-display text-gold-500 text-sm uppercase tracking-[0.3em]">{t.home.aboutTitle}</span>
              </div>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-white uppercase mb-6">
                {t.about.title}
              </h2>
              <p className="text-white/70 text-lg leading-relaxed mb-8">{t.home.aboutText}</p>
              <p className="text-white/60 leading-relaxed mb-8">{t.about.intro}</p>
              <Link to="/over-mij" className="btn-primary group">
                {t.home.aboutCta}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights / Upcoming races */}
      <section className="bg-racing-dark border-y border-white/5 section-pad">
        <div className="container-max">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="h-px w-12 bg-gold-500" />
                <span className="font-display text-gold-500 text-sm uppercase tracking-[0.3em]">{t.common.upcomingRaces}</span>
              </div>

            </div>
            <Link to="/agenda" className="btn-outline group">
              {t.common.viewAll}
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {upcomingRaces.map((race, i) => (
              <div
                key={race.id}
                className="card-dark p-6 group cursor-pointer animate-fade-in-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2">
                    {race.round != null && (
                      <span className="font-display text-gold-500 text-sm font-bold">R{race.round}</span>
                    )}
                    <span className="text-white/30 text-xs">{race.flag}</span>
                  </div>
                  <span className="px-3 py-1 bg-burgundy-800/30 text-burgundy-200 text-xs font-display uppercase tracking-wider rounded">
                    {t.agenda.scheduled}
                  </span>
                </div>
                <h3 className="font-display font-bold text-xl text-white uppercase mb-2 group-hover:text-gold-500 transition-colors">
                  {race.name}
                </h3>
                <p className="text-white/50 text-sm mb-4">{race.circuit}</p>
                <div className="flex items-center gap-4 text-white/60 text-sm">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={14} className="text-gold-500" />
                    {formatDate(race.date)}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin size={14} className="text-gold-500" />
                    {lang === 'nl' ? race.country : race.countryEn}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* News preview */}
      <section className="section-pad">
        <div className="container-max">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="h-px w-12 bg-gold-500" />
                <span className="font-display text-gold-500 text-sm uppercase tracking-[0.3em]">{t.common.latestNews}</span>
              </div>
              <p className="mt-2 text-white/50">{t.home.newsSubtitle}</p>
            </div>
            <Link to="/nieuws" className="btn-outline group">
              {t.common.viewAll}
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {latestNews.map((article, i) => (
              <Link
                key={article.id}
                to={`/nieuws/${article.id}`}
                className="card-dark overflow-hidden group animate-fade-in-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="relative h-48 overflow-hidden bg-racing-dark flex items-center justify-center">
                  {article.image ? (
                    <img
                      src={article.image}
                      alt=""
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  ) : (
                    <Calendar size={40} className="text-white/20" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-racing-dark to-transparent" />
                  <span className="absolute top-3 left-3 px-3 py-1 bg-burgundy-800 text-white text-xs font-display uppercase tracking-wider rounded">
                    {article.category}
                  </span>
                </div>
                <div className="p-5">
                  <span className="text-gold-500 text-xs font-display uppercase tracking-wider">{formatDate(article.date)}</span>
                  <h3 className="font-display font-bold text-lg text-white mt-2 group-hover:text-gold-500 transition-colors">
                    {lang === 'nl' ? article.titleNl : article.titleEn}
                  </h3>
                  <p className="text-white/50 text-sm mt-2 line-clamp-2">
                    {lang === 'nl' ? article.excerptNl : article.excerptEn}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Partners marquee */}
      <section className="bg-racing-dark border-y border-white/5 py-12 overflow-hidden">
        <div className="container-max mb-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="h-px w-12 bg-gold-500" />
              <span className="font-display text-gold-500 text-sm uppercase tracking-[0.3em]">{t.common.myPartners}</span>
              <div className="h-px w-12 bg-gold-500" />
            </div>

          </div>
        </div>
        <div className="relative">
          <div className="flex gap-8 animate-marquee w-max">
            {[...partners, ...partners, ...partners].map((p, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-40 h-20 flex items-center justify-center bg-racing-black border border-white/5 rounded-lg group hover:border-gold-500/40 transition-all px-4"
              >
                <img
                  src={p.logo}
                  alt={p.name}
                  className="max-h-14 max-w-full object-contain opacity-50 group-hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={naomiImages.drsZwolle}
            alt=""
            className="w-full h-full object-cover object-center opacity-20"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-racing-black via-racing-black/90 to-racing-black/70" />
        </div>
        <div className="container-max relative z-10">
          <div className="max-w-2xl">
            <h2 className="font-display font-bold text-3xl md:text-5xl text-white uppercase mb-4">
              {t.home.ctaTitle}
            </h2>
            <p className="text-white/70 text-lg mb-8">{t.home.ctaText}</p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact" className="btn-gold group">
                {t.home.ctaButton}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/merchandise" className="btn-outline">{t.common.shopNow}</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
