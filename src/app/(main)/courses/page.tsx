import { courses, instructors } from '@/lib/data';
import CourseListings from '@/components/courses/CourseListings';

export default function CoursesPage() {
  const categories = [...new Set(courses.map((course) => course.category))];

  return (
    <>
      <div className="bg-primary/10 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-headline font-bold">Explore Our Courses</h1>
          <p className="mt-2 text-lg max-w-2xl mx-auto text-muted-foreground">
            Find the perfect course to advance your skills and career.
          </p>
        </div>
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <CourseListings allCourses={courses} allInstructors={instructors} categories={categories} />
      </div>
    </>
  );
}
