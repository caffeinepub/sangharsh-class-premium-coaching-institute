import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, Award } from 'lucide-react';
import { marketingSiteContent } from '@/content/marketingSiteContent';

const Faculty = () => {
  const { faculty } = marketingSiteContent;

  return (
    <section id="faculty" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Our <span className="text-brand-primary">Expert Faculty</span>
            </h2>
            <div className="w-24 h-1 bg-brand-primary mx-auto mb-6 rounded-full" />
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Learn from experienced educators dedicated to your success
            </p>
          </div>

          {/* Faculty Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {faculty.map((member, index) => (
              <Card
                key={index}
                className="group overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-brand-primary/50 bg-card"
              >
                {/* Faculty Image */}
                <div className="relative h-80 overflow-hidden bg-gradient-to-br from-brand-primary/20 to-brand-secondary/20">
                  <img
                    src={member.photoUrl}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Subject Badge */}
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-brand-primary text-white font-bold px-4 py-2 text-sm shadow-lg">
                      {member.subject}
                    </Badge>
                  </div>
                </div>

                {/* Faculty Info */}
                <CardContent className="p-6 bg-card">
                  <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-brand-primary transition-colors">
                    {member.name}
                  </h3>

                  <div className="flex items-center gap-2 mb-3">
                    <GraduationCap className="h-5 w-5 text-brand-primary flex-shrink-0" />
                    <span className="text-muted-foreground font-medium">{member.role}</span>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <Award className="h-5 w-5 text-brand-secondary flex-shrink-0" />
                    <span className="text-muted-foreground font-medium">
                      Experience: {member.experience}
                    </span>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <p className="text-sm text-muted-foreground">
                      {member.specialization}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faculty;
