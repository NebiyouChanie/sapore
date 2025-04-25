import { verifySession } from "@/lib/session"
import {
    Command,
    BookOpenText,
    NotebookPen,
    StarIcon,
  } from "lucide-react"


// const user = verifySession()
export const data = {
    navMain: [
      {
        title: "Menu",
        url: "/admin/menu",
        icon: BookOpenText,
        isActive: true,
        items: [
          {
            title: "Add Item",
            url: "/admin/menu/add-item",
          },
          {
            title: "Categories",
            url: "/admin/menu/categories",
          },
        ],
      },
      {
        title: "Reservations",
        url: "/admin/reservations",
        icon: NotebookPen,
        items: [
          {
            title: "Add Reservation",
            url: "/admin/reservations/add",
          },
        ],
      },
    ],
     
  }