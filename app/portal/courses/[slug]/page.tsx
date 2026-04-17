import { notFound } from "next/navigation";
import { CourseDetailPage } from "../course-detail-page";
import { courseCatalog } from "../course-catalog";

export default async function DynamicCoursePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = courseCatalog.find((item) => item.slug === slug);

  if (!course) {
    notFound();
  }

  return <CourseDetailPage course={course} />;
}
