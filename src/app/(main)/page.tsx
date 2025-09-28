import Link from 'next/link';
import Image from 'next/image';
import { courses } from '@/lib/data';
import { Button } from '@/components/ui/button';
import CourseCard from '@/components/courses/CourseCard';
import RecommendationEngine from '@/components/recommendations/RecommendationEngine';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight } from 'lucide-react';

const featuredCourses = courses.slice(0, 3);
const heroImage = PlaceHolderImages.find(img => img.id === 'course-1');

export default function Home() {
  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="relative bg-primary/10 pt-16 pb-24 sm:pt-24 sm:pb-32 lg:pt-32 lg:pb-40">
        <div className="absolute inset-0 overflow-hidden">
          {heroImage && 
            <Image
              src={heroImage.imageUrl}
              alt="An engaging image showing people learning"
              fill
              className="object-cover"
              priority
              data-ai-hint="learning environment"
            />
          }
          <div className="absolute inset-0 bg-primary/70 mix-blend-multiply" />
        </div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center text-primary-foreground">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-headline tracking-tight">
            Unlock Your Potential
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg sm:text-xl lg:text-2xl font-body text-primary-foreground/90">
            Discover personalized learning paths with CourseMaestro. Master new skills with courses tailored just for you.
          </p>
          <div className="mt-8 flex justify-center">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 group">
              <Link href="/courses">
                Explore Courses <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-headline font-bold">Featured Courses</h2>
          <p className="mt-2 text-lg text-muted-foreground">Hand-picked courses to kickstart your learning journey.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>

      {/* Personalized Recommendations Section */}
      <section className="bg-card py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-headline font-bold">Find Your Perfect Course</h2>
            <p className="mt-2 text-lg text-muted-foreground">Let our AI guide you to the courses that match your goals and interests.</p>
          </div>
          <RecommendationEngine />
        </div>
      </section>
    </div>
  );
}
