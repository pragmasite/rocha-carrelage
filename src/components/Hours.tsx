import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { Clock, CheckCircle } from "lucide-react";

const Hours = () => {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Rocha Carrelage actual hours: Mon-Fri 07:30-12:00, 13:00-18:30, Sat 08:00-12:00, Sun closed
  const schedule = [
    { day: t.hours.days[0], hours: `${t.hours.morning} - ${t.hours.afternoon}` }, // Monday
    { day: t.hours.days[1], hours: `${t.hours.morning} - ${t.hours.afternoon}` }, // Tuesday
    { day: t.hours.days[2], hours: `${t.hours.morning} - ${t.hours.afternoon}` }, // Wednesday
    { day: t.hours.days[3], hours: `${t.hours.morning} - ${t.hours.afternoon}` }, // Thursday
    { day: t.hours.days[4], hours: `${t.hours.morning} - ${t.hours.afternoon}` }, // Friday
    { day: t.hours.days[5], hours: `${t.hours.morningFr} - ${t.hours.afternoonFr}` }, // Saturday
    { day: t.hours.days[6], hours: t.hours.closed }, // Sunday
  ];

  const todayIndex = new Date().getDay();
  // JavaScript: 0 = Sunday, convert to our schedule (0 = Monday)
  const adjustedTodayIndex = todayIndex === 0 ? 6 : todayIndex - 1;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <section id="hours" className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-2xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <span className="text-sm uppercase tracking-widest text-primary font-semibold">
              {t.hours.label}
            </span>
            <h2 className="font-serif text-4xl md:text-5xl mt-4">{t.hours.title}</h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="rounded-2xl border bg-background shadow-soft overflow-hidden"
          >
            <div className="flex items-center gap-3 border-b bg-primary/5 px-6 py-4">
              <Clock className="h-5 w-5 text-primary" />
              <span className="font-serif text-lg font-semibold">{t.hours.header}</span>
            </div>

            <div className="divide-y">
              {schedule.map((item, i) => {
                const isToday = i === adjustedTodayIndex;
                const isClosed = item.hours === t.hours.closed;

                return (
                  <motion.div
                    key={i}
                    variants={itemVariants}
                    className={`px-6 py-4 flex justify-between items-center transition-colors ${
                      isToday ? "bg-primary/5" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {isToday && (
                        <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                      )}
                      <span className={`font-medium ${isToday ? "text-primary" : ""}`}>
                        {item.day}
                      </span>
                      {isToday && (
                        <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-semibold">
                          {t.hours.today}
                        </span>
                      )}
                    </div>
                    <span className={isClosed ? "text-muted-foreground italic" : ""}>
                      {item.hours}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-8 p-6 bg-primary/5 border border-primary/20 rounded-lg text-center"
          >
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-primary">{schedule[adjustedTodayIndex].day}:</span> {schedule[adjustedTodayIndex].hours}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hours;
