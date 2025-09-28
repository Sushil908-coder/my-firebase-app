'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { getCourseRecommendations } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import type { Course } from '@/lib/types';
import CourseCard from '@/components/courses/CourseCard';
import { Loader2, Sparkles, Lightbulb } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

const recommendationSchema = z.object({
  userInterests: z.string().min(10, 'Please describe your interests in a bit more detail.'),
  learningHistory: z.string().optional(),
});

type RecommendationFormValues = z.infer<typeof recommendationSchema>;

interface RecommendationResult {
  recommendedCourses: Course[];
  reasoning: string;
}

export default function RecommendationEngine() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<RecommendationResult | null>(null);
  const { toast } = useToast();

  const form = useForm<RecommendationFormValues>({
    resolver: zodResolver(recommendationSchema),
    defaultValues: {
      userInterests: '',
      learningHistory: '',
    },
  });

  const onSubmit = (values: RecommendationFormValues) => {
    setResult(null);
    startTransition(async () => {
      const response = await getCourseRecommendations(values);
      if (response.error) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: response.error,
        });
      } else if (response.recommendedCourses) {
        setResult({
            recommendedCourses: response.recommendedCourses,
            reasoning: response.reasoning || "Here are some courses you might like based on your interests."
        });
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="shadow-xl rounded-2xl">
        <CardContent className="p-6 sm:p-10">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="userInterests"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-headline">Your Interests</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., 'I'm interested in building fast websites, modern design, and data visualization.'"
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Describe your interests, hobbies, or career goals. The more detail, the better!
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="learningHistory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-headline">Previous Courses (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., 'Introduction to Python, Basic HTML/CSS'"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      List any relevant courses you've taken before.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="text-center">
                <Button type="submit" disabled={isPending} size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                  {isPending ? (
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  ) : (
                    <Sparkles className="mr-2 h-5 w-5" />
                  )}
                  Get Recommendations
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {isPending && (
        <div className="mt-12 text-center">
            <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
            <p className="mt-4 text-lg font-semibold">Our AI is thinking...</p>
            <p className="text-muted-foreground">Crafting your personalized learning path.</p>
        </div>
      )}

      {result && (
        <div className="mt-12">
            <h3 className="text-3xl font-headline font-bold text-center mb-8">Your Recommended Courses</h3>
            {result.reasoning && (
                <Alert className="mb-8 bg-primary/5 border-primary/20">
                    <Lightbulb className="h-5 w-5 text-primary" />
                    <AlertTitle className="font-headline text-primary">AI Recommendation Insights</AlertTitle>
                    <AlertDescription>
                        {result.reasoning}
                    </AlertDescription>
                </Alert>
            )}
            {result.recommendedCourses.length > 0 ? (
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {result.recommendedCourses.map((course) => (
                        <CourseCard key={course.id} course={course} />
                    ))}
                </div>
            ) : (
                <p className="text-center text-muted-foreground">No specific courses found based on your input. Try broadening your interests!</p>
            )}
        </div>
      )}
    </div>
  );
}
