'use server';

import { recommendCourses } from '@/ai/flows/personalized-course-recommendations';
import { courses } from '@/lib/data';
import type { CourseRecommendationInput } from '@/ai/flows/personalized-course-recommendations';

export async function getCourseRecommendations(input: {
  userInterests: string;
  learningHistory: string;
}) {
  try {
    const availableCoursesString = courses
      .map(c => `${c.title}: ${c.description}`)
      .join('; ');

    const recommendationInput: CourseRecommendationInput = {
      ...input,
      availableCourses: availableCoursesString,
    };

    const result = await recommendCourses(recommendationInput);
    
    if (!result || !result.recommendedCourses) {
        return { error: 'Could not generate recommendations. The model returned an unexpected response.' };
    }
    
    const recommendedCourseTitles = result.recommendedCourses.split(',').map(t => t.trim());
    const recommendedCoursesDetails = courses.filter(c => recommendedCourseTitles.includes(c.title));

    return {
      recommendedCourses: recommendedCoursesDetails,
      reasoning: result.reasoning,
    };

  } catch (error) {
    console.error('Error getting course recommendations:', error);
    return { error: 'Failed to get recommendations. Please try again.' };
  }
}
