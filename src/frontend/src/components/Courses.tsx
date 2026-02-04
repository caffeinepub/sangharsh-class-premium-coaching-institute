import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, CheckCircle } from 'lucide-react';

const Courses = () => {
  const courses = [
    {
      courseId: 7,
      name: 'Class 7th',
      description: 'Foundation building with focus on core concepts in Mathematics, Science, and other subjects',
    },
    {
      courseId: 8,
      name: 'Class 8th',
      description: 'Strengthening fundamentals and developing problem-solving skills across all subjects',
    },
    {
      courseId: 9,
      name: 'Class 9th',
      description: 'Board exam preparation begins with comprehensive coverage of CBSE/State Board syllabus',
    },
    {
      courseId: 10,
      name: 'Class 10th',
      description: 'Intensive board exam preparation with regular tests and doubt-clearing sessions',
    },
    {
      courseId: 11,
      name: 'Class 11th',
      description: 'Advanced concepts in PCM with focus on competitive exam preparation alongside boards',
    },
    {
      courseId: 12,
      name: 'Class 12th',
      description: 'Final year board preparation with emphasis on scoring high marks and concept clarity',
    },
  ];

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
                key={course.courseId}
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
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-brand-secondary flex-shrink-0" />
                      <span className="text-muted-foreground">Expert Faculty</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-brand-secondary flex-shrink-0" />
                      <span className="text-muted-foreground">Board Exam Focus</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-brand-secondary flex-shrink-0" />
                      <span className="text-muted-foreground">Regular Tests</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional Info */}
          <div className="bg-gradient-to-r from-brand-primary to-brand-secondary rounded-3xl p-8 md:p-12 text-center text-white shadow-2xl">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Specialized Board Exam Preparation
            </h3>
            <p className="text-lg md:text-xl mb-6 text-white/90 max-w-3xl mx-auto">
              Our courses are meticulously designed to build strong conceptual foundations while
              ensuring excellent board exam results. We focus on both understanding and application.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                <span className="font-semibold">Mathematics</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                <span className="font-semibold">Physics</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                <span className="font-semibold">Chemistry</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Courses;
