import { useState } from 'react';
import { X, ZoomIn } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import { useLang } from '@/i18n/LanguageContext';
import { galleryImages, naomiImages, newsArticles } from '@/data/content';
import Seo from '@/components/Seo';

export default function Gallery() {
  const { t } = useLang();
  const [filter, setFilter] = useState<string>('all');
  const [lightbox, setLightbox] = useState<string | null>(null);

  const categories = [
    { key: 'all', label: t.gallery.all },
    { key: 'races', label: t.gallery.races },
    { key: 'podium', label: t.gallery.podium },
    { key: 'portraits', label: t.gallery.portraits },
  ];

  const filtered = galleryImages.filter((img) => filter === 'all' || img.category === filter);

  const newsGalleryImages = newsArticles.flatMap((article) =>
    (article.images ?? []).map((url, idx) => ({
      id: `news-${article.id}-${idx}`,
      category: 'races',
      url,
      alt: article.titleNl,
      title: article.titleNl,
    }))
  );

  const allImages = [...filtered, ...newsGalleryImages.filter(
    (img) => !galleryImages.some((g) => g.url === img.url)
  )];

  return (
    <>
      <Seo
        title="Fotogalerij"
        description="Bekijk foto's van Naomi Veenema op en rond het circuit. Actiefoto's, podia en portretten van deze Nederlandse autocoureur."
        path="/fotogalerij"
      />
      <PageHeader
        title={t.gallery.title}
        subtitle={t.gallery.subtitle}
        bgImage={naomiImages.portraitRace}
      />

      <section className="section-pad">
        <div className="container-max">
          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setFilter(cat.key)}
                className={`px-5 py-2.5 font-display font-medium text-sm uppercase tracking-wider rounded transition-all duration-300 ${
                  filter === cat.key
                    ? 'bg-burgundy-800 text-white'
                    : 'bg-racing-dark text-white/60 border border-white/10 hover:text-white hover:border-gold-500/30'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Gallery grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {allImages.map((img, i) => (
              <div
                key={img.id}
                className={`group relative overflow-hidden rounded-lg cursor-pointer animate-scale-in ${
                  i % 5 === 0 ? 'sm:col-span-2 sm:row-span-2' : ''
                }`}
                onClick={() => setLightbox(img.url)}
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <img
                  src={img.url}
                  alt={img.alt}
                  className={`w-full ${i % 5 === 0 ? 'h-full min-h-[300px]' : 'h-64'} object-cover group-hover:scale-110 transition-transform duration-500`}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-racing-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <h3 className="font-display font-bold text-white text-sm uppercase tracking-wider">{img.title}</h3>
                </div>
                <div className="absolute top-4 right-4 w-10 h-10 bg-racing-black/60 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ZoomIn size={18} className="text-gold-500" />
                </div>
              </div>
            ))}
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
            alt="Gallery"
            className="max-w-full max-h-[85vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
