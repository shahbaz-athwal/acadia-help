"use client";

import { reviewSchema } from "@/lib/reviewSchema";
import { notFound } from "next/navigation";
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
import { grades } from "@/lib/grades";
import RatingSelector from "@/components/RatingSelector";

export function Page({ params }: { params: { entity: string; id: string } }) {
  if (params.entity !== "course" && params.entity !== "professor") {
    notFound();
  }

  const form = useForm<z.infer<typeof reviewSchema>>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      wouldTakeAgain: false,
      bookRequired: false,
      attendance: false,
    },
  });

  const onSubmit = async (data: z.infer<typeof reviewSchema>) => {
    console.log(data);
  };

  return (
    <div className="max-w-2xl mx-auto pt-12">
      <h2 className="text-4xl font-bold mb-8 text-center">Rate</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            name="courseCode"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">
                  What course did you take?
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a course" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-zinc-900">
                    <SelectItem value="COMP1123d">COMP1123</SelectItem>
                    <SelectItem value="COMP1123dd">COMP1143</SelectItem>
                    <SelectItem value="COMP112ddd3">COMP1233</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="professorId"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Professor</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a professor" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-zinc-900">
                    <SelectItem value="COMP1123d">COMP1123</SelectItem>
                    <SelectItem value="COMP1123dd">COMP1143</SelectItem>
                    <SelectItem value="COMP112ddd3">COMP1233</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="quality"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Quality</FormLabel>
                <RatingSelector name="quality" control={form.control} />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="difficulty"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Difficulty</FormLabel>
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

          <FormField
            name="bookRequired"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <Checkbox
                  checked={field.value!}
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
                  checked={field.value!}
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

export default Page;
