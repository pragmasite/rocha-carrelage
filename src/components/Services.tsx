import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { Wrench, Hammer, Home, Zap, Paintbrush, LayoutGrid } from "lucide-react";

const Services = () => {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const icons = [Wrench, Hammer, Home, Zap, Paintbrush, LayoutGrid];

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
    <section id="services" className="py-24">
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
            {t.services.label}
          </motion.span>
          <motion.h2 variants={itemVariants} className="font-serif text-4xl md:text-5xl mt-4">
            {t.services.title}
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            {t.services.description}
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {t.services.items.map((service, index) => {
            const Icon = icons[index % icons.length];
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group p-8 rounded-xl bg-card border border-border/50 hover:shadow-medium transition-all hover:border-primary/30"
              >
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-serif text-xl font-bold text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground">{service.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
