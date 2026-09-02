export default function PrivacyPage() {
  return (
    <main className="min-h-screen pt-32 pb-16 px-6 md:px-12 max-w-4xl mx-auto text-zinc-800">
      <h1 className="text-4xl md:text-5xl font-serif font-medium mb-8">Privacy Policy</h1>
      
      <div className="space-y-6 text-gray-700 leading-relaxed font-light">
        <p>Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
        
        <h2 className="text-2xl font-serif font-medium text-black mt-8 mb-4">1. Information We Collect</h2>
        <p>
          We collect information that you provide directly to us when you make a purchase, sign up for a newsletter, or contact us. This may include your name, email address, shipping address, and payment information. We also automatically collect certain technical information when you visit our site, such as your IP address and browsing behavior, using cookies and similar technologies.
        </p>

        <h2 className="text-2xl font-serif font-medium text-black mt-8 mb-4">2. How We Use Your Information</h2>
        <p>
          We use the information we collect to process your orders, communicate with you about products and updates, improve our website, and for marketing purposes.
        </p>

        <h2 className="text-2xl font-serif font-medium text-black mt-8 mb-4">3. Sharing Your Information</h2>
        <p>
          We do not sell your personal information. We may share your information with trusted third-party service providers who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential.
        </p>

        <h2 className="text-2xl font-serif font-medium text-black mt-8 mb-4">4. Data Security</h2>
        <p>
          We implement a variety of security measures to maintain the safety of your personal information when you place an order or enter, submit, or access your personal information.
        </p>

        <h2 className="text-2xl font-serif font-medium text-black mt-8 mb-4">5. Contact Us</h2>
        <p>
          If there are any questions regarding this privacy policy, you may contact us using the information on our website.
        </p>
      </div>
    </main>
  );
}
