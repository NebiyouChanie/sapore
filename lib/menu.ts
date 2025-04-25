// lib/menu.ts
import { prisma } from "@/lib/prisma";
import { MenuItem } from "@/types";

export async function getMenuItems(isAdmin: boolean = false) {
  // Fetch menu settings (assume only one row exists)
  const menuSettings = await prisma.menuSettings.findFirst();

  // Fetch menu items with category included
  const menuItems = await prisma.menuItem.findMany({
    include: {
      category: true,
    },
  });

  if (isAdmin) return menuItems;

  // Modify for frontend based on settings
  return menuItems.map((item:MenuItem) => ({
    ...item,
    price: menuSettings?.showPrice ? item.price : null,
    description: menuSettings?.showDescription ? item.description : null,
  }));
}
