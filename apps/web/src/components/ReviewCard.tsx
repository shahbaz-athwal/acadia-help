import { Course, Feedback, Professor } from "@prisma/client";
import React from "react";
import dayjs from "dayjs";

interface FeedbackProp extends Feedback {
  course?: Course;
  professor?: Professor;
}

type ReviewCardProps = {
  feedback: FeedbackProp;
};

const ReviewCard: React.FC<ReviewCardProps> = ({ feedback }) => {
  const getRatingClass = (rating: number) => {
    if (rating <= 2) {
      return "bg-red-200 text-red-800";
    } else if (rating === 3) {
      return "bg-yellow-200 text-yellow-800";
    } else {
      return "bg-green-300 text-green-800";
    }
  };

  const qualityClass = getRatingClass(feedback.quality);
  const difficultyClass = getRatingClass(feedback.difficulty);
  return (
    <li className="flex border bg-zinc-600/5 rounded-lg p-4">
      <div className="flex flex-col items-center mr-6 mb-4 md:mb-0">
        <p className="text-xs font-semibold text-zinc-400 mb-2">QUALITY</p>
        <div className={`${qualityClass} rounded-md w-fit px-6 py-3 mb-4`}>
          <div className="text-xl font-bold">{feedback.quality}</div>
        </div>
        <p className="text-xs font-semibold text-zinc-400 mb-2">DIFFICULTY</p>
        <div className={`${difficultyClass} rounded-md w-fit px-6 py-3`}>
          <div className="text-xl font-bold">{feedback.difficulty}</div>
        </div>
      </div>
      <div className="w-full">
        <div className="flex justify-between mb-1 text-lg font-semibold pt-2">
          {feedback.professor ? (
            <div>{feedback.professor.name}</div>
          ) : (
            <div className="flex flex-col md:flex-row md:gap-2">
              <div>{feedback.course!.courseCode}</div>
              <div className="hidden md:block">{"-"}</div>
              <div>{feedback.course!.courseName}</div>
            </div>
          )}
          <div className="text-sm text-zinc-400">
            {dayjs(feedback.createdAt).format("MMM D, YYYY")}
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-1 md:gap-3 mb-4 md:items-center">
          <div className="text-md text-zinc-300 mr-4">Grade: {feedback.grade}</div>
          <div className="text-sm text-zinc-500">
            Textbook Required: {feedback.bookRequired ? "Yes" : "No"}
          </div>
          <div className="text-sm text-zinc-500">
            Attendence Required: {feedback.attendance ? "Yes" : "No"}
          </div>
        </div>
        <p className="text-md">{feedback.message}</p>
      </div>
    </li>
  );
};

export default ReviewCard;
