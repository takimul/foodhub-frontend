"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { useState } from "react";

interface Props {
  categories: any[];
  searchParams: any;
}

export default function MealsFilterBar({ categories, searchParams }: Props) {
  const router = useRouter();
  const currentParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.search || "");
  const [categoryId, setCategoryId] = useState(searchParams.categoryId || "");
  const [minPrice, setMinPrice] = useState(searchParams.minPrice || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.maxPrice || "");

  const handleFilter = () => {
    const params = new URLSearchParams();

    if (search) params.set("search", search);
    if (categoryId) params.set("categoryId", categoryId);
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);

    router.push(`/meals?${params.toString()}`);
  };

  const clearFilters = () => {
    router.push("/meals");
  };

  return (
    <div className="bg-gray-100 p-6 rounded-xl space-y-4">
      <div className="grid md:grid-cols-4 gap-4">
        <Input
          placeholder="Search meals..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border rounded-md px-3"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <Input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />

        <Input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </div>

      <div className="flex gap-4">
        <Button onClick={handleFilter}>Apply Filters</Button>

        <Button variant="outline" onClick={clearFilters}>
          Clear
        </Button>
      </div>
    </div>
  );
}
