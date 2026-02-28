// import { mealService } from "@/src/services/meal.service";

// export default async function HomePage() {
//   const meals = await mealService.getMeals();

//   if (!meals.success) {
//     return <div>Failed to load meals</div>;
//   }

//   return (
//     <div>
//       <h1 className="text-3xl font-bold mb-6">Discover Delicious Meals 🍱</h1>

//       <div className="grid grid-cols-3 gap-6">
//         {meals?.data?.map((meal: any) => (
//           <div key={meal.id} className="border p-4 rounded-lg">
//             <h2 className="font-semibold">{meal.title}</h2>
//             <p>${meal.price}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

import Link from "next/link";
import { mealService } from "@/src/services/meal.service";
import { categoryService } from "@/src/services/category.service";
import { Button } from "@/src/components/ui/button";

export default async function HomePage() {
  const meals = await mealService.getMeals();
  const categories = await categoryService.getCategories();

  if (!meals?.success) {
    return <div>Failed to load meals</div>;
  }

  return (
    <div className="space-y-20">
      
      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-r from-orange-500 to-red-500 text-white py-24 px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Discover Delicious Meals 🍱
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          Explore meals from top restaurants near you. Fresh, fast, and flavorful.
        </p>

        <Link href="/meals">
          <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100">
            Browse Meals
          </Button>
        </Link>
      </section>

      {/* CATEGORY SECTION */}
      <section className="px-6 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-8 text-center">
          Browse by Category
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories?.data?.map((cat: any) => (
            <Link
              key={cat.id}
              href={`/meals?categoryId=${cat.id}`}
              className="border rounded-xl p-6 text-center hover:shadow-lg transition"
            >
              <p className="font-semibold text-lg">{cat.name}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED MEALS */}
      <section className="px-6 max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">
            Featured Meals
          </h2>

          <Link href="/meals">
            <Button variant="outline">View All</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
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
                <h3 className="font-semibold text-lg">
                  {meal.title}
                </h3>

                <p className="text-sm text-gray-500 line-clamp-2">
                  {meal.description}
                </p>

                <div className="flex justify-between items-center">
                  <p className="font-bold text-orange-600">
                    ${meal.price}
                  </p>

                  <p className="text-sm text-gray-500">
                    ⭐ {meal.averageRating ?? 0}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="bg-gray-100 py-16 text-center">
        <h2 className="text-3xl font-bold mb-6">
          Are you a food provider?
        </h2>
        <p className="mb-8 text-gray-600">
          Join FoodHub and start selling your meals today.
        </p>

        <Link href="/register">
          <Button size="lg">Become a Provider</Button>
        </Link>
      </section>
    </div>
  );
}