import { Heart } from 'lucide-react';
import { SiFacebook, SiInstagram, SiYoutube } from 'react-icons/si';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const contact = {
    phone: '9262647420',
    email: 'govindofficial027@gmail.com',
    location: 'Speaker Chowk, Mai Sthan Gali, Muzaffarpur',
  };

  return (
    <footer className="bg-gradient-to-br from-brand-primary via-brand-secondary to-brand-accent text-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* About */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img
                  src="/assets/IMG-20260201-WA0000.jpg"
                  alt="Sangharsh Class"
                  className="h-12 w-12 object-contain bg-white rounded-full p-1"
                />
                <h3 className="text-2xl font-bold">Sangharsh Class</h3>
              </div>
              <p className="text-white/90 leading-relaxed">
                From Struggle to Success - Quality education for Class 7th to 12th with expert
                faculty and 100% result guarantee.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {['Home', 'About', 'Faculty', 'Courses', 'Contact'].map((link) => (
                  <li key={link}>
                    <a
                      href={`#${link.toLowerCase()}`}
                      className="text-white/90 hover:text-white hover:underline transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-xl font-bold mb-4">Contact Us</h3>
              <ul className="space-y-2 text-white/90">
                <li>Phone: +91 {contact.phone}</li>
                <li>Email: {contact.email}</li>
                <li>Location: {contact.location}</li>
              </ul>
              
              {/* Social Media */}
              <div className="flex gap-4 mt-4">
                <a
                  href="https://www.facebook.com/share/173TNduUtd/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                  aria-label="Facebook"
                >
                  <SiFacebook className="h-5 w-5" />
                </a>
                <a
                  href="https://www.instagram.com/rajooraushan?igsh=cmUycTB5ZmZ6MjRi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                  aria-label="Instagram"
                >
                  <SiInstagram className="h-5 w-5" />
                </a>
                <a
                  href="https://youtube.com/@sangharshclassesmuzaffarpur?si=qZaASH_gn1aY5Y8I"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                  aria-label="YouTube"
                >
                  <SiYoutube className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/20 pt-8 text-center">
            <p className="text-white/90 flex items-center justify-center gap-2 flex-wrap">
              © {currentYear}. Built with{' '}
              <Heart className="h-4 w-4 text-red-400 fill-red-400 inline" /> using{' '}
              <a
                href="https://caffeine.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold hover:underline"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
