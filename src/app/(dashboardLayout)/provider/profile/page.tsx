import ProviderProfileForm from "@/src/components/provider/ProviderProfileForm";
import { serverFetch } from "@/src/services/fetch/serverFetch";

export default async function ProviderProfilePage() {
  const res = (await serverFetch("/providers/me", undefined, true)) as {
    success: boolean;
    data: any;
  };

  if (!res?.success) {
    return <div className="p-6">Failed to load profile</div>;
  }

  return (
    <div className="p-6">
      <ProviderProfileForm profile={res.data} />
    </div>
  );
}
