import { notFound } from 'next/navigation';
import Image from 'next/image';
import { instructors, courses } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import CourseCard from '@/components/courses/CourseCard';
import { Mail, Star } from 'lucide-react';

type Props = {
  params: { id: string };
};

export function generateStaticParams() {
  return instructors.map((instructor) => ({
    id: instructor.id,
  }));
}

export async function generateMetadata({ params }: Props) {
  const instructor = instructors.find((i) => i.id === params.id);
  if (!instructor) {
    return { title: 'Instructor Not Found' };
  }
  return {
    title: `${instructor.name} | CourseMaestro`,
    description: instructor.bio,
  };
}

export default function InstructorDetailPage({ params }: Props) {
  const instructor = instructors.find((i) => i.id === params.id);
  if (!instructor) {
    notFound();
  }

  const instructorCourses = courses.filter((c) => c.instructorId === instructor.id);
  const instructorImage = PlaceHolderImages.find((img) => img.id === instructor.avatarId);

  return (
    <div>
      <div className="bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {instructorImage && (
              <Image
                src={instructorImage.imageUrl}
                alt={instructor.name}
                width={200}
                height={200}
                className="rounded-full shadow-2xl border-8 border-background"
                data-ai-hint={instructorImage.imageHint}
              />
            )}
            <div className="text-center md:text-left">
              <h1 className="text-4xl sm:text-5xl font-headline font-bold">{instructor.name}</h1>
              <p className="text-lg text-accent font-semibold mt-1">{instructor.expertise[0]}</p>
              <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-2">
                {instructor.expertise.map((exp, i) => (
                  <Badge key={i} variant="secondary">{exp}</Badge>
                ))}
              </div>
              <a href={`mailto:${instructor.email}`} className="inline-flex items-center mt-4 text-primary hover:text-accent transition-colors">
                <Mail className="h-5 w-5 mr-2" />
                <span>{instructor.email}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-headline font-bold mb-2">About {instructor.name}</h2>
            <p className="text-lg text-muted-foreground whitespace-pre-line leading-relaxed">
                {instructor.bio}
            </p>
        </div>
        
        <div className="mt-16">
            <h2 className="text-3xl font-headline font-bold text-center mb-8">Courses by {instructor.name}</h2>
            {instructorCourses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {instructorCourses.map((course) => (
                        <CourseCard key={course.id} course={course} />
                    ))}
                </div>
            ) : (
                <p className="text-center text-muted-foreground">This instructor does not have any courses yet.</p>
            )}
        </div>
      </div>
    </div>
  );
}
