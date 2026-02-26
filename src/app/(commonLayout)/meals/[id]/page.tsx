import { mealService } from "@/src/services/meal.service";

export default async function MealDetails({
  params,
}: {
  params: { id: string };
}) {
  const meal = await mealService.getMealById(params.id);

  return (
    <div>
      <h1 className="text-2xl font-bold">{meal.data.title}</h1>
      <p>{meal.data.description}</p>
      <p>${meal.data.price}</p>
    </div>
  );
}
