import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { Check } from "lucide-react";

const About = () => {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
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

  const stats = [
    { value: "10+", label: t.about.stat1 },
    { value: "500+", label: t.about.stat2 },
    { value: "100%", label: t.about.stat3 },
  ];

  return (
    <section id="about-us" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-16"
        >
          <motion.span
            variants={itemVariants}
            className="text-sm uppercase tracking-widest text-primary font-semibold"
          >
            {t.about.label}
          </motion.span>
          <motion.h2 variants={itemVariants} className="font-serif text-4xl md:text-5xl mt-2">
            {t.about.title1}
            <br />
            <span className="text-primary">{t.about.title2}</span>
          </motion.h2>
        </motion.div>

        <div className="grid gap-12 md:grid-cols-2 items-center">
          {/* Text Content */}
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-6"
          >
            <motion.p variants={itemVariants} className="text-lg text-foreground/90">
              {t.about.p1}
            </motion.p>
            <motion.p variants={itemVariants} className="text-lg text-foreground/90">
              {t.about.p2}
            </motion.p>

            {/* Stats */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="grid grid-cols-3 gap-6 pt-6 border-t"
            >
              {stats.map((stat, index) => (
                <motion.div key={index} variants={itemVariants} className="text-center">
                  <div className="text-3xl font-serif font-bold text-primary">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground mt-2">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid gap-4"
          >
            {t.about.features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex gap-4 p-6 rounded-lg bg-background border border-border/50 hover:shadow-soft transition-shadow"
              >
                <div className="flex-shrink-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Check className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="font-serif font-bold text-foreground mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
