export interface Course {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  instructorId: string;
  category: string;
  learningObjectives: string[];
  syllabus: { week: number; topic: string; content: string }[];
  materials: string[];
  imageId: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface Instructor {
  id: string;
  name: string;
  bio: string;
  expertise: string[];
  avatarId: string;
  email: string;
}
