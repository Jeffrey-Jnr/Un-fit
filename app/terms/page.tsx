export default function TermsPage() {
  return (
    <main className="min-h-screen pt-32 pb-16 px-6 md:px-12 max-w-4xl mx-auto text-zinc-800">
      <h1 className="text-4xl md:text-5xl font-serif font-medium mb-8">Terms of Service</h1>
      
      <div className="space-y-6 text-gray-700 leading-relaxed font-light">
        <p>Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
        
        <h2 className="text-2xl font-serif font-medium text-black mt-8 mb-4">1. Introduction</h2>
        <p>
          Welcome to (un)Fit by Jeffrey Hughes Jr. By accessing or using our website, purchasing our book, or interacting with our content, you agree to be bound by these Terms of Service.
        </p>

        <h2 className="text-2xl font-serif font-medium text-black mt-8 mb-4">2. Intellectual Property</h2>
        <p>
          All content, including but not limited to text, graphics, logos, images, and digital products, is the property of Jeffrey Hughes Jr. and is protected by copyright laws. You may not reproduce, distribute, or create derivative works without express permission.
        </p>

        <h2 className="text-2xl font-serif font-medium text-black mt-8 mb-4">3. Purchases and Refunds</h2>
        <p>
          When you purchase a physical copy or e-book, you agree to provide current, complete, and accurate purchase and account information. All sales are final.
        </p>

        <h2 className="text-2xl font-serif font-medium text-black mt-8 mb-4">4. Limitation of Liability</h2>
        <p>
          We shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your access to or use of, or inability to access or use, the website or our products.
        </p>

        <h2 className="text-2xl font-serif font-medium text-black mt-8 mb-4">5. Contact Information</h2>
        <p>
          If you have any questions about these Terms, please contact us at hello@example.com.
        </p>
      </div>
    </main>
  );
}
