import PageHeader from '@/components/PageHeader';
import { useLang } from '@/i18n/LanguageContext';
import { naomiImages } from '@/data/content';

export default function Merchandise() {
  const { t } = useLang();

  return (
    <>
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
