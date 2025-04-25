"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";

export default function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const [isTransparent, setIsTransparent] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();  

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const heroThreshold = window.innerHeight * 0.3; 
      // Header visibility on scroll
      setIsVisible(currentScrollY <= lastScrollY);

      // Make header transparent only if scrollY is less than heroThreshold
      setIsTransparent(currentScrollY < heroThreshold);

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
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          isTransparent ? "bg-transparent text-white" : "bg-white text-black shadow-md "
        } ${isVisible ? "translate-y-0" : "-translate-y-full "}`}
      >
        <div className="container px-4 md:px-10 xl:px-32 2xl:px-40 mx-auto flex h-20 md:h-24 items-center justify-between">
          {/* Logo */}
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
            <div className={`flex flex-col ml-2 ${isTransparent ? "text-white" : "text-black"}`}>
              <span className="font-playfair text-lg font-medium">Sapore</span>
              <span className="font-inter text-sm font-extralight">Italian Restaurant</span>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex">
            <ul className="flex gap-6">
              <li>
                <Link
                  href="/"
                  className={`font-medium transition-colors ${pathname === "/" || pathname === "" ? "text-amber-600" : "hover:text-amber-600"} ${isTransparent ? "text-amber-600" : "text-amber-600"}`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about-us"
                  className={`font-medium transition-colors ${
                    pathname === "/about-us" ? "text-amber-600" : "hover:text-amber-600"
                  } ${isTransparent ? "text-white" : "text-black"}`}
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/menu"
                  className={`font-medium transition-colors ${
                    pathname === "/menu" ? "text-amber-600" : "hover:text-amber-600"
                  } ${isTransparent ? "text-white" : "text-black"}`}
                >
                  Menu
                </Link>
              </li>
              <li>
                <Link
                  href="/location"
                  className={`font-medium transition-colors ${
                    pathname === "/location" ? "text-amber-600" : "hover:text-amber-600"
                  } ${isTransparent ? "text-white" : "text-black"}`}
                >
                  Location
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  className={`font-medium transition-colors ${
                    pathname === "/gallery" ? "text-amber-600" : "hover:text-amber-600"
                  } ${isTransparent ? "text-white" : "text-black"}`}
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  href="/booking"
                  className={`font-medium transition-colors ${
                    pathname === "/booking" ? "text-amber-600" : "hover:text-amber-600"
                  } ${isTransparent ? "text-white" : "text-black"}`}
                >
                  Booking
                </Link>
              </li>
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden cursor-pointer" onClick={toggleSidebar}>
            <Menu className={isTransparent ? "text-white" : "text-black"} />
          </button>
        </div>
      </header>

      {/* Sidebar Component */}
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </>
  );
}
