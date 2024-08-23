import { auth } from "@/auth";
import { SearchBox } from "./Components/Search";
import Link from "next/link";
import { LockIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getAllResults } from "@/actions/searchQuery";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if (!session?.user) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center gap-4 p-4">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="flex flex-col items-center space-y-2">
            <LockIcon className="w-14 h-14" />
            <div className="space-y-2">
              <h1 className="text-3xl font-bold">Access Denied</h1>
              <p className="text-sm text-gray-500 md:text-base dark:text-gray-400">
                You do not have permission to access this page.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Link
              className="inline-flex h-10 items-center justify-center rounded-md border    px-8 text-sm font-medium shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 border-gray-800 bg-zinc-950 hover:bg-gray-800 hover:text-gray-50 focus-visible:ring-gray-300"
              href="/"
            >
              Return to the homepage
            </Link>
            <Link
              className="inline-flex h-10 items-center justify-center rounded-md border    px-8 text-sm font-medium shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 border-gray-800 bg-zinc-950 hover:bg-gray-800 hover:text-gray-50 focus-visible:ring-gray-300"
              href="/api/auth/signin"
            >
              SignIn to get access
            </Link>
          </div>
        </div>
      </div>
    );
  }
  const results = await getAllResults();

  return (
    <>
      <div className="flex justify-between">
        <Link href={"/"} className="flex justify-end m-4">
          <Button variant={"outline"} size={"sm"}>
            Home
          </Button>
        </Link>
        <Link href={"/api/auth/signout"} className="flex justify-end m-4">
          <Button variant={"outline"} size={"sm"}>
            Signout
          </Button>
        </Link>
      </div>
      <div className="mx-4 mt-8 flex justify-center">
        <SearchBox initialResults={results} />
      </div>
      {children}
    </>
  );
}
