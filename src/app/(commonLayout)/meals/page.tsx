// import { mealService } from "@/src/services/meal.service";
// import Link from "next/link";

// export default async function MealsPage() {
//   const { data } = await mealService.getMeals();

//   return (
//     <div className="grid grid-cols-3 gap-6 p-10">
//       {data.map((meal: any) => (
//         <Link
//           key={meal.id}
//           href={`/meals/${meal.id}`}
//           className="border p-4 rounded-lg"
//         >
//           <h2 className="text-lg font-bold">{meal.title}</h2>
//           <p>${meal.price}</p>
//         </Link>
//       ))}
//     </div>
//   );
// }

import { mealService } from "@/src/services/meal.service";
import { categoryService } from "@/src/services/category.service";
// import MealsFilterBar from "@/src/components/meals/MealsFilterBar";
import Link from "next/link";
import MealsFilterBar from "@/src/components/meal/MealsFilterBar";

interface Props {
  searchParams: {
    search?: string;
    categoryId?: string;
    minPrice?: string;
    maxPrice?: string;
    page?: string;
  };
}

export default async function MealsPage({ searchParams }: Props) {
  const params = await searchParams;

  const meals = await mealService.getMeals({
    search: params.search,
    categoryId: params.categoryId,
    minPrice: params.minPrice ? Number(params.minPrice) : undefined,
    maxPrice: params.maxPrice ? Number(params.maxPrice) : undefined,
    page: params.page ? Number(params.page) : 1,
  });

  const categories = await categoryService.getCategories();

  if (!meals?.success) {
    return <div className="p-10">Failed to load meals</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-10">
      {/* FILTER BAR */}
      <MealsFilterBar
        categories={categories?.data || []}
        searchParams={searchParams}
      />

      {/* MEALS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {!meals?.data?.length && (
          <p className="text-center text-gray-500 col-span-full">
            No meals found. Try adjusting your filters.
          </p>
        )}
        {meals.data.map((meal: any) => (
          <Link
            key={meal.id}
            href={`/meals/${meal.id}`}
            className="group border rounded-xl overflow-hidden hover:shadow-xl transition"
          >
            <div className="h-48 bg-gray-200 overflow-hidden">
              {meal.image ? (
                <img
                  src={meal.image}
                  className="w-full h-full object-cover group-hover:scale-105 transition"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  No Image
                </div>
              )}
            </div>

            <div className="p-4 space-y-2">
              <h2 className="text-lg font-semibold">{meal.title}</h2>

              <p className="text-sm text-gray-500 line-clamp-2">
                {meal.description}
              </p>

              <div className="flex justify-between items-center">
                <p className="font-bold text-orange-600">${meal.price}</p>

                <p className="text-sm text-gray-500">
                  ⭐ {meal.averageRating ?? 0}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
