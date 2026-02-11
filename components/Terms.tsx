import React from 'react';
import SEO from './SEO';

const Terms: React.FC = () => {
    return (
        <div className="bg-brand-dark min-h-screen text-white pt-32 pb-20 px-6">
            <SEO title="Terms of Service" />
            <div className="container mx-auto max-w-4xl">
                <h1 className="font-display font-bold text-5xl md:text-6xl mb-8 text-brand-lime">Terms of Service</h1>
                <p className="font-mono text-xs uppercase tracking-widest text-gray-500 mb-12">Last Updated: {new Date().toLocaleDateString()}</p>

                <div className="prose prose-invert prose-lg max-w-none text-gray-300">
                    <h3>1. Agreement</h3>
                    <p>By accessing the JayGood Agency website, you agree to be bound by these Terms of Service.</p>

                    <h3>2. Intellectual Property</h3>
                    <p>All content, design, and code on this website are the intellectual property of JayGood Agency unless otherwise stated.</p>

                    <h3>3. Services</h3>
                    <p>Our services are provided on a contract basis. Specific terms regarding project scope, payments, and deliverables will be outlined in individual service agreements.</p>

                    <h3>4. Limitation of Liability</h3>
                    <p>JayGood Agency shall not be held liable for any indirect, incidental, or consequential damages arising from the use of our website or services.</p>

                    <h3>5. Governing Law</h3>
                    <p>These terms are governed by the laws of South Africa.</p>
                </div>
            </div>
        </div>
    );
};

export default Terms;
