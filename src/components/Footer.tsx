import { useLanguage } from "@/hooks/useLanguage";

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-3 mb-12">
          {/* Brand Section */}
          <div>
            <h3 className="font-serif text-xl font-bold mb-2">Rocha Carrelage</h3>
            <p className="text-sm text-background/80 mb-4">{t.footer.tagline}</p>
            <p className="text-xs text-background/70">{t.footer.description}</p>
          </div>

          {/* Navigation Section */}
          <div>
            <h4 className="font-serif font-bold mb-4">{t.footer.navigation}</h4>
            <nav className="flex flex-col gap-3 text-sm">
              <a
                href="#about-us"
                className="text-background/80 hover:text-background transition-colors"
              >
                {t.nav.about}
              </a>
              <a
                href="#services"
                className="text-background/80 hover:text-background transition-colors"
              >
                {t.nav.services}
              </a>
              <a
                href="#gallery"
                className="text-background/80 hover:text-background transition-colors"
              >
                {t.nav.gallery}
              </a>
              <a
                href="#hours"
                className="text-background/80 hover:text-background transition-colors"
              >
                {t.nav.hours}
              </a>
              <a
                href="#contact"
                className="text-background/80 hover:text-background transition-colors"
              >
                {t.nav.contact}
              </a>
            </nav>
          </div>

          {/* Contact Section */}
          <div>
            <h4 className="font-serif font-bold mb-4">{t.contact.label}</h4>
            <div className="flex flex-col gap-3 text-sm">
              <a
                href="tel:+41789253053"
                className="text-background/80 hover:text-background transition-colors"
              >
                +41 78 925 30 53
              </a>
              <a
                href="mailto:rochacarrelage@gmail.com"
                className="text-background/80 hover:text-background transition-colors break-all"
              >
                rochacarrelage@gmail.com
              </a>
              <p className="text-background/80 text-xs leading-relaxed">
                Avenue de la Perrausaz 125<br />
                1814 La Tour-de-Peilz<br />
                Switzerland
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-background/20 my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-background/70">
          <p>
            &copy; {currentYear} Rocha Carrelage. {t.footer.copyright}
          </p>
          <p>{t.footer.designedBy}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
