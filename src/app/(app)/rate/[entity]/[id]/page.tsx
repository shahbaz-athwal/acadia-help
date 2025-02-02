import RatingForm from "@/components/RatingForm";
import { getCourseRateById, getProfessorRateById } from "@/lib/dbQueries";
import { notFound } from "next/navigation";

export default async function Page(props: {
  params: Promise<{ entity: string; id: string }>;
}) {
  const params = await props.params;
  if (params.entity !== "course" && params.entity !== "professor") {
    return notFound();
  }

  const entityData: any =
    params.entity === "course"
      ? await getCourseRateById(params.id)
      : await getProfessorRateById(Number(params.id));

  return (
    <RatingForm entityData={entityData} entity={params.entity} id={params.id} />
  );
}
