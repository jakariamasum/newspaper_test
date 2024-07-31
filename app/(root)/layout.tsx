import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <Header top={1} header={1} menu={1} />
      {children}
      <Footer />
    </main>
  );
}
