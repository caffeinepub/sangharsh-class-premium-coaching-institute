import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DownloadWebsiteCodeButton = () => {
  const handleDownload = () => {
    // Download the pre-generated ZIP file from static assets
    const link = document.createElement('a');
    link.href = '/website-code.zip';
    link.download = 'sangharsh-classes-website.zip';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Button
      onClick={handleDownload}
      variant="outline"
      className="font-medium transition-colors hover:bg-brand-primary hover:text-white border-2"
    >
      <Download className="h-4 w-4 mr-2" />
      Download Website Code
    </Button>
  );
};

export default DownloadWebsiteCodeButton;
