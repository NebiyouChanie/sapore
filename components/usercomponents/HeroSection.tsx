import * as motion from "motion/react-client";


import Link from "next/link";

function HeroSection() {
  return (
    <motion.section
      className="relative h-[100svh] overflow-hidden"
      style={{
        backgroundImage: "url(/hero-section.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center bottom 20%",
        backgroundRepeat: "no-repeat",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeInOut" }} // Slower fade-in
    >
      <motion.div 
        className="absolute inset-0 bg-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 2, ease: "easeInOut" }} // Slower overlay
      />
      
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4">
        {/* Main heading with slower staggered animation */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.3 // Increased stagger
              }
            }
          }}
        >
          <motion.h1
            variants={{
              hidden: { y: 50, opacity: 0 },
              visible: {
                y: 0,
                opacity: 1,
                transition: {
                  duration: 1.2, // Longer duration
                  ease: [0.2, 0, 0, 1] // Smoother easing
                }
              }
            }}
            className="text-4xl md:text-5xl lg:text-5xl xl:text-7xl"
            style={{ fontFamily: "var(--font-playfair-display)" }}
          >
            Welcome to Sapore!
          </motion.h1>
          <motion.h1
            variants={{
              hidden: { y: 50, opacity: 0 },
              visible: {
                y: 0,
                opacity: 1,
                transition: {
                  duration: 1.2,
                  ease: [0.2, 0, 0, 1],
                  delay: 0.3 // Consistent delay
                }
              }
            }}
            className="text-4xl md:text-5xl lg:text-5xl xl:text-7xl"
            style={{ fontFamily: "var(--font-playfair-display)" }}
          >
            The House of 10 Lasagnas
          </motion.h1>
        </motion.div>

        {/* Description with slower animation */}
        <motion.p
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            delay: 1.0, // Later start
            duration: 1.2, // Longer duration
            ease: [0.2, 0, 0, 1] // Smoother curve
          }}
          className="mt-4 max-w-xl font-light lg:text-[18px]"
        >
A little slice of Italy, right here in Addis. Home to 10 lovingly crafted lasagnas, pizzas, and pasta made with passion. Step inside, our table is set and the flavors are waiting.        
</motion.p>

        {/* Buttons with smoother, slower interactions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            delay: 1.4, // Later appearance
            duration: 1.0, // Slower fade-in
            ease: [0.2, 0, 0, 1]
          }}
          className="mt-8 flex gap-4"
        >
          <Link href="/booking">
            <motion.button
              className="bg-white font-semibold hover:bg-transparent hover:text-white text-black py-2 px-6 text-sm border border-white w-fit"
              whileHover={{ 
                scale: 1.05,
                transition: { 
                  duration: 0.4, // Slower hover
                  ease: [0.2, 0, 0, 1] 
                }
              }}
              whileTap={{ 
                scale: 0.98, // More subtle press
                transition: { 
                  duration: 0.3 // Slower tap
                }
              }}
            >
              Book Table
            </motion.button>
          </Link>
          <Link href="/menu">
            <motion.button
              className="bg-transparent font-semibold hover:bg-white hover:text-black text-white py-2 px-6 text-sm border border-white w-fit"
              whileHover={{ 
                scale: 1.05,
                backgroundColor: "#ffffff",
                color: "#000000",
                transition: { 
                  duration: 0.4,
                  ease: [0.2, 0, 0, 1]
                }
              }}
              whileTap={{ 
                scale: 0.98,
                transition: { 
                  duration: 0.3
                }
              }}
            >
              View Menu
            </motion.button>
          </Link>
        </motion.div>

        {/* Slower scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.0, duration: 1.2 }} // Later and slower
          className="absolute bottom-8 left-0 right-0 flex justify-center"
        >
          <motion.div
            animate={{ 
              y: [0, 15, 0], // Increased movement
            }}
            transition={{
              duration: 3, // Much slower oscillation
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-8 h-8"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="text-white w-6 h-6 mx-auto"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default HeroSection;