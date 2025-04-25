"use client";

import Link from "next/link";
import Image from "next/image";
import { X } from "lucide-react";
import { usePathname } from "next/navigation";

interface SidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

export default function Sidebar({ isSidebarOpen, toggleSidebar }: SidebarProps) {
  const pathname = usePathname(); // Get the current route
  const links = [
    { href: "/", label: "Home" },
    { href: "/about-us", label: "About Us" },
    { href: "/menu", label: "Menu" },
    { href: "/location", label: "Location" },
    { href: "/gallery", label: "Gallery" },
    { href: "/booking", label: "Booking" },
  ];

  return (
    <>
      <aside
        className={`fixed top-0 left-0 z-[1000] h-screen w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out 
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <div className="flex items-center">
            <div className="rounded-full w-12 h-12 relative">
              <Image
                src="/sapore-logo.svg"
                alt="Sapore Logo"
                fill
                className="rounded-full object-cover"
              />
            </div>
            <div className="ml-3">
              <span className="font-playfair text-lg font-medium">Sapore</span>
              <br />
              <span className="font-inter text-sm font-extralight">Italian Restaurant</span>
            </div>
          </div>
          <button onClick={toggleSidebar} className="text-black">
            <X size={28} />
          </button>
        </div>

        <nav className="mt-4 px-6">
          {links.map(({ href, label }) => (
            <Link key={href} href={href} onClick={toggleSidebar}>
              <span
                className={`block py-3 px-2 text-black font-medium transition-all duration-200 cursor-pointer
                  ${pathname === href ? 'bg-black text-white' : 'hover:bg-black hover:text-white'}`}
              >
                {label}
              </span>
            </Link>
          ))}
        </nav>
      </aside>

      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-10 z-[900]" onClick={toggleSidebar}></div>
      )}
    </>
  );
}
