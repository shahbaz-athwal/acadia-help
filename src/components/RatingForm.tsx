"use client";

import { reviewSchema } from "@/lib/reviewSchema";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { grades } from "@/lib/constants";
import RatingSelector from "@/components/RatingSelector";
import { createRating } from "@/lib/dbQueries";
import { useRouter } from "next/navigation";

interface EntityRateProps {
  id: string | number;
  name?: string;
  courseName?: string;
  courseCode?: string;
  professors?: {
    id: number;
    name: string;
  }[];
  image?: string | null;
  courses?: {
    id: string;
    courseCode: string;
    courseName: string;
  }[];
}

export default function RatingForm({
  entityData,
  entity,
  id,
}: {
  entityData: EntityRateProps;
  entity: string;
  id: string;
}) {
  const router = useRouter();

  const form = useForm<z.infer<typeof reviewSchema>>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      wouldTakeAgain: false,
      bookRequired: false,
      attendance: false,
      professorId: entity === "professor" ? Number(id) : undefined,
      courseId: entity === "course" ? id : undefined,
    },
  });

  const onSubmit = async (data: z.infer<typeof reviewSchema>) => {
    await createRating(data);
  };

  if (form.formState.isSubmitSuccessful) {
    router.push(`/${entity}/${id}`);
  }

  return (
    <div className="max-w-2xl mx-auto py-12">
      <h2 className="text-4xl mb-8 text-center">
        Rate: {entity === "course" ? entityData?.courseName : entityData?.name}
      </h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {entity === "professor" ? (
            <FormField
              name="courseId"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">
                    What course did you take?
                  </FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a course" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-zinc-900">
                      {entityData?.courses?.map((course) => {
                        return (
                          <SelectItem key={course.id} value={course.id}>
                            {course.courseCode} - {course.courseName}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : (
            <FormField
              name="professorId"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">
                    Who was your professor?
                  </FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(Number(value))}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a professor" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-zinc-900">
                      {entityData?.professors?.map((professor) => {
                        return (
                          <SelectItem
                            key={professor.id}
                            value={String(professor.id)}
                          >
                            {professor.name}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            name="quality"
            control={form.control}
            render={() => (
              <FormItem>
                <FormLabel className="text-lg">Overall Quality</FormLabel>
                <RatingSelector name="quality" control={form.control} />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="difficulty"
            control={form.control}
            render={() => (
              <FormItem>
                <FormLabel className="text-lg">Difficulty Level</FormLabel>
                <RatingSelector name="difficulty" control={form.control} />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="message"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Feedback</FormLabel>
                <Textarea
                  {...field}
                  className="w-full p-2 border rounded"
                  rows={4}
                  placeholder="Leave your feedback"
                ></Textarea>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="grade"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Grade</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="max-w-[170px]">
                      <SelectValue placeholder="Select a grade" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-[280px] bg-zinc-900">
                    {grades.map((grade) => {
                      return (
                        <SelectItem key={grade} value={grade}>
                          {grade}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {entity === "professor" && (
            <FormField
              name="wouldTakeAgain"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <Checkbox
                    checked={field.value!}
                    onCheckedChange={field.onChange}
                  />
                  <FormLabel className="text-lg font-light ml-3">
                    Would you take this professor again?
                  </FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            name="bookRequired"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
                <FormLabel className="text-lg font-light ml-3">
                  Was a book required?
                </FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="attendance"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
                <FormLabel className="text-lg font-light ml-3">
                  Was attendance mandatory?
                </FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-center">
            <Button disabled={form.formState.isSubmitting} type="submit">
              {form.formState.isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting
                </>
              ) : (
                "Submit"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
