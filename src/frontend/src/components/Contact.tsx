import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import { marketingSiteContent } from '@/content/marketingSiteContent';

const Contact = () => {
  const { contact } = marketingSiteContent;

  const handleWhatsApp = () => {
    window.open(`https://wa.me/91${contact.phone}`, '_blank');
  };

  const handleCall = () => {
    window.location.href = `tel:+91${contact.phone}`;
  };

  const handleEmail = () => {
    window.location.href = `mailto:${contact.email}`;
  };

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Get in <span className="text-brand-primary">Touch</span>
            </h2>
            <div className="w-24 h-1 bg-brand-primary mx-auto mb-6 rounded-full" />
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Ready to start your journey to success? Contact us today!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div className="space-y-6">
              <Card className="border-2 hover:border-brand-primary/50 transition-all hover:shadow-xl bg-card">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center">
                      <Phone className="h-6 w-6 text-brand-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-bold text-foreground mb-2">Phone / WhatsApp</h3>
                      <a
                        href={`tel:+91${contact.phone}`}
                        className="text-lg text-brand-primary hover:underline font-semibold block break-all"
                      >
                        +91 {contact.phone}
                      </a>
                      <div className="flex flex-wrap gap-2 mt-3">
                        <Button
                          size="sm"
                          onClick={handleCall}
                          className="bg-brand-primary hover:bg-brand-primary/90 text-white"
                        >
                          Call Now
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={handleWhatsApp}
                          className="border-brand-primary text-brand-primary hover:bg-brand-primary/10"
                        >
                          <MessageCircle className="h-4 w-4 mr-2" />
                          WhatsApp
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-brand-primary/50 transition-all hover:shadow-xl bg-card">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-brand-secondary/10 flex items-center justify-center">
                      <Mail className="h-6 w-6 text-brand-secondary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-bold text-foreground mb-2">Email</h3>
                      <a
                        href={`mailto:${contact.email}`}
                        className="text-lg text-brand-secondary hover:underline font-semibold break-all block"
                      >
                        {contact.email}
                      </a>
                      <Button
                        size="sm"
                        onClick={handleEmail}
                        className="mt-3 bg-brand-secondary hover:bg-brand-secondary/90 text-white"
                      >
                        Send Email
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-brand-primary/50 transition-all hover:shadow-xl bg-card">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-brand-accent/10 flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-brand-accent" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-bold text-foreground mb-2">Location</h3>
                      <p className="text-lg text-muted-foreground break-words">{contact.location}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Map or Image */}
            <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl border-2 border-border">
              <img
                src={contact.backgroundImage}
                alt="Academic Success"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end">
                <div className="p-8 text-white w-full">
                  <h3 className="text-3xl font-bold mb-2">Visit Us Today!</h3>
                  <p className="text-lg text-white/90 mb-4">
                    Experience quality education and meet our expert faculty
                  </p>
                  <Button
                    size="lg"
                    onClick={handleWhatsApp}
                    className="bg-white text-brand-primary hover:bg-white/90 font-bold"
                  >
                    Schedule a Visit
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
