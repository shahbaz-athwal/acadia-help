import { getProfessorById } from "@/lib/dbQueries";
import Image from "next/image";
import Link from "next/link";
import React from "react";

async function Page({ params }: { params: { id: string } }) {
  const professor = await getProfessorById(Number(params.id));
  const ratingCount = professor!.feedbacks.length;

  const avgDifficulty =
    professor!.feedbacks.reduce(
      (acc, feedback) => acc + feedback.difficulty,
      0
    ) / ratingCount;
  const avgQuality =
    professor!.feedbacks.reduce((acc, feedback) => acc + feedback.quality, 0) /
    ratingCount;

  return (
    <div className="max-w-3xl mx-auto p-3">
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
          <span className="mx-auto font-bold text-xl">
            {avgDifficulty.toFixed(2)}
          </span>
          <h2 className="text-sm mb-2 text-zinc-400">Level of Difficulty</h2>
        </div>
        <Link
          href={`/professor/rate/${professor!.id}`}
          className="group bg-zinc-50 mb-2 hover:bg-zinc-200 transition-colors inline-block mt-4 font-mono text-xs sm:text-sm font-semibold rounded-full px-8 py-3 text-black"
        >
          Rate{" "}
          <span className="inline-block group-hover:translate-x-2 transition-transform">
            {">"}
          </span>
        </Link>
      </div>
      <div className="pt-12">
        <h2 className="text-lg text-center font-semibold mb-6">{ratingCount} Student Ratings</h2>
        <ul className="space-y-4">
          {professor!.feedbacks.map((feedback, index) => (
            <li key={index} className="flex border rounded-lg p-4">
            <div className="flex-shrink-0 text-center mr-4">
              <div className="bg-green-200 rounded-md p-2 mb-2">
                <span className="text-xl font-bold text-green-800">{feedback.quality}</span>
                <p className="text-sm font-semibold text-gray-700">QUALITY</p>
              </div>
              <div className="bg-gray-200 rounded-md p-2">
                <span className="text-xl font-bold text-gray-800">{feedback.difficulty}</span>
                <p className="text-sm font-semibold text-gray-700">DIFFICULTY</p>
              </div>
            </div>
            <div className="flex-grow">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <span className="font-bold">{feedback.course.courseCode} - {feedback.course.courseName}</span>
                </div>
                <span className="text-sm font-semibold text-gray-500">{new Date(feedback.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="text-sm mb-2">
                <span className="font-semibold ml-4">Textbook: </span>Yes{' '}
              </div>
              <p className="text-sm">{feedback.message}</p>
            </div>
          </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Page;
