import * as motion from "motion/react-client";
import Image from "next/image";

function AboutusSection() {
  return (
    <section id="about" className="py-16 md:py-24">
      <div className="container px-4 md:px-10 xl:px-32 2xl:px-40 mx-auto">
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Text Section with Motion */}
          <motion.div
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: -50 }}
            transition={{ duration: 1.3, ease: "easeInOut" }} // Same duration and easing as the image
            viewport={{ once: true, amount: 0.5 }}
            className="text-center md:text-start"
          >
            <h2
              className="text-4xl md:text-5xl font-medium mb-6"
              style={{ fontFamily: "var(--font-playfair-display)" }}
            >
              About Us
            </h2>
            <p className="text-gray-600 font-light text-[18px] mb-4">
              Since 2020, we&apos;ve been weaving Italian tradition into the vibrant flavors of Addis Ababa, starting with our famous lasagna. Five years of passion poured into every dish have brought our 10 signature lasagnas to perfection, each with its own character and comforting flavors. But Sapore isn&apos;t just about lasagna; it&apos;s where Italians find a taste of home and Ethiopians fall in love with the first bite of handmade pasta or a perfectly baked pizza.
            </p>

            <p className="text-gray-600 font-light text-[18px]">
              Our space mirrors what we serve: simple, thoughtful, and full of warmth. White walls, soft lighting, and the hum of happy conversations make it ideal for long meals with people you cherish.
            </p>

          </motion.div>

          {/* Image Section with Motion */}
          <motion.div
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: 50 }}
            transition={{ duration: 1.3, ease: "easeInOut" }} // Same duration and easing as the text
            viewport={{ once: true }}
            className="relative h-[450px] md:h-[650px] overflow-hidden"
          >
            <Image
              src="/aboutusfood.jpg"
              alt="Restaurant interior"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default AboutusSection;
