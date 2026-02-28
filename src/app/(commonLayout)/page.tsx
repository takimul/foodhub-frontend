// import { mealService } from "@/services/meal.service";

import { mealService } from "@/src/services/meal.service";

export default async function HomePage() {
  const meals = await mealService.getMeals();

  if (!meals.success) {
    return <div>Failed to load meals</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Discover Delicious Meals 🍱</h1>

      <div className="grid grid-cols-3 gap-6">
        {meals?.data?.map((meal: any) => (
          <div key={meal.id} className="border p-4 rounded-lg">
            <h2 className="font-semibold">{meal.title}</h2>
            <p>${meal.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
