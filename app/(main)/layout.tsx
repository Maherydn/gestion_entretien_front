import Header from "./_components/Header";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="mt-15 mb-5">
      {/* <Header /> */}
      {children}
    </section>
  );
}
