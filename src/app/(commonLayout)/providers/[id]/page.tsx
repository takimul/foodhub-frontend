import { providerService } from "@/src/services/provider.service";
import { notFound } from "next/navigation";
import Link from "next/link";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ProviderPage({ params }: Props) {
  const { id } = await params;

  const res = await providerService.getProviderById(id);

  if (!res?.success) return notFound();

  const { profile, meals } = res.data;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-12">
      {/* PROVIDER INFO */}
      <section className="border rounded-xl p-8 space-y-4">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 bg-gray-200 rounded-full overflow-hidden">
            {profile.user.image ? (
              <img
                src={profile.user.image}
                className="w-full h-full object-cover"
              />
            ) : null}
          </div>

          <div>
            <h1 className="text-3xl font-bold">{profile.businessName}</h1>
            <p className="text-gray-500">{profile.user.name}</p>
          </div>
        </div>

        <div className="text-gray-600 space-y-1">
          <p>📍 {profile.address}</p>
          <p>📞 {profile.phone}</p>
        </div>
      </section>

      {/* PROVIDER MEALS */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Menu</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {meals.map((meal: any) => (
            <Link
              key={meal.id}
              href={`/meals/${meal.id}`}
              className="border rounded-xl overflow-hidden hover:shadow-xl transition"
            >
              <div className="h-48 bg-gray-200">
                {meal.image && (
                  <img
                    src={meal.image}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              <div className="p-4 space-y-2">
                <h3 className="font-semibold">{meal.title}</h3>
                <p className="text-sm text-gray-500">${meal.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
