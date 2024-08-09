"use client";
import { useState } from "react";
import RenderNotion from "@/components/RenderNotion";
import ReviewCard from "@/components/ReviewCard";
import { ReviewChart } from "@/components/ReviewChart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExtendedRecordMap } from "notion-types";

interface CourseTabsProps {
  ratingCount: number;
  ratingDistribution: any;
  feedbacks: any[];
  docId: string;
}

const CourseTabs: React.FC<CourseTabsProps> = ({
  ratingCount,
  ratingDistribution,
  feedbacks,
  docId,
}) => {
  const [loading, setLoading] = useState(true);
  const [pageMap, setPageMap] = useState<ExtendedRecordMap | null>(null);

  const handleDocTabSelect = async () => {
    const response = await fetch(`/api/notionmap`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ docId }),
    });

    const { data } = await response.json();
    setPageMap(data);
    setLoading(false);
  };

  return (
    <Tabs defaultValue="reviews" className="w-full pt-12">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="reviews">Reviews</TabsTrigger>
        <TabsTrigger value="notion" onClick={handleDocTabSelect}>
          Doc
        </TabsTrigger>
      </TabsList>
      <TabsContent
        value="reviews"
        className="flex flex-col items-center space-y-3 pt-4"
      >
        <ReviewChart ratingCount={ratingDistribution} type="difficulty" />
        <div className="pt-12 w-full">
          <h2 className="text-lg text-center font-semibold mb-6">
            {ratingCount} Student Ratings
          </h2>
          <ul className="space-y-4">
            {feedbacks.map((feedback, index) => (
              <ReviewCard key={index} feedback={feedback} />
            ))}
          </ul>
        </div>
      </TabsContent>
      <TabsContent value="notion">
        {loading ? (
          <div className="text-center py-10">Loading...</div>
        ) : pageMap ? (
          <RenderNotion recordMap={pageMap} />
        ) : (
          <div className="text-center pt-6 text-lg text-zinc-500">
            <div>We are working to get material for this course</div>
            <div>Sorry for inconvinience</div>
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
};

export default CourseTabs;
