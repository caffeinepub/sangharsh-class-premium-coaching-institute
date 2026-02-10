import { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import { marketingSiteContent } from '@/content/marketingSiteContent';
import { Target } from 'lucide-react';

function AboutPage() {
  const { about } = marketingSiteContent;

  useEffect(() => {
    // Set SEO metadata
    const originalTitle = document.title;
    const originalDescription = document.querySelector('meta[name="description"]')?.getAttribute('content') || '';

    document.title = 'About Sangharsh Classes | SSC, Railway & Banking Coaching in Muzaffarpur';
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', 'Learn about Sangharsh Classes, a trusted SSC, Railway and Banking coaching institute in Muzaffarpur with experienced faculty and proven results.');

    // Cleanup on unmount
    return () => {
      document.title = originalTitle;
      if (metaDescription && originalDescription) {
        metaDescription.setAttribute('content', originalDescription);
      }
    };
  }, []);

  return (
    <>
      <Header />
      <main className="pt-20">
        <section className="py-20 bg-gradient-to-b from-background to-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Page H1 Heading */}
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                  About Sangharsh Classes
                </h1>
                <div className="w-24 h-1 bg-brand-primary mx-auto mb-8 rounded-full" />
              </div>

              {/* SEO Content */}
              <div className="bg-card rounded-2xl p-8 md:p-12 shadow-lg border border-border mb-8">
                <div className="space-y-6">
                  {about.seoDescription.map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-lg leading-relaxed text-foreground"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* Original Hindi Content */}
              <div className="bg-card rounded-2xl p-8 md:p-12 shadow-lg border border-border mb-8">
                <div className="space-y-6">
                  {about.paragraphs.map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-lg leading-relaxed text-foreground"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* Feature Card - Result Oriented Only */}
              <div className="flex justify-center">
                <div className="bg-card rounded-xl p-6 shadow-md border border-border hover:shadow-lg transition-shadow max-w-sm w-full">
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className="w-14 h-14 rounded-full bg-brand-primary/10 flex items-center justify-center">
                      <Target className="w-7 h-7 text-brand-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">
                      {about.feature.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {about.feature.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </main>
      <WhatsAppButton />
    </>
  );
}

export default AboutPage;
