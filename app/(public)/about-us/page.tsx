import * as motion from "motion/react-client";


import Header from "@/components/usercomponents/Header";
import Image from "next/image";

export default function AboutUsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        {/* About Us Hero Section */}
        <motion.section 
          className="pt-36 md:pt-36 xl:pt-48"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="container px-4 md:px-10 xl:px-32 2xl:px-40 mx-auto">
            <motion.div 
              className="mb-16"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <div className="flex flex-col xl:flex-row xl:gap-8 xl:items-center">
                <motion.h1 
                  className="font-playfair text-4xl md:text-6xl xl:text-[90px] mb-6 xl:mb-0"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.7 }}
                >
                  About Us
                </motion.h1>
                <motion.p 
                  className="text-gray-500 font-light text-[18px] lg:max-w-[600px]"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.7 }}
                >
              Since 2020, we&apos;ve brought authentic Italian flavors to Addis Ababa through our 10 perfected lasagna recipes and handmade pastas. More than just a restaurant, Sapore offers Italians a taste of home while introducing Ethiopians to beloved Italian cuisine, all in a warm, minimalist space designed for memorable meals with loved ones.
                </motion.p>
              </div>
            </motion.div>

            <motion.div 
              className="relative w-full h-[300px] md:h-[400px] overflow-hidden"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <Image
                src="/place1.jpg"
                alt="Restaurant interior"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </motion.section>

        {/* Our Chefs Section */}
        {/* <motion.section 
          className="py-16 md:py-24 xl:py-48"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <div className="container px-4 md:px-10 xl:px-32 2xl:px-40 mx-auto">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
                <motion.div 
                  className="text-center md:text-start"
                  initial={{ x: -30, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.7 }}
                >
                  <h2 className="font-playfair text-3xl md:text-4xl font-medium mb-6">Our Chefs</h2>
                  <p className="text-gray-500 font-light mb-4 text-[18px]">
                    At Sapore Restaurant, we bring the heart of Italy to Addis Ababa with our passion for authentic
                    flavors and handcrafted dishes. Known as &#34;The House of 10 Lasagnas&#34;
                    , we take pride in offering a
                    unique selection of lasagna alongside a variety of Italian classics, from fresh pasta to wood-fired
                    pizzas.
                  </p>
                  <p className="text-gray-500 font-light mb-4 text-[18px]">
                    Our team of experienced chefs, trained in traditional Italian cooking techniques, pour their
                    expertise and creativity into every dish. They carefully select the finest ingredients, combining
                    imported Italian specialties with fresh local produce to create an authentic yet innovative dining
                    experience.
                  </p>
                </motion.div>
                <motion.div 
                  className="relative w-full h-[320px] md:h-[500px] overflow-hidden"
                  initial={{ x: 30, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                >
                  <Image
                    src="/location.jpg"
                    alt="Restaurant interior"
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </motion.section> */}

        {/* Our Time Section */}
        <motion.section 
          className="py-16 md:py-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <div className="container px-4 md:px-10 xl:px-32 2xl:px-40 mx-auto">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
                {/* Text Section */}
                <motion.div 
                  className="text-center md:text-start order-1 md:order-2"
                  initial={{ x: 30, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.7 }}
                >
                  <h2 className="font-playfair text-3xl md:text-4xl font-medium mb-6">
                    Opening Hours
                  </h2>
                  <p className="text-gray-500 font-light mb-6 text-[18px]">
                    Our restaurant operates from 7:30 AM to 10 PM on weekdays and
                    Saturdays, and from 11 AM to 10 PM on Sundays.
                  </p>
                  <motion.div 
                    className="space-y-2"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ staggerChildren: 0.1 }}
                  >
                    <motion.div 
                      className="flex justify-between"
                      initial={{ y: 10, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      viewport={{ once: true }}
                    >
                      <span className="text-gray-500 font-light text-[18px]">Monday - Friday</span>
                      <span className="text-gray-500 font-light text-[18px]">7:30 AM - 10:00 PM</span>
                    </motion.div>
                    <motion.div 
                      className="flex justify-between"
                      initial={{ y: 10, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 }}
                    >
                      <span className="text-gray-500 font-light text-[18px]">Saturday</span>
                      <span className="text-gray-500 font-light text-[18px]">7:30 AM - 10:00 PM</span>
                    </motion.div>
                    <motion.div 
                      className="flex justify-between"
                      initial={{ y: 10, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 }}
                    >
                      <span className="text-gray-500 font-light text-[18px]">Sunday</span>
                      <span className="text-gray-500 font-light text-[18px]">11:00 AM - 10:00 PM</span>
                    </motion.div>
                  </motion.div>
                </motion.div>

                {/* Image Section */}
                <motion.div 
                  className="relative w-full h-[320px] md:h-[500px] overflow-hidden order-2 md:order-1"
                  initial={{ x: -30, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                >
                  <Image
                    src="/place4.jpg"
                    alt="Restaurant interior"
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </motion.section>
      </main>
    </div>
  );
}
