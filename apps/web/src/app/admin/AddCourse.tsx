"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { addCourse } from "@/lib/dbQueries";
import { useState } from "react";

const AddCourse = () => {
  const [courseCode, setCourseCode] = useState("");
  const [courseName, setCourseName] = useState("");
  const [description, setDescription] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await addCourse({
      courseCode,
      courseName,
      department: { connect: { prefix: courseCode.slice(0, 4) } },
      description,
    });
    setIsSubmitting(false);
    setIsDialogOpen(false);
  };

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button
            onClick={() => setIsDialogOpen(true)}
            className="w-full"
            variant={"outline"}
          >
            Add Course
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Course</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="max-w-2xl space-y-3">
            <div>
              <Label htmlFor="courseCode">Course Code</Label>
              <Input
                id="courseCode"
                type="text"
                value={courseCode}
                onChange={(e) => setCourseCode(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="courseName">Course Name</Label>
              <Input
                id="courseName"
                type="text"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="w-full flex justify-end gap-8 pt-6">
              <DialogClose asChild>
                <Button variant={"outline"} disabled={isSubmitting}>
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isSubmitting}>
                Save
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddCourse;
