import { Award, TrendingUp, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/generated/hero-banner.dim_1200x600.jpg"
          alt="Academic Success"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/90 via-brand-secondary/85 to-brand-accent/90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Heading */}
          <div className="mb-6 animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-4 leading-tight tracking-tight">
              From Struggle to Success
            </h1>
            <p className="text-2xl md:text-3xl text-white/90 font-medium italic">
              संघर्ष से सफलता तक
            </p>
          </div>

          {/* Guarantee Badge */}
          <div className="inline-flex items-center gap-3 bg-white/95 backdrop-blur-sm px-8 py-4 rounded-full shadow-2xl mb-8 animate-bounce-slow">
            <Award className="h-8 w-8 text-brand-primary" />
            <span className="text-2xl font-bold text-brand-primary">100% Result Guarantee</span>
          </div>

          {/* Description */}
          <p className="text-xl md:text-2xl text-white/95 mb-10 leading-relaxed max-w-3xl mx-auto font-medium">
            Quality Education for Class 7th to 12th with Expert Faculty and Result-Oriented Teaching
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="lg"
              onClick={scrollToContact}
              className="bg-white text-brand-primary hover:bg-white/90 text-lg px-8 py-6 rounded-full shadow-xl font-bold transition-all hover:scale-105"
            >
              Enroll Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => {
                const element = document.getElementById('courses');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-brand-primary text-lg px-8 py-6 rounded-full font-bold transition-all hover:scale-105"
            >
              View Courses
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all">
              <Users className="h-10 w-10 text-white mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">500+</div>
              <div className="text-white/90 font-medium">Students Enrolled</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all">
              <Award className="h-10 w-10 text-white mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">4+ Years</div>
              <div className="text-white/90 font-medium">Teaching Excellence</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all">
              <TrendingUp className="h-10 w-10 text-white mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">100%</div>
              <div className="text-white/90 font-medium">Result Oriented</div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
};

export default Hero;
