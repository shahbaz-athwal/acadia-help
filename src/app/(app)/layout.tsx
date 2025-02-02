import { Appbar } from "@/components/Appbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Appbar />
      {children}
    </>
  );
}
