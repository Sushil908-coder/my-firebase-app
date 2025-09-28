import Link from 'next/link';
import Image from 'next/image';
import type { Course, Instructor } from '@/lib/types';
import { instructors } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Clock, User, BarChart } from 'lucide-react';
import { Button } from '../ui/button';

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  const instructor = instructors.find(i => i.id === course.instructorId);
  const courseImage = PlaceHolderImages.find(img => img.id === course.imageId);
  const instructorImage = PlaceHolderImages.find(img => img.id === instructor?.avatarId);

  return (
    <Card className="flex flex-col overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
      <CardHeader className="p-0">
        <Link href={`/courses/${course.id}`} className="block relative">
          {courseImage && (
            <Image
              src={courseImage.imageUrl}
              alt={courseImage.description}
              width={600}
              height={400}
              className="w-full h-48 object-cover"
              data-ai-hint={courseImage.imageHint}
            />
          )}
           <div className="absolute top-4 right-4">
            <Badge variant="secondary" className="bg-accent text-accent-foreground">{course.category}</Badge>
          </div>
        </Link>
      </CardHeader>
      <CardContent className="flex-grow p-6">
        <CardTitle className="font-headline text-xl mb-2">
          <Link href={`/courses/${course.id}`} className="hover:text-primary transition-colors">{course.title}</Link>
        </CardTitle>
        <p className="text-muted-foreground text-sm line-clamp-3">{course.description}</p>
        
        <div className="mt-4 flex items-center text-sm text-muted-foreground space-x-4">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1.5" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center">
            <BarChart className="w-4 h-4 mr-1.5" />
            <span>{course.level}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0 flex justify-between items-center">
        {instructor && (
          <Link href={`/instructors/${instructor.id}`} className="flex items-center group">
            {instructorImage && (
              <Image
                src={instructorImage.imageUrl}
                alt={instructor.name}
                width={32}
                height={32}
                className="rounded-full mr-2 border-2 border-transparent group-hover:border-accent transition-colors"
                data-ai-hint={instructorImage.imageHint}
              />
            )}
            <span className="text-sm font-medium group-hover:text-primary transition-colors">{instructor.name}</span>
          </Link>
        )}
        <Button asChild variant="ghost" size="sm" className="group">
          <Link href={`/courses/${course.id}`}>
            Details <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
