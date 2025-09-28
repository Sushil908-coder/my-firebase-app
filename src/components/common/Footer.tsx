import { BookOpenCheck } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-primary/95 text-primary-foreground mt-auto">
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-center space-x-2">
            <BookOpenCheck className="h-7 w-7" />
            <span className="text-xl font-headline font-semibold">CourseMaestro</span>
          </div>
          <div>
            <h3 className="font-headline text-lg font-semibold mb-2">Navigate</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-accent transition-colors">Home</Link></li>
              <li><Link href="/courses" className="hover:text-accent transition-colors">Courses</Link></li>
              <li><Link href="/instructors" className="hover:text-accent transition-colors">Instructors</Link></li>
            </ul>
          </div>
           <div>
            <h3 className="font-headline text-lg font-semibold mb-2">Connect</h3>
            <p>123 Learning Lane, Knowledge City</p>
            <p>contact@coursemaestro.com</p>
          </div>
        </div>
        <div className="border-t border-primary-foreground/20 mt-8 pt-6 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} CourseMaestro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
