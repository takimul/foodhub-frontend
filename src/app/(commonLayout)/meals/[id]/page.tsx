// import { notFound } from "next/navigation";
// import { mealService } from "@/src/services/meal.service";

// interface MealPageProps {
//   params: Promise<{
//     id: string;
//   }>;
// }

// export default async function MealDetails({ params }: MealPageProps) {
//   const { id } = await params; // ✅ unwrap params

//   const result = await mealService.getMealById(id);

//   if (!result?.success || !result?.data) {
//     notFound();
//   }

//   const meal = result.data;

//   return (
//     <div className="p-10 max-w-3xl mx-auto">
//       <h1 className="text-3xl font-bold mb-4">{meal.title}</h1>
//       <p>{meal.description}</p>
//       <p>${meal.price}</p>
//     </div>
//   );
// }

import { notFound } from "next/navigation";
import { RatingStars } from "@/src/components/meal/RatingStars";
import { AddToCartButton } from "@/src/components/meal/AddToCartButton";
import { ReviewSection } from "@/src/components/meal/ReviewSection";
import { mealService } from "@/src/services/meal.service";
import Link from "next/link";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function MealDetails({ params }: Props) {
  const { id } = await params;

  const result = await mealService.getMealById(id);

  if (!result?.success || !result?.data) {
    notFound();
  }

  const meal = result.data;

  return (
    <div className="max-w-6xl mx-auto p-10">
      <div className="grid md:grid-cols-2 gap-10">
        {/* Image */}
        <div className="rounded-xl overflow-hidden bg-gray-100">
          <img
            src={meal.image || "/placeholder.png"}
            alt={meal.title}
            className="w-full h-[400px] object-cover"
          />
        </div>

        {/* Details */}
        <div>
          <span className="text-sm text-gray-500">{meal.category?.name}</span>

          <h1 className="text-3xl font-bold mt-2">{meal.title}</h1>

          <div className="mt-2">
            <RatingStars rating={meal.averageRating || 0} />
          </div>

          <p className="mt-4 text-gray-600">{meal.description}</p>

          <div className="text-2xl font-semibold mt-6">${meal.price}</div>

          <div className="mt-2 text-sm">
            By{" "}
            <span className="font-medium">
              <Link
                href={`/providers/${meal?.providerId}`}
                className="text-orange-600 hover:underline"
              >
                {meal.provider?.name}
              </Link>
            </span>
          </div>

          {meal.isAvailable ? (
            <span className="inline-block mt-4 text-green-600">Available</span>
          ) : (
            <span className="inline-block mt-4 text-red-600">Out of Stock</span>
          )}

          <AddToCartButton mealId={meal.id} />
        </div>
      </div>

      {/* Reviews */}
      <ReviewSection mealId={meal.id} reviews={meal.reviews || []} />
    </div>
  );
}
