import PartOverview from "@/components/PartOverview";

export default async function ListeningPartDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ partId: string }>;
  searchParams: Promise<{ year?: string }>;
}) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  return (
    <PartOverview
      category="listening"
      partIdString={resolvedParams.partId}
      year={resolvedSearchParams.year || "2026"}
    />
  );
}
