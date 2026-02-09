import { SiFacebook, SiInstagram, SiYoutube } from 'react-icons/si';
import { marketingSiteContent } from '@/content/marketingSiteContent';

const Footer = () => {
  const { site, contact, footer } = marketingSiteContent;

  const socialIconMap = {
    SiFacebook,
    SiInstagram,
    SiYoutube,
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
                  src={site.logo}
                  alt={site.name}
                  className="h-12 w-12 object-contain bg-white rounded-full p-1"
                />
                <h3 className="text-2xl font-bold">{site.name}</h3>
              </div>
              <p className="text-white/90 leading-relaxed">
                {footer.description}
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {footer.quickLinks.map((link) => (
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
                {footer.social.map((social) => {
                  const IconComponent = socialIconMap[social.icon as keyof typeof socialIconMap];
                  return (
                    <a
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                      aria-label={social.platform}
                    >
                      <IconComponent className="h-5 w-5" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/20 pt-8 text-center">
            <p className="text-white/90">
              {footer.copyright}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
