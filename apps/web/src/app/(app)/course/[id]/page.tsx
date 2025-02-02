import CourseTabs from "@/components/CourseTabs";
import { getDetailedCourseById } from "@/lib/dbQueries";
import Link from "next/link";

// export async function generateStaticParams() {
//   const courses = await getAllCourses();
//   const allPages = courses.map((course) => {
//     return course.id;
//   });
//   return allPages;
// }

async function Page({ params }: { params: { id: string } }) {
  const { course, avgDifficulty, avgQuality, ratingCount, ratingDistribution } =
    await getDetailedCourseById(params.id);
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

      <CourseTabs
        ratingCount={ratingCount}
        ratingDistribution={ratingDistribution}
        feedbacks={course!.feedbacks}
        docId={course?.docId!}
      />
    </div>
  );
}

export default Page;
