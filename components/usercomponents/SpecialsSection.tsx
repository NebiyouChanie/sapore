import * as motion from "motion/react-client";
import Image from "next/image";

interface MenuItem {
  id: string;
  name: string;
  description: string | null; 
  price: number | null; 
  isMainMenu: boolean;
  imageUrl: string;
  isSpecial: boolean;
  itemType: 'starter' | 'maindish' | 'dessert';
  categoryId: string;
  category: {
    id: string;
    name: string;
  };
}

import { getMenuItems } from "@/lib/menu";

async function getSpecialItems(): Promise<MenuItem[]> {
  try {
    const allItems = await getMenuItems(); 
    return allItems.filter((item: MenuItem) => item.isSpecial).slice(0, 4);
  } catch (error) {
    console.error('Error fetching special items:', error);
    return [];
  }
}


export default async function SpecialsSection() {
  const specialItems = await getSpecialItems();

  return (
    <section className="py-16 md:py-24">
      <div className="container px-4 md:px-10 xl:px-32 2xl:px-40 mx-auto text-center">
        <h2 className="font-playfair text-4xl md:text-5xl font-medium mb-4">Our Specials</h2>
        <p className="text-gray-500 font-light text-[18px] max-w-2xl mx-auto mb-12">
          Four of our 10 signature lasagnas, each representing the diverse culinary traditions of Italy.
        </p>

        {specialItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {specialItems.map((item, index) => (
              <motion.div
                key={item.id}
                className="flex flex-col items-center"
                initial={{ opacity: 0, x: -50, rotate: -20 }} 
                whileInView={{
                  opacity: 1,
                  x: 0,
                  rotate: 0,  
                }}
                viewport={{ once: true, amount: 0.5 }} 
                transition={{
                  duration: 0.7,
                  delay: index * 0.2, 
                  ease: "easeInOut",
                }}
              >
                <div className="relative w-[280px] h-[280px] rounded-full overflow-hidden mb-2">
                  <Image
                    src={item.imageUrl || "/special.jpg"}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="font-playfair font-medium text-lg">{item.name}</h3>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No special items available at the moment.</p>
        )}
      </div>
    </section>
  );
}