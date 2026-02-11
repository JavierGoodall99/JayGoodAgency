import React from 'react';
import SEO from './SEO';

const PrivacyPolicy: React.FC = () => {
    return (
        <div className="bg-brand-dark min-h-screen text-white pt-32 pb-20 px-6">
            <SEO title="Privacy Policy" />
            <div className="container mx-auto max-w-4xl">
                <h1 className="font-display font-bold text-5xl md:text-6xl mb-8 text-brand-lime">Privacy Policy</h1>
                <p className="font-mono text-xs uppercase tracking-widest text-gray-500 mb-12">Last Updated: {new Date().toLocaleDateString()}</p>

                <div className="prose prose-invert prose-lg max-w-none text-gray-300">
                    <p>At JayGood Agency, we respect your privacy. This policy outlines how we handle your data.</p>

                    <h3>1. Information We Collect</h3>
                    <p>We do not use contact forms, so we do not collect personal information directly through the website unless you email or call us.</p>

                    <h3>2. Analytics</h3>
                    <p>We may use anonymous analytics tools to understand website traffic and improve user experience. No personally identifiable information is attached to this data.</p>

                    <h3>3. Cookies</h3>
                    <p>We use essential cookies to ensure the website functions correctly. You can control cookie preferences through your browser settings.</p>

                    <h3>4. Contact</h3>
                    <p>For any privacy concerns, please contact us at <a href="mailto:javiergoodall@outlook.com" className="text-brand-lime">javiergoodall@outlook.com</a>.</p>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
