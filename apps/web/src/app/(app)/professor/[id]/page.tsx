import ReviewCard from "@/components/ReviewCard";
import { ReviewChart } from "@/components/ReviewChart";
import { getDetailedProfessorById } from "@/lib/dbQueries";
import Image from "next/image";
import Link from "next/link";
import React from "react";

async function Page({ params }: { params: { id: string } }) {
  const {
    professor,
    avgDifficulty,
    avgQuality,
    ratingCount,
    ratingDistribution,
  } = await getDetailedProfessorById(params.id);

  return (
    <div className="max-w-3xl mx-auto p-3 mt-10">
      <div>
        <div className="flex">
          <div className="text-7xl">{avgQuality}</div>
          <div className="pt-1 pl-2">/5</div>
        </div>
        Overall Quality Based on {ratingCount} ratings
      </div>
      <div className="flex items-center space-x-3 py-6">
        {professor?.image && (
          <Image
            height={200}
            width={200}
            src={professor!.image}
            alt="professor"
            className="rounded-full object-cover h-20 w-20 shrink-0"
          />
        )}
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold">
            {professor!.name}
          </h1>
          <p className="text-md sm:text-lg font-medium text-zinc-500">
            Professor in Department of {professor!.department.name}
          </p>
        </div>
      </div>
      <div className="flex items-center">
        <div className="mt-2 border-r pr-6 mr-6 text-center">
          <span className="mx-auto font-bold text-xl">{avgDifficulty}</span>
          <h2 className="text-sm mb-2 text-zinc-400">Level of Difficulty</h2>
        </div>
        <Link
          href={`/rate/professor/${professor!.id}`}
          className="group bg-zinc-50 mb-2 hover:bg-zinc-200 transition-colors inline-block mt-4 font-mono text-xs sm:text-sm font-semibold rounded-full px-8 py-3 text-black"
        >
          Rate This Professor{" "}
          <span className="inline-block group-hover:translate-x-2 transition-transform">
            {">"}
          </span>
        </Link>
      </div>

      <ReviewChart ratingCount={ratingDistribution} type="quality" />

      <div className="pt-12">
        <h2 className="text-lg text-center font-semibold mb-6">
          {ratingCount} Student Ratings
        </h2>
        <ul className="space-y-4">
          {professor!.feedbacks.map((feedback, index) => (
            <ReviewCard key={index} feedback={feedback} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Page;
