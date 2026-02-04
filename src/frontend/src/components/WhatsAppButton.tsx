import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const WhatsAppButton = () => {
  const contact = {
    phone: '9262647420',
  };

  const handleWhatsApp = () => {
    window.open(`https://wa.me/91${contact.phone}`, '_blank');
  };

  return (
    <Button
      onClick={handleWhatsApp}
      size="lg"
      className="fixed bottom-6 right-6 z-40 h-16 w-16 rounded-full shadow-2xl bg-[#25D366] hover:bg-[#20BA5A] text-white p-0 animate-bounce-slow"
      aria-label="Contact on WhatsApp"
    >
      <MessageCircle className="h-8 w-8" />
    </Button>
  );
};

export default WhatsAppButton;
