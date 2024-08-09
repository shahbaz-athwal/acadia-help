import RenderNotion from "@/components/RenderNotion";
import ReviewCard from "@/components/ReviewCard";
import { ReviewChart } from "@/components/ReviewChart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getDetailedCourseById } from "@/lib/dbQueries";
import { getNotionPage } from "@/lib/notion-client-utils";
import { showNotionPage } from "@/lib/notion-hq";
import Link from "next/link";

async function Page({ params }: { params: { id: string } }) {
  const { course, avgDifficulty, avgQuality, ratingCount, ratingDistribution } =
    await getDetailedCourseById(params.id);

  const showPage = await showNotionPage(course?.docId!);
  const docId = showPage && (await getNotionPage(course?.docId!));

  return (
    <div className="max-w-3xl mx-auto p-3 mt-10">
      <div>
        <div className="flex">
          <div className="text-7xl">{avgQuality}</div>
          <div className="pt-1 pl-2">/5</div>
        </div>
        Overall Rating Based on {ratingCount} feedbacks
      </div>
      <div className="flex items-center space-x-3 py-6">
        <div>
          <h1 className="text-3xl sm:text-4xl font-semibold">
            {course!.courseCode} - {course!.courseName}
          </h1>
        </div>
      </div>
      <div className="flex items-center">
        <div className="mt-2 border-r pr-6 mr-6 text-center">
          <span className="mx-auto font-bold text-xl">{avgDifficulty}</span>
          <h2 className="text-sm mb-2 text-zinc-400">Level of Difficulty</h2>
        </div>
        <Link
          href={`/rate/course/${course!.id}`}
          className="group bg-zinc-50 mb-2 hover:bg-zinc-200 transition-colors inline-block mt-4 font-mono text-xs sm:text-sm font-semibold rounded-full px-8 py-3 text-black"
        >
          Rate This Course{" "}
          <span className="inline-block group-hover:translate-x-2 transition-transform">
            {">"}
          </span>
        </Link>
      </div>

      <Tabs defaultValue="reviews" className="w-full pt-12">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
          <TabsTrigger value="notion">Doc</TabsTrigger>
        </TabsList>
        <TabsContent
          value="reviews"
          className="flex flex-col items-center space-y-3 pt-4"
        >
          <ReviewChart ratingCount={ratingDistribution} type="difficulty" />
          <div className="pt-12">
            <h2 className="text-lg text-center font-semibold mb-6">
              {ratingCount} Student Ratings
            </h2>
            <ul className="space-y-4">
              {course!.feedbacks.map((feedback, index) => (
                <ReviewCard key={index} feedback={feedback} />
              ))}
            </ul>
          </div>
        </TabsContent>
        <TabsContent value="notion">
          {showPage && <RenderNotion recordMap={docId} />}
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Page;
