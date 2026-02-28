import { mealService } from "@/src/services/meal.service";
import Link from "next/link";

export default async function MealsPage() {
  const { data } = await mealService.getMeals();

  return (
    <div className="grid grid-cols-3 gap-6 p-10">
      {data.map((meal: any) => (
        <Link
          key={meal.id}
          href={`/meals/${meal.id}`}
          className="border p-4 rounded-lg"
        >
          <h2 className="text-lg font-bold">{meal.title}</h2>
          <p>${meal.price}</p>
        </Link>
      ))}
    </div>
  );
}
