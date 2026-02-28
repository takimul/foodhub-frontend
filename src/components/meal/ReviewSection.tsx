"use client";

import { useState } from "react";
// import { reviewService } from "@/src/services/review.service";
import { Button } from "@/src/components/ui/button";
import { toast } from "sonner";
import { RatingStars } from "./RatingStars";
import { reviewService } from "@/src/services/review.service";

interface Review {
  id: string;
  rating: number;
  comment: string;
  user: { name: string };
}

interface Props {
  mealId: string;
  reviews: Review[];
}

export function ReviewSection({ mealId, reviews }: Props) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const submitReview = async () => {
    try {
      await reviewService.createReview(mealId, rating, comment);
      toast.success("Review submitted");
      location.reload();
    } catch (error) {
      toast.error("Failed to submit review");
    }
  };

  return (
    <div className="mt-12">
      <h2 className="text-xl font-semibold mb-4">Reviews</h2>

      {reviews.length === 0 && <p className="text-gray-500">No reviews yet.</p>}

      <div className="space-y-6 mb-8">
        {reviews.map((r) => (
          <div key={r.id} className="border p-4 rounded-lg">
            <div className="flex justify-between">
              <span className="font-semibold">{r.user.name}</span>
              <RatingStars rating={r.rating} />
            </div>
            <p className="mt-2 text-gray-600">{r.comment}</p>
          </div>
        ))}
      </div>

      <div className="border-t pt-6">
        <h3 className="font-medium mb-3">Leave a Review</h3>

        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="border p-2 rounded-md w-full mb-3"
        >
          {[5, 4, 3, 2, 1].map((r) => (
            <option key={r} value={r}>
              {r} Stars
            </option>
          ))}
        </select>

        <textarea
          className="w-full border rounded-md p-2 mb-3"
          placeholder="Write your review..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <Button onClick={submitReview}>Submit Review</Button>
      </div>
    </div>
  );
}
