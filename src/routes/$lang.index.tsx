import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Categories } from "@/components/site/Categories";
import { FeaturedProducts } from "@/components/site/FeaturedProducts";
import { WhyUs } from "@/components/site/WhyUs";
import { Testimonials } from "@/components/site/Testimonials";
import { Newsletter } from "@/components/site/Newsletter";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/$lang/")({
  head: ({ params }) => {
    const isEn = params.lang === "en";
    return {
      meta: [
        {
          title: isEn
            ? "BestGiftHunt — 100% African gifts for couples"
            : "BestGiftHunt — Cadeaux 100% africains pour les couples",
        },
        {
          name: "description",
          content: isEn
            ? "Premium marketplace of African artisan gifts for couples. Fast delivery, secure payment, multi-currency."
            : "Marketplace premium de cadeaux artisanaux africains pour célébrer l'amour. Livraison express, paiement sécurisé, multi-devises.",
        },
      ],
    };
  },
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <Categories />
        <FeaturedProducts />
        <WhyUs />
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
