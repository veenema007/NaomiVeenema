import { useState, useEffect, useCallback } from 'react';
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import { useLang } from '@/i18n/LanguageContext';
import { galleryImages, naomiImages, newsArticles } from '@/data/content';
import Seo from '@/components/Seo';

type GalleryImage = {
  id: string;
  category: string;
  url: string;
  alt: string;
  title: string;
  objectPosition?: string;
};

const galleryObjectPositions: Record<string, string> = {
  [naomiImages.portraitRace]: 'center 30%',
  [naomiImages.action1]: 'center 40%',
  [naomiImages.drsZwolle]: 'center 35%',
  [naomiImages.action2]: 'center 45%',
  '/images/news/Champion.jpeg': 'center 25%',
  '/images/news/Podium_WOKC_finals.jpeg': 'center 30%',
  '/images/news/Startopstelling.jpeg': 'center 40%',
  '/images/news/Juichen.jpeg': 'center 35%',
  '/images/news/NXTGP_DO6_podium.jpg': 'center 35%',
  '/images/news/NXTGP_DO6_kart.jpg': 'center 40%',
  '/images/news/WOKC_GP_4_Shootout_podium_01.jpg': 'center 30%',
  '/images/news/WOKC_GP_4_Shootout_podium_02.jpg': 'center 30%',
  '/images/news/WOKC_GP_4_Shootout_top_3.jpg': 'center 35%',
  '/images/news/WOKC_GP_7_bekertje_01.jpeg': 'center 40%',
  '/images/news/WOKC_GP_7_bekertje_02.jpeg': 'center 40%',
  '/images/news/Sponsorevent_Sponsoren_01.jpeg': 'center 25%',
};

export default function Gallery() {
  const { t } = useLang();
  const [filter, setFilter] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

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
      objectPosition: galleryObjectPositions[url] ?? 'center',
    }))
  );

  const allImages: GalleryImage[] = Array.from(
    new Map(
      [...filtered, ...newsGalleryImages].map((img) => [img.url, img])
    ).values()
  );

  const goToPrev = useCallback(() => {
    setLightboxIndex((prev) => (prev === null ? null : (prev - 1 + allImages.length) % allImages.length));
  }, [allImages.length]);

  const goToNext = useCallback(() => {
    setLightboxIndex((prev) => (prev === null ? null : (prev + 1) % allImages.length));
  }, [allImages.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goToPrev();
      if (e.key === 'ArrowRight') goToNext();
      if (e.key === 'Escape') setLightboxIndex(null);
    };
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [lightboxIndex, goToPrev, goToNext]);

  const currentImage = lightboxIndex !== null ? allImages[lightboxIndex] : null;

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
                className="group relative overflow-hidden rounded-lg cursor-pointer animate-scale-in aspect-[4/3]"
                onClick={() => setLightboxIndex(i)}
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <img
                  src={img.url}
                  alt={img.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  style={{ objectPosition: img.objectPosition ?? galleryObjectPositions[img.url] ?? 'center' }}
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

      {/* Lightbox with navigation */}
      {currentImage && (
        <div
          className="fixed inset-0 z-[100] bg-racing-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Close button */}
          <button
            className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center text-white hover:text-gold-500 transition-colors z-10"
            onClick={() => setLightboxIndex(null)}
          >
            <X size={28} />
          </button>

          {/* Previous arrow */}
          <button
            className="absolute left-4 md:left-8 w-12 h-12 flex items-center justify-center text-white/70 hover:text-gold-500 transition-colors z-10 bg-racing-black/40 hover:bg-racing-black/60 rounded-full"
            onClick={(e) => { e.stopPropagation(); goToPrev(); }}
          >
            <ChevronLeft size={32} />
          </button>

          {/* Image */}
          <img
            src={currentImage.url}
            alt={currentImage.alt}
            className="max-w-full max-h-[85vh] object-contain rounded-lg animate-fade-in"
            onClick={(e) => e.stopPropagation()}
            key={currentImage.url}
          />

          {/* Next arrow */}
          <button
            className="absolute right-4 md:right-8 w-12 h-12 flex items-center justify-center text-white/70 hover:text-gold-500 transition-colors z-10 bg-racing-black/40 hover:bg-racing-black/60 rounded-full"
            onClick={(e) => { e.stopPropagation(); goToNext(); }}
          >
            <ChevronRight size={32} />
          </button>

          {/* Counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40 text-sm font-display">
            {lightboxIndex! + 1} / {allImages.length}
          </div>
        </div>
      )}
    </>
  );
}
