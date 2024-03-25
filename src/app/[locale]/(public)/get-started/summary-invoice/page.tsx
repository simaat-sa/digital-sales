import { cookies } from "next/headers";
import SummaryInvoiceForm from "../../_components/SummaryInvoiceForm";

export default async function Page() {
  const data = await cookies().get("data")?.value;

  return <SummaryInvoiceForm state={data ? JSON.parse(data) : null} />;
}
