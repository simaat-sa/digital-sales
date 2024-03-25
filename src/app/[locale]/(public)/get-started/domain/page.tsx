import { cookies } from "next/headers";
import DomainForm from "../../_components/DomainForm";
import LayoutGrid from "../../_components/Layout";

export default async function Page() {
  const data = await cookies().get("data")?.value;

  return (
    <LayoutGrid hasBg isGrid>
      <DomainForm state={data ? JSON.parse(data) : null} />
    </LayoutGrid>
  );
}
