"use client";
import { SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "./ui/dialog";
import { useEffect, useState } from "react";
import { SearchBox } from "@/app/admin/Components/Search";

export const SearchClient = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.code === "KeyK") {
        event.preventDefault();
        setDialogOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <Button variant="outline" onClick={() => setDialogOpen(true)}>
          <div className="md:flex justify-between items-center hidden w-48">
            <div className="flex gap-2">
              <SearchIcon className="h-[1.2rem] w-[1.2rem]" />
              Search...
            </div>
            <kbd className="bg-white/10 p-1 rounded-sm text-xs leading-3">
              Ctrl K
            </kbd>
          </div>
          <div className="block md:hidden">
            <SearchIcon className="h-[1.2rem] w-[1.2rem]" />
          </div>
        </Button>
        <DialogContent className="p-0 max-w-2xl border-none top-[10vh] md:top-[20vh] translate-y-0">
          <SearchBox setDialogOpen={setDialogOpen} />
        </DialogContent>
      </Dialog>
    </>
  );
};
