import { Target } from 'lucide-react';

const About = () => {
  const aboutText = `Sangharsh Classes ek trusted coaching institute hai, jahan students ko quality education ke saath strong results milte hain। Yahan padhne wale bahut se students ne achhe numbers se exams pass kiye hain aur apni academic performance ko kaafi improve kiya hai।

Hamari coaching ka main focus concept clear karna, regular practice aur result-oriented teaching par hota hai। Sangharsh Classes me 5 experienced aur dedicated teachers hain, jo har student par personal attention dete hain, taaki koi bhi bachcha padhai me pichhe na rahe।

Hum simple language me padhate hain, doubt clear classes rakhte hain aur students ko exam ke liye proper guidance, notes aur test practice dete hain। Yahi wajah hai ki parents aur students dono ka hum par bharosa bana hua hai।

Sangharsh Classes – Jahan mehnat ka milta hai sahi result.`;

  const paragraphs = aboutText.split('\n').filter(p => p.trim());

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              About Sangharsh Classes
            </h2>
            <div className="w-24 h-1 bg-brand-primary mx-auto mb-8 rounded-full" />
          </div>

          {/* Content */}
          <div className="bg-card rounded-2xl p-8 md:p-12 shadow-lg border border-border mb-8">
            <div className="space-y-6">
              {paragraphs.map((paragraph, index) => (
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
                  Result Oriented
                </h3>
                <p className="text-muted-foreground text-sm">
                  Our teaching methodology is focused on delivering excellent results and helping students achieve their academic goals.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
