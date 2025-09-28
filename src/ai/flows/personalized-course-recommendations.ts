// src/ai/flows/personalized-course-recommendations.ts
'use server';

/**
 * @fileOverview Provides personalized course recommendations based on user interests and learning history.
 *
 * @exports recommendCourses - A function to generate personalized course recommendations.
 * @exports CourseRecommendationInput - The input type for the recommendCourses function.
 * @exports CourseRecommendationOutput - The output type for the recommendCourses function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CourseRecommendationInputSchema = z.object({
  userInterests: z
    .string()
    .describe('A comma-separated list of the user\'s interests.'),
  learningHistory: z
    .string()
    .describe(
      'A comma-separated list of course titles the user has previously taken.'
    ),
  availableCourses: z
    .string()
    .describe(
      'A comma-separated list of available course titles and descriptions.'
    ),
});
export type CourseRecommendationInput = z.infer<
  typeof CourseRecommendationInputSchema
>;

const CourseRecommendationOutputSchema = z.object({
  recommendedCourses: z
    .string()
    .describe(
      'A comma-separated list of course titles recommended to the user.'
    ),
  reasoning: z
    .string()
    .describe('The reasoning behind the course recommendations.'),
});
export type CourseRecommendationOutput = z.infer<
  typeof CourseRecommendationOutputSchema
>;

export async function recommendCourses(
  input: CourseRecommendationInput
): Promise<CourseRecommendationOutput> {
  return recommendCoursesFlow(input);
}

const recommendCoursesPrompt = ai.definePrompt({
  name: 'recommendCoursesPrompt',
  input: {schema: CourseRecommendationInputSchema},
  output: {schema: CourseRecommendationOutputSchema},
  prompt: `You are a course recommendation expert. Based on the user's interests and learning history, recommend courses from the available courses.

User Interests: {{{userInterests}}}
Learning History: {{{learningHistory}}}
Available Courses: {{{availableCourses}}}

Consider the user's interests and learning history to provide personalized course recommendations. Explain your reasoning for recommending each course.

Format your response as a comma-separated list of course titles, followed by a detailed explanation of your reasoning in the reasoning field.
`,
});

const recommendCoursesFlow = ai.defineFlow(
  {
    name: 'recommendCoursesFlow',
    inputSchema: CourseRecommendationInputSchema,
    outputSchema: CourseRecommendationOutputSchema,
  },
  async input => {
    const {output} = await recommendCoursesPrompt(input);
    return output!;
  }
);
