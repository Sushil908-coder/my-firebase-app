import Link from 'next/link';
import Image from 'next/image';
import type { Instructor } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';

interface InstructorCardProps {
  instructor: Instructor;
}

export default function InstructorCard({ instructor }: InstructorCardProps) {
  const instructorImage = PlaceHolderImages.find(img => img.id === instructor.avatarId);

  return (
    <Card className="text-center flex flex-col items-center p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
      <CardHeader className="p-0">
        <Link href={`/instructors/${instructor.id}`}>
          {instructorImage && (
            <Image
              src={instructorImage.imageUrl}
              alt={instructor.name}
              width={128}
              height={128}
              className="rounded-full mx-auto border-4 border-background shadow-lg"
              data-ai-hint={instructorImage.imageHint}
            />
          )}
        </Link>
        <CardTitle className="font-headline text-2xl mt-4">
          <Link href={`/instructors/${instructor.id}`} className="hover:text-primary transition-colors">
            {instructor.name}
          </Link>
        </CardTitle>
        <p className="text-sm text-accent font-semibold">{instructor.expertise[0]}</p>
      </CardHeader>
      <CardContent className="mt-4 flex-grow">
        <p className="text-muted-foreground text-sm line-clamp-4">{instructor.bio}</p>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {instructor.expertise.slice(0, 3).map((exp, i) => (
            <Badge key={i} variant="secondary">{exp}</Badge>
          ))}
        </div>
      </CardContent>
      <div className="mt-auto pt-4">
        <Button asChild variant="outline" className="group">
           <Link href={`/instructors/${instructor.id}`}>
            View Profile <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>
    </Card>
  );
}
