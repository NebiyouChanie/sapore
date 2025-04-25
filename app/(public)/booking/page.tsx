import * as motion from "motion/react-client";

import BookingForm from "@/components/usercomponents/BookingForm";
import Header from "@/components/usercomponents/Header";
import Image from "next/image";

export default function Booking() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        {/* Booking Hero Section */}
        <motion.section 
          className="pt-36 md:pt-36 xl:pt-48 mb-16"
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
                  Booking
                </motion.h1>
                <motion.p 
                  className="text-gray-500 font-light text-[18px] lg:max-w-[600px]"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.7 }}
                >
                  We can&apos;t wait to welcome you to Sapore! Our doors are open, and we promise you an unforgettable experience filled with warmth, exceptional food, and genuine hospitality. Whether it&apos;s your first visit or your tenth, we&apos;re here to make every moment special. Book your table today, and let us create memories together that you&apos;ll cherish forever.

                </motion.p>
              </div>
            </motion.div>

            <div 
               
            >
              <div className="grid md:grid-cols-2 xl:grid-cols-[1fr_2fr] items-center gap-0">
                <div>
                  <BookingForm />
                </div>
                
                <div 
                  className="relative border border-black w-full h-[300px] md:h-full"
                >
                  <Image
                    src="/table.png"
                    alt="Restaurant interior"
                    fill
                    className="object-cover"
                    priority
                  />
                  <div 
                    className="absolute inset-0 bg-black/30 flex items-center justify-center"
                  >
                    <motion.p 
                      className="text-white text-2xl md:text-3xl lg:text-5xl font-playfair text-center px-4"
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6, duration: 0.7 }}
                    >
                      Book An Unforgettable Moment
                    </motion.p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      </main>
    </div>
  );
}