"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createProfessor } from "@/lib/dbQueries";
import { Department } from "@prisma/client";

const AddProfessor = ({ departments }: { departments: Department[] }) => {
  const [professorName, setProfessorName] = useState("");
  const [department, setDepartment] = useState("");
  const [bio, setBio] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await createProfessor({
      name: professorName,
      department: { connect: { prefix: department } },
      bio,
    });
    setIsSubmitting(false);
    setIsDialogOpen(false);
  };

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <Button
          onClick={() => setIsDialogOpen(true)}
          className="w-full max-w-xl"
          variant={"outline"}
        >
          Add Professor
        </Button>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Professor</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="max-w-2xl space-y-3">
            <div>
              <Label htmlFor="professorName">Professor Name</Label>
              <Input
                id="professorName"
                type="text"
                value={professorName}
                onChange={(e) => setProfessorName(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="department">Department</Label>
              <Select onValueChange={setDepartment}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Departments</SelectLabel>
                    {departments.map((department) => (
                      <SelectItem
                        key={department.prefix}
                        value={department.prefix}
                      >
                        {department.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
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

export default AddProfessor;
