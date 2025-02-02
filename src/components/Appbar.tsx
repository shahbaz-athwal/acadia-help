import { GraduationCap } from "lucide-react";
import Link from "next/link";
import { SearchClient } from "./SearchClient";
import { getAllResults } from "@/actions/searchQuery";
import { unstable_cache } from "next/cache";

const getCachedResults = unstable_cache(async () => getAllResults(), [], {
  tags: ["search"],
});

export const Appbar = async () => {
  const results = await getCachedResults();
  return (
    <div className="p-3 px-8 bg-zinc-900 flex justify-center border-b shadow-md top-0 z-50">
      <div className="max-w-(--breakpoint-xl) flex justify-between w-full items-center">
        <Link href={"/"} className="flex items-center gap-3">
          <GraduationCap className="h-12 w-12" />
          <div className="text-zinc-100 text-2xl sm:text-3xl font-semibold">
            RateMyAxe
          </div>
        </Link>
        <SearchClient initialResults={results} />
      </div>
    </div>
  );
};
