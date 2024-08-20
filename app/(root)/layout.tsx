import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PrivateRoute from "../router/privateRouter";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <Header top={1} header={1} menu={1} />
      <PrivateRoute>{children}</PrivateRoute>
      <Footer />
    </main>
  );
}
