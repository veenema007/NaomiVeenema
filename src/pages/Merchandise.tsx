import PageHeader from '@/components/PageHeader';
import { useLang } from '@/i18n/LanguageContext';
import { naomiImages } from '@/data/content';
import Seo from '@/components/Seo';

export default function Merchandise() {
  const { t } = useLang();

  return (
    <>
      <Seo
        title="Merchandise"
        description="Officiële merchandise van Naomi Veenema. Binnenkort beschikbaar — houd de website in de gaten voor de lancering."
        path="/merchandise"
      />
      <PageHeader
        title={t.merch.title}
        subtitle={t.merch.subtitle}
        bgImage={naomiImages.portraitRace}
      />

      <section className="min-h-[50vh] flex items-center justify-center px-4 py-20">
        <h1 className="font-display font-bold text-5xl md:text-7xl text-white uppercase tracking-wider text-center">
          COMING SOON
        </h1>
      </section>
    </>
  );
}
