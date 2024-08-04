import { SearchBox } from "./Components/Search";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="mx-4 mt-8">
        <SearchBox />
      </div>
      {children}
    </>
  );
}
