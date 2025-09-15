import Header from "./_components/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="mt-24 ">
      <Header />
      {children}
    </section>
  );
}
