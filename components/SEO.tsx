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
    title = 'JayGood | Web Design Agency — Cape Town',
    description = 'JayGood is a web design agency crafting award-worthy websites, immersive web experiences, and high-performance applications. We fuse brutalist aesthetics with hyper-performance engineering.',
    canonical = 'https://jaygood.com/',
    type = 'website',
    image = 'https://jaygood.com/og-image.png'
}) => {
    const siteTitle = title === 'JayGood | Digital Experience Agency — Cape Town' ? title : `${title} | JayGood Agency`;

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
