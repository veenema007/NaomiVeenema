import { Helmet } from 'react-helmet-async';

type SeoProps = {
  title: string;
  description: string;
  path?: string;
  image?: string;
};

const BASE_URL = 'https://naomiveenema.nl';
const DEFAULT_IMAGE = '/images/logo/ndv-logo-header.png';

export default function Seo({ title, description, path = '', image }: SeoProps) {
  const url = `${BASE_URL}${path}`;
  const ogImage = image ?? `${BASE_URL}${DEFAULT_IMAGE}`;
  const fullTitle = title === 'Naomi Veenema | Officiële Website & Racing Driver'
    ? title
    : `${title} | Naomi Veenema`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
}
