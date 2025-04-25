import { MapPin, Phone } from "lucide-react";
import * as motion from "motion/react-client";
import Link from 'next/link';
import LocationCarousel from "./LocationCarousel";

function LocationSection() {
  return (
    <section id="location" className="py-16 md:py-24 lg:py-48">
      <div className="container px-4 md:px-10 xl:px-32 2xl:px-40 mx-auto">
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center ">
          
          {/* Text Section with Motion */}
          <motion.div
            whileInView={{ opacity: 1, x: 0 }}  // Text comes from the left to the right
            initial={{ opacity: 0, x: -100 }}  // Text starts from the left
            transition={{ duration: 1.3, ease: "easeInOut" }}
            viewport={{ once: true, amount: 0.5 }}  // Trigger when 50% of the element is visible
            className="text-center md:text-start"
          >
            <h2 className="font-playfair text-4xl md:text-5xl font-medium mb-6">Our Location</h2>
            <p className="text-gray-500 font-light text-[18px] mb-6">
              Located in the heart of the city, Sapore Restaurant is easily accessible by public transport and has
              ample parking nearby. Our warm and inviting space is perfect for intimate dinners, family gatherings,
              or special celebrations.
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3 ">
                <MapPin className="text-gray-500 mt-1 shrink-0" size={18} />
                <p className="text-gray-500 font-light text-[18px] ">Sapore Restaurant, Zimbabwe St, Addis Ababa</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="text-gray-500 shrink-0" size={18} />
                <p className="text-gray-500 font-light text-[18px] ">+251 91 143 9712</p>
              </div>
            </div>
            <div className="flex">
              <Link href='https://maps.app.goo.gl/4wmhy7Mi6CVzAwXk6'>
                <button
                  className="bg-black font-medium hover:bg-transparent hover:text-black border border-black text-white py-2 px-6 text-sm transition-colors w-fit mt-6"
                >
                  Open With Google Maps
                </button>
              </Link>
            </div>
          </motion.div>

          {/* Image Section with Motion */}
          <motion.div
            whileInView={{ opacity: 1, x: 0 }}   
            initial={{ opacity: 0, x: 100 }}  
            transition={{ duration: 1, ease: "easeInOut" }}
            viewport={{ once: true }}
            className=""
          >
            <div className="w-full">

            <LocationCarousel />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default LocationSection;
