import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, ArrowLeft, ArrowRight, ChevronRight, X, ZoomIn } from 'lucide-react';
import { useLang } from '@/i18n/LanguageContext';
import { newsArticles } from '@/data/content';
import Seo from '@/components/Seo';

export default function NewsArticle() {
  const { id } = useParams<{ id: string }>();
  const { lang, t } = useLang();
  const navigate = useNavigate();
  const [lightbox, setLightbox] = useState<string | null>(null);

  const article = newsArticles.find((a) => a.id === Number(id));

  if (!article) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <p className="text-white/60 text-lg mb-6">{lang === 'nl' ? 'Dit bericht bestaat niet.' : 'This article does not exist.'}</p>
          <Link to="/nieuws" className="btn-gold group">
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            {t.common.backToHome}
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(lang === 'nl' ? 'nl-NL' : 'en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const title = lang === 'nl' ? article.titleNl : article.titleEn;
  const body = (lang === 'nl' ? article.bodyNl : article.bodyEn)
    .split('\n\n')
    .filter((p) => p.trim().length > 0);
  const captions = article.id === 12
    ? (lang === 'nl'
      ? ['TT Junior Track Assen', 'RACB Karting de Spa-Francorchamps']
      : ['TT Junior Track Assen', 'RACB Karting de Spa-Francorchamps'])
    : [];

  return (
    <>
      <Seo
        title={title}
        description={lang === 'nl' ? article.excerptNl : article.excerptEn}
        path={`/nieuws/${article.id}`}
        image={article.image}
      />
      {/* Hero image */}
      <section className="relative h-[50vh] min-h-[400px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          {article.image ? (
            <img
              src={article.image}
              alt=""
              className="w-full h-full object-cover"
              style={article.imagePosition ? { objectPosition: article.imagePosition } : undefined}
              fetchPriority="high"
            />
          ) : (
            <div className="w-full h-full bg-racing-dark flex items-center justify-center">
              <Calendar size={64} className="text-white/15" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-racing-black via-racing-black/60 to-transparent" />
        </div>
        <div className="container-max px-4 sm:px-6 lg:px-8 relative z-10 pb-10">
          <nav className="flex items-center gap-2 text-white/50 text-sm font-display uppercase tracking-wider mb-4">
            <Link to="/" className="hover:text-gold-500 transition-colors">{t.nav.home}</Link>
            <ChevronRight size={14} />
            <Link to="/nieuws" className="hover:text-gold-500 transition-colors">{t.nav.news}</Link>
          </nav>
          <span className="inline-block px-3 py-1 bg-burgundy-800 text-white text-xs font-display uppercase tracking-wider rounded mb-4">
            {article.category}
          </span>
          <h1 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-white uppercase max-w-3xl">
            {title}
          </h1>
        </div>
      </section>

      {/* Article body */}
      <section className="section-pad">
        <div className="container-max">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-8 pb-8 border-b border-white/10">
              <Calendar size={18} className="text-gold-500" />
              <span className="text-gold-500 font-display text-sm uppercase tracking-wider">
                {formatDate(article.date)}
              </span>
            </div>

            <div className="space-y-6">
              {body.map((paragraph, i) => (
                <p key={i} className="text-white/75 text-lg leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Gallery with lightbox */}
            {article.images.filter(Boolean).length > 1 && (
              <div className="mt-12">
                <h2 className="font-display font-bold text-xl text-white uppercase mb-6">
                  {lang === 'nl' ? 'Foto\'s' : 'Photos'}
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {article.images.filter(Boolean).map((image, i) => (
                    <div key={image}>
                      <button
                      onClick={() => setLightbox(image)}
                      className="relative rounded-lg overflow-hidden border border-white/10 group cursor-pointer"
                    >
                      <img
                        src={image}
                        alt={captions[i] ?? ''}
                        className="w-full h-40 md:h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-racing-black/0 group-hover:bg-racing-black/30 transition-colors duration-300" />
                      <div className="absolute top-2 right-2 w-9 h-9 bg-racing-black/60 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <ZoomIn size={16} className="text-gold-500" />
                      </div>
                      </button>
                      {captions[i] && (
                        <p className="mt-2 text-center text-sm font-display uppercase tracking-wider text-white/60">
                          {captions[i]}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Back link */}
            <div className="mt-12 pt-8 border-t border-white/10">
              <button
                onClick={() => navigate('/nieuws')}
                className="btn-outline group"
              >
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                {lang === 'nl' ? 'Terug naar nieuws' : 'Back to news'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* More news */}
      <section className="bg-racing-dark border-y border-white/5 section-pad">
        <div className="container-max">
          <h2 className="font-display font-bold text-2xl md:text-3xl text-white uppercase mb-8">
            {lang === 'nl' ? 'Meer nieuws' : 'More news'}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {newsArticles
              .filter((a) => a.id !== article.id)
              .slice(0, 3)
              .map((a) => (
                <Link
                  key={a.id}
                  to={`/nieuws/${a.id}`}
                  className="card-dark overflow-hidden group animate-fade-in-up"
                >
                  <div className="relative h-40 overflow-hidden bg-racing-dark flex items-center justify-center">
                    {a.image ? (
                      <img
                        src={a.image}
                        alt=""
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        style={a.imagePosition ? { objectPosition: a.imagePosition } : undefined}
                        loading="lazy"
                      />
                    ) : (
                      <Calendar size={32} className="text-white/15" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-racing-dark to-transparent" />
                  </div>
                  <div className="p-5">
                    <span className="text-gold-500 text-xs font-display uppercase tracking-wider">
                      {formatDate(a.date)}
                    </span>
                    <h3 className="font-display font-bold text-base text-white mt-2 group-hover:text-gold-500 transition-colors line-clamp-2">
                      {lang === 'nl' ? a.titleNl : a.titleEn}
                    </h3>
                  </div>
                </Link>
              ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/nieuws" className="btn-outline group">
              {t.common.viewAll}
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] bg-racing-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center text-white hover:text-gold-500 transition-colors"
            onClick={() => setLightbox(null)}
          >
            <X size={28} />
          </button>
          <img
            src={lightbox}
            alt=""
            className="max-w-full max-h-[85vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
