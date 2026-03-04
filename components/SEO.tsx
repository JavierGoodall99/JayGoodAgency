import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title?: string;
    description?: string;
    canonical?: string;
    type?: string;
    image?: string;
}

const SEO: React.FC<SEOProps> = ({
    title = 'Web Design Agency | JayGood',
    description = 'Looking for a top-tier Web Design Agency? JayGood is a boutique digital agency crafting award-worthy websites, immersive web experiences, and high-performance applications.',
    canonical = 'https://jaygood.com/',
    type = 'website',
    image = 'https://jaygood.com/og-image.png'
}) => {
    const siteTitle = title === 'Web Design Agency | JayGood' ? title : `${title} | Web Design Agency`;

    return (
        <Helmet>
            {/* Standard Metadata */}
            <title>{siteTitle}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={canonical} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={canonical} />
            <meta property="og:title" content={siteTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={canonical} />
            <meta name="twitter:title" content={siteTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />
        </Helmet>
    );
};

export default SEO;
