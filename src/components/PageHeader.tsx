interface PageHeaderProps {
  title: string;
  subtitle?: string;
  bgImage?: string;
}

export default function PageHeader({ title, subtitle, bgImage }: PageHeaderProps) {
  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
      {bgImage && (
        <div className="absolute inset-0">
          <img src={bgImage} alt="" className="w-full h-full object-cover opacity-25" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-b from-racing-black/80 via-racing-black/70 to-racing-black" />
        </div>
      )}
      {!bgImage && (
        <div className="absolute inset-0 bg-carbon opacity-50" />
      )}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-burgundy-800 via-gold-500 to-burgundy-800" />
      <div className="container-max px-4 sm:px-6 lg:px-8 relative">
        <div className="animate-fade-in-up">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-gold-500" />
            <span className="font-display text-gold-500 text-sm uppercase tracking-[0.3em]">Naomi Veenema</span>
          </div>
          <h1 className="font-display font-bold text-4xl md:text-6xl text-white uppercase tracking-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-4 text-lg text-white/60 max-w-2xl">{subtitle}</p>
          )}
        </div>
      </div>
    </section>
  );
}
