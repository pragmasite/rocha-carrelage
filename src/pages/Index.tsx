import { useLanguage } from "@/hooks/useLanguage";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Gallery from "@/components/Gallery";
import Hours from "@/components/Hours";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import DisclaimerModal from "@/components/DisclaimerModal";

const Index = () => {
  const { lang } = useLanguage();

  // Set document language and title
  if (typeof document !== "undefined") {
    document.documentElement.lang = lang;
    document.title = "Rocha Carrelage - Carrelage & Maçonnerie";
  }

  return (
    <div className="min-h-screen">
      <DisclaimerModal />
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Gallery />
        <Hours />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
