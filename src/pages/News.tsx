import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, Search } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import { useLang } from '@/i18n/LanguageContext';
import { newsArticles, naomiImages } from '@/data/content';

export default function News() {
  const { lang, t } = useLang();
  const [category, setCategory] = useState<string>('all');
  const [search, setSearch] = useState('');

  const categories = [
    { key: 'all', label: t.news.all },
    { key: 'race', label: t.news.race },
    { key: 'team', label: t.news.team },
    { key: 'media', label: t.news.media },
    { key: 'personal', label: t.news.personal },
  ];

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(lang === 'nl' ? 'nl-NL' : 'en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const filtered = newsArticles.filter((article) => {
    const matchesCat = category === 'all' || article.category === category;
    const title = lang === 'nl' ? article.titleNl : article.titleEn;
    const excerpt = lang === 'nl' ? article.excerptNl : article.excerptEn;
    const matchesSearch = search === '' ||
      title.toLowerCase().includes(search.toLowerCase()) ||
      excerpt.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const articles = filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <>
      <PageHeader
        title={t.news.title}
        subtitle={t.news.subtitle}
        bgImage={naomiImages.action2}
      />

      <section className="section-pad">
        <div className="container-max">
          {/* Search + filters */}
          <div className="flex flex-col lg:flex-row gap-4 mb-10">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={lang === 'nl' ? 'Zoek nieuws...' : 'Search news...'}
                className="w-full bg-racing-dark border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white placeholder:text-white/30 focus:border-gold-500/50 focus:outline-none transition-colors"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setCategory(cat.key)}
                  className={`px-4 py-2.5 font-display font-medium text-sm uppercase tracking-wider rounded transition-all duration-300 ${
                    category === cat.key
                      ? 'bg-burgundy-800 text-white'
                      : 'bg-racing-dark text-white/60 border border-white/10 hover:text-white hover:border-gold-500/30'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {articles.length === 0 ? (
            <p className="text-white/50 text-center py-20">{t.news.noNews}</p>
          ) : (
            <>
              {/* Article grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((article, i) => (
                  <Link
                    key={article.id}
                    to={`/nieuws/${article.id}`}
                    className="card-dark overflow-hidden group cursor-pointer animate-fade-in-up"
                    style={{ animationDelay: `${i * 80}ms` }}
                  >
                    <div className="relative h-48 overflow-hidden bg-racing-dark flex items-center justify-center">
                      {article.image ? (
                        <img
                          src={article.image}
                          alt=""
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          style={article.imagePosition ? { objectPosition: article.imagePosition } : undefined}
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
                      <span className="flex items-center gap-1.5 text-gold-500 text-xs font-display uppercase tracking-wider mb-2">
                        <Calendar size={12} />
                        {formatDate(article.date)}
                      </span>
                      <h3 className="font-display font-bold text-lg text-white mb-2 group-hover:text-gold-500 transition-colors">
                        {lang === 'nl' ? article.titleNl : article.titleEn}
                      </h3>
                      <p className="text-white/50 text-sm line-clamp-2 mb-4">
                        {lang === 'nl' ? article.excerptNl : article.excerptEn}
                      </p>
                      <span className="flex items-center gap-1.5 text-gold-500 font-display text-xs uppercase tracking-wider group-hover:gap-2.5 transition-all">
                        {t.common.readMore}
                        <ArrowRight size={14} />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
