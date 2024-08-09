"use client"
import { useState } from "react";
import RenderNotion from "@/components/RenderNotion";
import ReviewCard from "@/components/ReviewCard";
import { ReviewChart } from "@/components/ReviewChart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getNotionPage, showNotionPage } from "@/lib/notion";

interface CourseTabsProps {
  ratingCount: number;
  ratingDistribution: any;
  feedbacks: any[];
  id: string;
}

const CourseTabs: React.FC<CourseTabsProps> = ({
  ratingCount,
  ratingDistribution,
  feedbacks,
  id,
}) => {
  const [loading, setLoading] = useState(false);
  const [docId, setDocId] = useState<string | null>(null);
  const [showPage, setShowPage] = useState(false);

  const handleDocTabSelect = async () => {
    if (!docId && !showPage) {
      setLoading(true);
      const showPage = await showNotionPage(id);
      if (showPage) {
        const fetchedDocId = await getNotionPage(id);
        // @ts-ignore
        setDocId(fetchedDocId);
        setShowPage(true);
      }
      setLoading(false);
    }
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
        ) : (
          showPage && docId && <RenderNotion recordMap={docId} />
        )}
      </TabsContent>
    </Tabs>
  );
};

export default CourseTabs;
