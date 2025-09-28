import { instructors } from '@/lib/data';
import InstructorCard from '@/components/instructors/InstructorCard';

export default function InstructorsPage() {
  return (
    <>
      <div className="bg-primary/10 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-headline font-bold">Our Instructors</h1>
          <p className="mt-2 text-lg max-w-2xl mx-auto text-muted-foreground">
            Learn from the best. Our instructors are industry experts passionate about teaching.
          </p>
        </div>
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {instructors.map((instructor) => (
            <InstructorCard key={instructor.id} instructor={instructor} />
          ))}
        </div>
      </div>
    </>
  );
}
