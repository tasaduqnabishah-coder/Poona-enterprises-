import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

export default function SEO({ 
  title = "Poona Enterprises | Rent Electronics & Furniture in Pune",
  description = "Affordable and premium electronics and furniture rentals in Pune. We offer ACs, washing machines, refrigerators, and stylish furniture on rent. Expert repair services available.",
  keywords = "rent electronics pune, furniture rental pune, ac on rent pune, fridge repair pune, washing machine repair pune, second hand electronics pune",
  image = "/hero-showcase.png",
  url = "https://poona-enterprises-self.vercel.app",
  type = "website"
}: SEOProps) {
  const siteTitle = title.includes("Poona Enterprises") ? title : `${title} | Poona Enterprises`;

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Canonical URL */}
      <link rel="canonical" href={url} />
    </Helmet>
  );
}
