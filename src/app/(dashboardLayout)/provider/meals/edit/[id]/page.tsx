import EditMealForm from "@/src/components/provider/EditMealForm";
import { serverFetch } from "@/src/services/fetch/serverFetch";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditMealPage({ params }: Props) {
  const { id } = await params;

  const res = (await serverFetch(`/meals/${id}`, undefined, true)) as {
    success?: boolean;
    message?: string;
    data?: any;
  };

  if (!res?.success) return notFound();

  return (
    <div className="p-6">
      <EditMealForm meal={res.data} />
    </div>
  );
}
