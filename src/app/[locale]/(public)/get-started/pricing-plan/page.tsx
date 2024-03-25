import { cookies } from "next/headers";
import PricingPlanForm from "../../_components/PricingPlanForm";

export default async function Page() {
  const data = await cookies().get("data")?.value;

  return <PricingPlanForm state={data ? JSON.parse(data) : null} />;
}
