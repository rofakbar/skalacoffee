import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ShopLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col bg-latar">
      <Header />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4">{children}</main>
      <Footer />
    </div>
  );
}

