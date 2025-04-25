"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";
import { usePathname } from "next/navigation"; // Import usePathname to get the current path

export default function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname(); // Get the current pathname

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <header
        className={`fixed top-0 z-50 w-full bg-white text-black transition-transform duration-300 ${
          isVisible ? "translate-y-0 shadow-md " : "-translate-y-full "
        }`}
      >
        <div className="container px-4 md:px-10 xl:px-32 2xl:px-40 mx-auto flex h-20 md:h-24 items-center justify-between">
          <Link href="/" className="flex items-center">
            <div className="rounded-full w-[60px] h-[60px] xl:w-[80px] xl:h-[80px] relative">
              <Image
                src="/sapore-logo.svg"
                alt="Sapore Logo"
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            </div>
            <div className="flex flex-col ml-2">
              <span className="font-playfair text-lg font-medium">Sapore</span>
              <span className="font-inter text-sm font-extralight">Italian Restaurant</span>
            </div>
          </Link>

          <nav className="hidden md:flex gap-6">
            <Link
              href="/"
              className={`font-medium transition-colors ${pathname === "/" ? "text-amber-600" : "hover:text-amber-600"}`}
            >
              Home
            </Link>
            <Link
              href="/about-us"
              className={`font-medium transition-colors ${pathname === "/about-us" ? "text-amber-600" : "hover:text-amber-600"}`}
            >
              About Us
            </Link>
            <Link
              href="/menu"
              className={`font-medium transition-colors ${pathname === "/menu" ? "text-amber-600" : "hover:text-amber-600"}`}
            >
              Menu
            </Link>
            <Link
              href="/location"
              className={`font-medium transition-colors ${pathname === "/location" ? "text-amber-600" : "hover:text-amber-600"}`}
            >
              Location
            </Link>
            <Link
              href="/gallery"
              className={`font-medium transition-colors ${pathname === "/gallery" ? "text-amber-600" : "hover:text-amber-600"}`}
            >
              Gallery
            </Link>
            <Link
              href="/booking"
              className={`font-medium transition-colors ${pathname === "/booking" ? "text-amber-600" : "hover:text-amber-600"}`}
            >
              Booking
            </Link>
          </nav>

          <button className="md:hidden cursor-pointer" onClick={toggleSidebar}>
            <Menu />
          </button>
        </div>
      </header>

      {/* Sidebar Component */}
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </>
  );
}
