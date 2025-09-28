import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { courses, instructors } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { CheckCircle2, BookOpen, Clock, BarChart, User, Target, ListChecks, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Props = {
  params: { id: string };
};

export function generateStaticParams() {
  return courses.map((course) => ({
    id: course.id,
  }));
}

export async function generateMetadata({ params }: Props) {
  const course = courses.find((c) => c.id === params.id);
  if (!course) {
    return { title: 'Course Not Found' };
  }
  return {
    title: `${course.title} | CourseMaestro`,
    description: course.description,
  };
}

export default function CourseDetailPage({ params }: Props) {
  const course = courses.find((c) => c.id === params.id);
  if (!course) {
    notFound();
  }

  const instructor = instructors.find((i) => i.id === course.instructorId);
  const courseImage = PlaceHolderImages.find((img) => img.id === course.imageId);
  const instructorImage = PlaceHolderImages.find((img) => img.id === instructor?.avatarId);

  return (
    <div>
      {/* Hero */}
      <div className="relative bg-primary/10 py-20 sm:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 z-10 relative">
            <div className="max-w-3xl">
                <Badge variant="secondary" className="mb-4 bg-accent text-accent-foreground">{course.category}</Badge>
                <h1 className="text-4xl sm:text-5xl font-headline font-bold text-foreground">{course.title}</h1>
                <p className="mt-4 text-lg text-muted-foreground">{course.description}</p>
                {instructor && (
                <div className="mt-6">
                    <Link href={`/instructors/${instructor.id}`} className="flex items-center group">
                        {instructorImage && (
                        <Image
                            src={instructorImage.imageUrl}
                            alt={instructor.name}
                            width={48}
                            height={48}
                            className="rounded-full mr-3 border-2 border-transparent group-hover:border-accent transition-colors"
                            data-ai-hint={instructorImage.imageHint}
                        />
                        )}
                        <div>
                            <p className="font-semibold group-hover:text-primary transition-colors">{instructor.name}</p>
                            <p className="text-sm text-muted-foreground">{instructor.expertise[0]}</p>
                        </div>
                    </Link>
                </div>
                )}
            </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="lg:col-span-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline flex items-center gap-2"><BookOpen className="h-6 w-6 text-primary"/>About this course</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="whitespace-pre-wrap font-body leading-relaxed">{course.longDescription}</p>
                    </CardContent>
                </Card>

                <div className="mt-8">
                  <h2 className="text-2xl font-headline font-bold mb-4 flex items-center gap-2"><ListChecks className="h-6 w-6 text-primary"/>Syllabus</h2>
                  <Accordion type="single" collapsible className="w-full">
                    {course.syllabus.map((item) => (
                      <AccordionItem key={item.week} value={`item-${item.week}`}>
                        <AccordionTrigger className="font-semibold text-left">Week {item.week}: {item.topic}</AccordionTrigger>
                        <AccordionContent>{item.content}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
            </div>
            <div className="lg:col-span-1 space-y-8">
              <Card className="shadow-lg sticky top-28">
                  {courseImage && (
                    <Image src={courseImage.imageUrl} alt={course.title} width={600} height={400} className="w-full h-auto rounded-t-lg" data-ai-hint={courseImage.imageHint} />
                  )}
                  <CardContent className="p-6 space-y-4">
                      <Button size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">Enroll Now</Button>
                      <div className="space-y-3 text-sm">
                        <div className="flex items-center gap-3"><Clock className="h-5 w-5 text-primary" /> <span><span className="font-semibold">Duration:</span> {course.duration}</span></div>
                        <div className="flex items-center gap-3"><BarChart className="h-5 w-5 text-primary" /> <span><span className="font-semibold">Level:</span> {course.level}</span></div>
                        <div className="flex items-center gap-3"><User className="h-5 w-5 text-primary" /> <span><span className="font-semibold">Instructor:</span> {instructor?.name}</span></div>
                      </div>
                  </CardContent>
              </Card>

              <Card>
                <CardHeader>
                    <CardTitle className="font-headline flex items-center gap-2"><Target className="h-6 w-6 text-primary"/>Learning Objectives</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-2">
                        {course.learningObjectives.map((obj, i) => (
                            <li key={i} className="flex items-start gap-2"><CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" /><span>{obj}</span></li>
                        ))}
                    </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                    <CardTitle className="font-headline flex items-center gap-2"><Package className="h-6 w-6 text-primary"/>Materials Included</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-2">
                        {course.materials.map((mat, i) => (
                            <li key={i} className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-green-600 shrink-0" /><span>{mat}</span></li>
                        ))}
                    </ul>
                </CardContent>
              </Card>
            </div>
        </div>
      </div>
    </div>
  );
}
