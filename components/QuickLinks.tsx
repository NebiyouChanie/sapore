"use client";

import * as motion from "motion/react-client";
import SmoothScrollLink from "./SmoothScrollLink";

interface Category {
  id: string;
  name: string;
}

export default function QuickLinks({ categories }: { categories: Category[] }) {
  return (
    <motion.div 
      className="mb-10 sticky top-6 z-10 bg-white/90 backdrop-blur-sm py-4 px-6 rounded-lg shadow-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.8 }}
    >
      <h2 className="font-medium mb-4">Quick Links:</h2>
      <div className="flex flex-wrap gap-4">
        {categories.map((category) => (
          <motion.div
            key={category.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <SmoothScrollLink href={`#${category.name.toLowerCase().replace(/\s+/g, "-")}`}>
              <div className="px-4 py-2 bg-gray-100 hover:bg-amber-100 transition-colors cursor-pointer">
                {category.name}
              </div>
            </SmoothScrollLink>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}