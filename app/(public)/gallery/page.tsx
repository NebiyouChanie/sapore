import * as motion from "motion/react-client";
 

import GridGallery from "@/components/usercomponents/FoodGrid";
import Header from "@/components/usercomponents/Header";


export default function AboutUsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        {/* Gallery Hero Section */}
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
                  
                >
                  Gallery
                </motion.h1>
                 
              </div>
            </motion.div>

            <div 
              className="relative w-full overflow-hidden"
            >
              <GridGallery />
              <GridGallery />
              <GridGallery />
              <GridGallery />
            </div>
          </div>
        </motion.section>
      </main>
    </div>
  );
}