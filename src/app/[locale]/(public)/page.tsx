import { Link, redirect } from "@/shared/lib/navigation";

export default function Home() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="bg-gradient-to-r from-slate-200 to-gray-200 p-4 w-2/5 h-72 rounded-3xl flex items-center justify-center">
        <Link href="/sales" className="underline font-serif text-2xl font-bold">
          Digital Sales
        </Link>
      </div>
    </div>
  );
}
