import Header from "@/components/usercomponents/Header";
import Image from "next/image";
import * as motion from "motion/react-client";
import QuickLinks from "@/components/QuickLinks";

interface Category {
  id: string;
  name: string;
}

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

import { fetchCategories as getCategories } from "@/lib/categories";
import { getMenuItems } from "@/lib/menu";

interface CategoryWithItems extends Category {
  items: MenuItem[];
  imageUrl: string;
}
export const dynamic = 'force-dynamic'

export default async function MenuPage() {
  const [categories, menuItems] = await Promise.all([
    getCategories(),
    getMenuItems()
  ]);

  // Group menu items by category
  const categoriesWithItems: CategoryWithItems[] = categories.map((category: Category) => {
    const items = menuItems.filter((item: MenuItem) => item.categoryId === category.id);
    return {
      ...category,
      items,
      imageUrl: items.length > 0 ? items[0].imageUrl : "/placeholder.svg"
    };
  }).filter((category: CategoryWithItems) => category.items.length > 0);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        {/* Menu Hero Section */}
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
                  Menu
                </motion.h1>
                <motion.p 
                  className="text-gray-500 font-light text-[18px] lg:max-w-[600px]"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.7 }}
                >
                  We blend Italian tradition with bold flavors and fresh ingredients, offering crispy pizzas like Quattro Formaggi and Pepperoni, rich pastas such as Chicken Alfredo and Pesto Pasta with Fish, and specialty lasagnas like Sapore Lasagna and Beef Lasagna, alongside juicy burgers, fresh salads, and Ethiopian favorites like Chigina Tibs and Shiro. all crafted for sharing and satisfaction.
                </motion.p>
              </div>
            </motion.div>

            {categories.length > 0 && (
              <QuickLinks categories={categories} />
            )}
          </div>
        </motion.section>

        {/* Menu Categories Section */}
        <section className="pb-20">
          <div className="container px-4 md:px-10 xl:px-32 2xl:px-40 mx-auto">
            {categoriesWithItems.length > 0 ? (
              categoriesWithItems.map((category: CategoryWithItems, catIndex: number) => (
                <motion.section 
                  key={category.id} 
                  id={category.name.toLowerCase().replace(/\s+/g, "-")} 
                  className="mb-20 scroll-mt-32"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: catIndex * 0.1, duration: 0.6 }}
                >
                  <div className="grid md:grid-cols-[300px_1fr] gap-8">
                    {/* Category Image */}
                    <motion.div 
                      className="relative h-[400px] rounded-lg overflow-hidden"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <Image
                        src={category.imageUrl}
                        alt={category.name}
                        fill
                        className="object-cover"
                        priority
                        sizes="(max-width: 768px) 100vw, 300px"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center p-6">
                        <h2 className="font-playfair text-4xl font-medium text-white">{category.name}</h2>
                      </div>
                    </motion.div>

                    {/* Menu Items */}
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {category.items.map((item: MenuItem, itemIndex: number) => (
                          <motion.div 
                            key={item.id} 
                            className="flex gap-4 group"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: itemIndex * 0.05, duration: 0.5 }}
                          >
                            <motion.div 
                              className="relative w-20 h-20 rounded-md overflow-hidden shrink-0"
                              whileHover={{ scale: 1.1 }}
                            >
                              <Image
                                src={item.imageUrl || "/placeholder.svg"}
                                alt={item.name}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform"
                                sizes="80px"
                              />
                            </motion.div>
                            <div>
                              <div className="flex justify-between">
                                <h3 className="font-playfair font-bold">
                                  {item.name}
                                </h3>
                                <span className="font-medium">{item?.price?.toFixed(2)}</span>
                              </div>
                              <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.section>
              ))
            ) : (
              <motion.div 
                className="text-center py-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-2xl font-bold mb-4">Menu Not Available</h2>
                <p className="text-gray-600">We are having trouble loading our menu. Please try again later.</p>
              </motion.div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
