import { useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const Gallery = () => {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Gallery images with descriptions for each language
  const getGalleryDescriptions = () => {
    const descriptions = {
      fr: ["Carrelage Salle Bain", "Flooring Moderne", "Cuisine Rénovée", "Terrasse Bois", "Mur Maçonnerie", "Rénovation Intérieur"],
      de: ["Bad-Fliesen", "Moderner Boden", "Sanierte Küche", "Holzterrasse", "Mauerwerk", "Innenrenovierung"],
      en: ["Bathroom Tiling", "Modern Flooring", "Renovated Kitchen", "Wood Terrace", "Masonry Wall", "Interior Renovation"],
    };
    return descriptions[t.nav.profession ? (Object.keys(descriptions) as any[]).find(k => k !== 'fr' && t[k as any]?.nav?.profession) || 'fr' : 'fr'] || descriptions.fr;
  };

  const images = [
    { src: "/images/gallery-1.jpg", alt: getGalleryDescriptions()[0] },
    { src: "/images/gallery-2.jpg", alt: getGalleryDescriptions()[1] },
    { src: "/images/gallery-3.jpg", alt: getGalleryDescriptions()[2] },
    { src: "/images/gallery-4.jpg", alt: getGalleryDescriptions()[3] },
    { src: "/images/gallery-5.jpg", alt: getGalleryDescriptions()[4] },
    { src: "/images/gallery-6.jpg", alt: getGalleryDescriptions()[5] },
  ];

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

  const handleNextSlide = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex + 1) % images.length);
  };

  const handlePrevSlide = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex - 1 + images.length) % images.length);
  };

  return (
    <section id="gallery" className="py-24 bg-muted/30">
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
            {t.gallery.label}
          </motion.span>
          <motion.h2 variants={itemVariants} className="font-serif text-4xl md:text-5xl mt-4">
            {t.gallery.title}
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            {t.gallery.description}
          </motion.p>
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {images.map((image, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-xl"
              onClick={() => setSelectedIndex(index)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-sm font-medium text-white">{image.alt}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/80 backdrop-blur-sm p-4"
            onClick={() => setSelectedIndex(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedIndex(null)}
                className="absolute -top-10 right-0 text-white hover:text-accent transition-colors z-10"
              >
                <X className="h-8 w-8" />
              </button>

              {/* Image */}
              <img
                src={images[selectedIndex].src}
                alt={images[selectedIndex].alt}
                className="w-full h-auto rounded-lg"
              />

              {/* Description */}
              <div className="mt-4 text-center">
                <p className="text-white text-lg font-medium">
                  {images[selectedIndex].alt}
                </p>
              </div>

              {/* Navigation Buttons */}
              <button
                onClick={handlePrevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-accent transition-colors"
              >
                <ChevronLeft className="h-8 w-8" />
              </button>
              <button
                onClick={handleNextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-accent transition-colors"
              >
                <ChevronRight className="h-8 w-8" />
              </button>

              {/* Counter */}
              <div className="text-center mt-4 text-white/60 text-sm">
                {selectedIndex + 1} / {images.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
