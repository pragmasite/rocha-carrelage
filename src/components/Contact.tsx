import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { Phone, Mail, MapPin, Copy, Check } from "lucide-react";
import { useState } from "react";

const Contact = () => {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const contactInfo = [
    { icon: Phone, label: t.contact.phone, value: "+41 78 925 30 53", href: "tel:+41789253053" },
    { icon: Mail, label: t.contact.email, value: "rochacarrelage@gmail.com", href: "mailto:rochacarrelage@gmail.com" },
    { icon: MapPin, label: t.contact.address, value: "Avenue de la Perrausaz 125, 1814 La Tour-de-Peilz", href: "https://maps.google.com/?q=46.454855,6.867566" },
  ];

  const handleCopy = (value: string, field: string) => {
    navigator.clipboard.writeText(value);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="contact" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-16 text-center"
        >
          <motion.span
            variants={itemVariants}
            className="text-sm uppercase tracking-widest text-primary font-semibold"
          >
            {t.contact.label}
          </motion.span>
          <motion.h2 variants={itemVariants} className="font-serif text-4xl md:text-5xl mt-4">
            {t.contact.title1}
            <br />
            <span className="text-primary">{t.contact.title2}</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            {t.contact.description}
          </motion.p>
        </motion.div>

        <div className="grid gap-12 md:grid-cols-2 items-start">
          {/* Contact Information */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-6"
          >
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              const isCopied = copiedField === `${index}-copy`;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="flex gap-4 p-6 rounded-lg bg-background border border-border/50 hover:shadow-soft transition-shadow group"
                >
                  <div className="flex-shrink-0">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-muted-foreground font-semibold mb-1">
                      {info.label}
                    </p>
                    <a
                      href={info.href}
                      className="font-serif text-lg text-foreground hover:text-primary transition-colors break-all"
                    >
                      {info.value}
                    </a>
                  </div>
                  {(info.label === t.contact.phone || info.label === t.contact.email) && (
                    <button
                      onClick={() => handleCopy(info.value, `${index}-copy`)}
                      className="flex-shrink-0 p-2 text-muted-foreground hover:text-primary transition-colors"
                      title="Copy to clipboard"
                    >
                      {isCopied ? (
                        <Check className="h-5 w-5" />
                      ) : (
                        <Copy className="h-5 w-5" />
                      )}
                    </button>
                  )}
                </motion.div>
              );
            })}
          </motion.div>

          {/* Map */}
          <motion.div
            variants={itemVariants}
            className="rounded-lg overflow-hidden border border-border/50 h-96 shadow-soft"
          >
            <iframe
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2751.6968518866896!2d6.867566!3d46.454855!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478e6e8f8f8f8f91%3A0x8f8f8f8f8f8f8f8f!2sRocha%20Carrelage!5e0!3m2!1sfi!2sch!4v1234567890"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
