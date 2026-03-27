import Header from "@/app/components/layout/Header";
import Footer from "@/app/components/layout/Footer";

export default function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
