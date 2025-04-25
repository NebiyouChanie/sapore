import Header from "@/components/usercomponents/Header"
import Link from "next/link"
import LocationCarousel from "@/components/usercomponents/LocationCarousel";
import * as motion from "motion/react-client";

 
export default function Location() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        {/* Location Hero Section */}
        <motion.section 
          className="pt-36 md:pt-36 xl:pt-48 pb-16 md:pb-24"
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
                  Location
                </motion.h1>
                <motion.p 
                  className="text-gray-500 font-light text-[18px] lg:max-w-[600px]"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.7 }}
                >
                  Located in Bole on Zimbabwe Street, Sapore Restaurant is a welcoming place for meals with family, friends, or special events. It&apos;s easy to reach by bus or taxi, and has good parking space. Call +251 91 143 9712 to book a table
                </motion.p>
              </div>
            </motion.div>

            <motion.div 
              className="relative w-full h-[300px] md:h-[400px] overflow-hidden"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1217.3897886496147!2d38.78252046166136!3d8.990327096942769!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b857383d8db3b%3A0x71c62f42ce8ff2db!2sSapore%20Restaurant!5e1!3m2!1sen!2set!4v1743149221724!5m2!1sen!2set" 
                width="100%" 
                height="100%" 
                loading="lazy"
              ></iframe>
            </motion.div>

            <motion.div 
              className="flex gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <Link href="https://maps.app.goo.gl/4wmhy7Mi6CVzAwXk6">
                <motion.button
                  className="bg-black font-medium hover:bg-transparent hover:text-black border border-black text-white py-2 px-6 text-sm transition-colors w-fit mt-6"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Direction
                </motion.button>
              </Link>
              <Link href="tel:+251911439712">
                <motion.button
                  className="bg-white text-black font-medium hover:bg-black hover:text-white border border-black py-2 px-6 text-sm transition-colors w-fit mt-6"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Call Us
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </motion.section>

        {/* Location Carousel Section */}
        <motion.section 
          className="pb-16 md:pb-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <div className="container px-4 md:px-10 xl:px-32 2xl:px-40 mx-auto">
            <motion.div 
              className="xl:max-w-[50%] mx-auto"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.7 }}
            >
              <LocationCarousel />
            </motion.div>
          </div>
        </motion.section>
      </main>
    </div>
  );
}