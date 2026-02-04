import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, CheckCircle } from 'lucide-react';
import { marketingSiteContent } from '@/content/marketingSiteContent';

const Courses = () => {
  const { courses, coursesExtra } = marketingSiteContent;

  return (
    <section id="courses" className="py-20 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Our <span className="text-brand-primary">Courses</span>
            </h2>
            <div className="w-24 h-1 bg-brand-primary mx-auto mb-6 rounded-full" />
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive programs designed for board exam preparation and conceptual excellence
            </p>
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {courses.map((course) => (
              <Card
                key={course.id}
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-brand-primary/50 bg-card"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <BookOpen className="h-8 w-8 text-brand-primary flex-shrink-0" />
                    <Badge variant="outline" className="border-brand-primary text-brand-primary">
                      {course.name}
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl group-hover:text-brand-primary transition-colors">
                    {course.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 min-h-[3rem]">{course.description}</p>
                  <div className="space-y-2">
                    {course.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-brand-secondary flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional Info */}
          <div className="bg-gradient-to-r from-brand-primary to-brand-secondary rounded-3xl p-8 md:p-12 text-center text-white shadow-2xl">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              {coursesExtra.heading}
            </h3>
            <p className="text-lg md:text-xl mb-6 text-white/90 max-w-3xl mx-auto">
              {coursesExtra.description}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {coursesExtra.subjects.map((subject, idx) => (
                <div key={idx} className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                  <span className="font-semibold">{subject}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Courses;
