import { GraduationCap } from "lucide-react";
import Link from "next/link";
import { SearchClient } from "./SearchClient";
export const Appbar = () => {
  return (
    <div className="p-3 px-8 bg-zinc-900 flex justify-center border-b shadow-md top-0 z-50">
      <div className="max-w-screen-xl flex justify-between w-full items-center">
        <Link href={"/"} className="flex items-center gap-3">
          <GraduationCap className="h-12 w-12" />
          <div className="text-zinc-100 text-4xl font-semibold">RateMyAxe</div>
        </Link>
        <SearchClient />
      </div>
    </div>
  );
};
