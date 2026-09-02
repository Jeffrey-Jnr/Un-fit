export default function CookiesPage() {
  return (
    <main className="min-h-screen pt-32 pb-16 px-6 md:px-12 max-w-4xl mx-auto text-zinc-800">
      <h1 className="text-4xl md:text-5xl font-serif font-medium mb-8">Cookie Policy</h1>
      
      <div className="space-y-6 text-gray-700 leading-relaxed font-light">
        <p>Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
        
        <h2 className="text-2xl font-serif font-medium text-black mt-8 mb-4">1. What Are Cookies</h2>
        <p>
          Cookies are small text files that are placed on your computer or mobile device when you browse websites. They are widely used to make websites work, or work more efficiently, as well as to provide information to the owners of the site.
        </p>

        <h2 className="text-2xl font-serif font-medium text-black mt-8 mb-4">2. How We Use Cookies</h2>
        <p>
          We use cookies for several reasons. Some cookies are required for technical reasons in order for our website to operate (essential cookies). Other cookies enable us to track and target the interests of our users to enhance the experience on our website (analytics and performance cookies). We may also use cookies for marketing purposes to show you relevant advertisements.
        </p>

        <h2 className="text-2xl font-serif font-medium text-black mt-8 mb-4">3. Types of Cookies We Use</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Essential Cookies:</strong> These cookies are strictly necessary to provide you with services available through our website and to use some of its features, such as access to secure areas.</li>
          <li><strong>Performance and Functionality Cookies:</strong> These cookies are used to enhance the performance and functionality of our website but are non-essential to their use.</li>
          <li><strong>Analytics and Customization Cookies:</strong> These cookies collect information that is used either in aggregate form to help us understand how our website is being used or how effective our marketing campaigns are.</li>
        </ul>

        <h2 className="text-2xl font-serif font-medium text-black mt-8 mb-4">4. Your Control Over Cookies</h2>
        <p>
          You have the right to decide whether to accept or reject cookies. You can set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website though your access to some functionality and areas of our website may be restricted.
        </p>
      </div>
    </main>
  );
}
