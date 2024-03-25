import { cookies } from "next/headers";
import CustomPlanForm from "../../_components/CustomPlanForm";

export default async function Page() {
  const data = await cookies().get("data")?.value;

  return <CustomPlanForm state={data ? JSON.parse(data) : null} />;
}
