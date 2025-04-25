import * as motion from "motion/react-client";
import Link from 'next/link'
import Image from "next/image"

function TestimonialSection() {
  return (
    <section className="py-20 md:py-24 bg-gray-800 text-white relative">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0"
        style={{ 
          backgroundImage: "url(/location.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center bottom 20%",
          backgroundRepeat: "no-repeat",
          zIndex: 0 
        }}
      />
      <div className="absolute inset-0 bg-black opacity-70 z-10"></div> 

      {/* Content Container */}
      <div className="container px-4 md:px-10 xl:px-32 2xl:px-40 mx-auto text-center relative z-20">
        <h2 className="font-playfair text-4xl md:text-5xl mb-12">
          Words From Happy Customers
        </h2>

        <div className="grid md:grid-cols-3 gap-8 mb-8 relative z-20">
          {/* Testimonial 1 */}
          <motion.div
            className="flex"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.5 }}  // Start animation when 50% of the element is in view
          >
            <div className="mr-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden">
                <Image
                  src="/testimonial1.png"
                  alt="Customer 1"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            
            <div className="text-start">
              <Link href='https://g.co/kgs/Wk8Krny'>
              <p className="italic mb-4">
              &quot;Saphore Addis is an exceptional restaurant with a relaxed and inviting atmosphere. The food is simply amazing, and I highly recommend trying their lasagna, which tastes like a homemade delight. The flavors are perfectly balanced, and each bite is a delightful experience.&apos;               </p>
              <p className="font-medium">
              - Bethlehem Abera</p>
              </Link>
            </div>
          </motion.div>

          {/* Testimonial 2 */}
          <motion.div
            className="flex"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay:0.2 }}
            viewport={{ once: true, amount: 0.5 }}  // Start animation when 50% of the element is in view
          >
            <div className="mr-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden">
                <Image
                  src="/testimonial2.png"
                  alt="Customer 2"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="text-start">
              <Link href='https://g.co/kgs/jPna7Yw'>
              <p className="italic mb-4">
              &quot;Loved this place so much. The mamamia burger and lasagna is to die for🤤and the service was amazing.&apos;
               </p>
              <p className="font-medium">- Seli</p>
              </Link>
            </div>
          </motion.div>

          {/* Testimonial 3 */}
          <motion.div
            className="flex"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay:0.3 }}
            viewport={{ once: true, amount: 0.5 }}   
          >
            <div className="mr-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden">
                <Image
                  src="/testimonial3.png"
                  alt="Customer 3"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="text-start">
              <Link href='https://g.co/kgs/CKxJhDT'>
              <p className="italic mb-4">
              &apos;I visited this restaurant at times, and the food is always delicious. The atmosphere is welcoming, and the staff is incredibly kind and friendly. The only downside is that the food can take a bit longer to arrive than expected, but it&apos;s definitely worth the wait. Highly recommend!&apos;
               </p>
              <p className="font-medium">
              - Elshaday Tsega
              </p>
              </Link>
            </div>
          </motion.div>
        </div>

         
          <Link
            href="https://www.google.com/search?sca_esv=dbb5466b0453cba2&sxsrf=AHTn8zqqlSPM7jJXzL9ANRVQkT-CuEdnSQ:1743403860199&si=APYL9bs7Hg2KMLB-4tSoTdxuOx8BdRvHbByC_AuVpNyh0x2KzV8Hia0_ZXP3CfIh37VJoIrtJ76UMXf-Lp74dXpgwc1hxhEeNgOfaA7CtOhtavs2VuPLhwHRaMOf-Qy6lywP3yGPfPGZCHoZe4Cd92Eb_0W5W-JViQ%3D%3D&q=Sapore+Restaurant+Reviews&sa=X&ved=2ahUKEwjW86W-3bOMAxXxWkEAHc0KMYAQ0bkNegQIJhAD&biw=1920&bih=957&dpr=1#lrd=0x164b857383d8db3b:0x71c62f42ce8ff2db,3,,,,"
            className="bg-white font-medium hover:bg-transparent hover:text-white hover:border-white border border-transparent text-black px-6 py-2 transition-colors relative z-20"
          >
            Rate Us
          </Link>
        
      </div>
    </section>
  )
}

export default TestimonialSection;
