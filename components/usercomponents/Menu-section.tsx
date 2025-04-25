import * as motion from "motion/react-client";
import Link from 'next/link';
import Image from "next/image";

function MenuSection() {
  return (
    <section id="menu" className="py-16 md:py-24 xl:pb-32">
      <div className="container px-4 md:px-10 xl:px-32 2xl:px-40 mx-auto">
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Image Section with Motion */}
          <motion.div
            whileInView={{ opacity: 1, x: 0 }}  // Image moves to normal position
            initial={{ opacity: 0, x: -100 }}  // Image starts from the left
            transition={{ duration: 1, ease: "easeInOut" }}
            viewport={{ once: true }}
            className="relative h-[320px] md:h-[500px] overflow-hidden order-2 md:order-1"
          >
            <Image
              src="/menu-section.jpg"
              alt="Signature pasta dish"
              fill
              className="object-cover"
            />
          </motion.div>

          {/* Text Section with Motion */}
          <motion.div
            whileInView={{ opacity: 1, x: 0 }}  // Text moves to normal position
            initial={{ opacity: 0, x: 100 }}  // Text starts from the right
            transition={{ duration: 1.3, ease: "easeInOut" }}
            viewport={{ once: true, amount: 0.5 }}  // Trigger when 50% of the element is visible
            className="order-1 md:order-2 text-center md:text-start"
          >
            <h2 className="font-playfair text-4xl md:text-5xl font-medium mb-6">Our Menu</h2>
            <p className="text-gray-500 font-light text-[18px] mb-4">
  We blend Italian tradition with bold flavors and fresh ingredients, offering a menu that celebrates authenticity. From <strong>crispy pizzas</strong> like <strong>Quattro Formaggi</strong> and <strong>Pepperoni</strong> to rich, comforting <strong>pastas</strong> such as <strong>Chicken Alfredo</strong>, <strong>Ragu</strong>, and <strong>Pesto Pasta with Fish</strong>, every dish is crafted with care. Our <strong>lasagnas</strong> are a specialty, with options like the indulgent <strong>Sapore Lasagna</strong>, the fresh <strong>Lasagna Verde</strong>, and the hearty <strong>Beef Lasagna</strong>, each layered to perfection.
</p>

<p className="text-gray-500 font-light text-[18px] mb-4">
  Beyond Italian classics, the menu features <strong>juicy burgers, crispy sandwiches, and fresh salads</strong>, perfect for any craving. Those looking for Ethiopian flavors will love the <strong>Chigina Tibs, Tibs Firfir, and Shiro</strong>, served with injera for a comforting, home-style touch. For a complete meal, pair your dish with a <strong>grilled steak, fish, or chicken combo</strong> and enjoy flavors made to be shared.
</p>

            <Link href="/menu">
              <button
                className="bg-white font-medium hover:bg-black hover:text-white text-black py-2 px-6 text-sm transition-all ease-in-out duration-300 border border-black w-fit mt-6"
              >
                View Menu
              </button>
            </Link>  
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default MenuSection;
