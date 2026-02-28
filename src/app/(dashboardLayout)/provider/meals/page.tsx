import { serverFetch } from "@/src/services/fetch/serverFetch";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";

export default async function ProviderMealsPage() {
  const res = await serverFetch<any>("/meals/provider/meals", undefined, true);
  console.log("Meals response:", res);

  if (!res?.success) {
    return <div className="p-6">Failed to load meals</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">My Meals</h1>
        <Link href="/provider/meals/create">
          <Button>Add Meal</Button>
        </Link>
      </div>

      {res.data.map((meal: any) => (
        <div key={meal.id} className="border p-4 rounded flex justify-between">
          <div>
            <p className="font-semibold">{meal.title}</p>
            <p>${meal.price}</p>
          </div>

          <div className="space-x-2">
            <Link href={`/provider/meals/edit/${meal.id}`}>
              <Button variant="outline">Edit</Button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
