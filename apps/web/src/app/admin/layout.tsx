import { SearchBox } from "./Search";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SearchBox />
      {children}
    </>
  );
}
