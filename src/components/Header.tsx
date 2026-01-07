import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Globe } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { Button } from "@/components/ui/button";

const Header = () => {
  const { t, lang, otherLanguages } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  window.addEventListener("scroll", () => {
    setIsScrolled(window.scrollY > 0);
  });

  const navLinks = [
    { name: t.nav.about, href: "#about-us" },
    { name: t.nav.services, href: "#services" },
    { name: t.nav.gallery, href: "#gallery" },
    { name: t.nav.hours, href: "#hours" },
    { name: t.nav.contact, href: "#contact" },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-soft"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <a href="#" className="flex flex-col gap-0">
          <span
            className={`font-serif text-lg font-bold ${
              isScrolled ? "text-primary" : "text-white"
            }`}
          >
            Rocha Carrelage
          </span>
          <span
            className={`text-xs tracking-widest ${
              isScrolled ? "text-muted-foreground" : "text-white/70"
            }`}
          >
            {t.nav.profession}
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                isScrolled
                  ? "text-foreground hover:text-primary"
                  : "text-white/90 hover:text-white"
              }`}
            >
              {link.name}
            </a>
          ))}

          {/* Language Dropdown */}
          <div className="relative group">
            <button
              className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${
                isScrolled
                  ? "text-foreground hover:text-primary"
                  : "text-white/90 hover:text-white"
              }`}
            >
              <Globe className="h-4 w-4" />
              {lang.toUpperCase()}
            </button>
            <div className="absolute right-0 mt-0 w-32 bg-background shadow-medium rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
              {otherLanguages.map((l) => (
                <Link
                  key={l.code}
                  to={l.path}
                  className="block px-4 py-2 text-sm hover:bg-primary/10 hover:text-primary transition-colors first:rounded-t-lg last:rounded-b-lg"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          <Button asChild>
            <a href="tel:+41789253053" className="flex items-center gap-2">
              {t.nav.call}
            </a>
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X
              className={`h-6 w-6 ${
                isScrolled ? "text-foreground" : "text-white"
              }`}
            />
          ) : (
            <Menu
              className={`h-6 w-6 ${
                isScrolled ? "text-foreground" : "text-white"
              }`}
            />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background border-t">
          <nav className="flex flex-col gap-4 p-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-foreground hover:text-primary font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <div className="border-t pt-4">
              <p className="text-xs text-muted-foreground mb-2 font-semibold">
                {t.nav.profession.split("&")[0].trim()}
              </p>
              {otherLanguages.map((l) => (
                <Link
                  key={l.code}
                  to={l.path}
                  className="block py-2 text-foreground hover:text-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {l.label}
                </Link>
              ))}
            </div>
            <Button asChild className="w-full mt-4">
              <a href="tel:+41789253053">{t.nav.call}</a>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
