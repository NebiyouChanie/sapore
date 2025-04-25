import { Instagram } from "lucide-react"
import Image from "next/image"
import Link from "next/link"


function Footer() {
  return (
    <footer className="bg-black text-white py-12 mt-16 flex flex-col justify-center text-center">
        <div className="container px-4 md:px-10 xl:px-32 2xl:px-40 mx-auto ">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex justify-center items-center gap-2">
                <div className="rounded-full">
                  <Image
                    src="/sapore-logo.svg"
                    alt="Sapore Logo"
                    width={80}
                    height={80}
                    className="rounded-full"
                  />
                </div>
                <span className="font-playfair text-lg font-medium">Sapore Restaurant</span>
              </div>
            </div>
            <div>
              <h4 className=" text-lg font-medium mb-4" style={{ fontFamily: "var(--font-playfair-display)" }}>Address</h4>
              <p className="text-sm text-gray-400 mb-1"> Zimbabwe St</p>
              <p className="text-sm text-gray-400 mb-4">Bole, Addis Ababa</p>
              <p className="text-sm text-gray-400 mb-1">+251 91 143 9712</p>
              <p className="text-sm text-gray-400">+251 988438888</p>
            </div>
            <div>
              <h4 className="text-lg font-medium mb-4" style={{ fontFamily: "var(--font-playfair-display)" }}>Quick links</h4>
              <div className="space-y-2">
                <p>
                  <Link href="/" className="text-sm text-gray-400 hover:text-white transition-colors">
                    Home
                  </Link>
                </p>
                <p>
                  <Link href="/about-us" className="text-sm text-gray-400 hover:text-white transition-colors">
                    About
                  </Link>
                </p>
                <p>
                  <Link href="/menu" className="text-sm text-gray-400 hover:text-white transition-colors">
                    Menu
                  </Link>
                </p>
                <p>
                  <Link href="/booking" className="text-sm text-gray-400 hover:text-white transition-colors">
                    Book a table
                  </Link>
                </p>
                <p>
                  <Link href="/location" className="text-sm text-gray-400 hover:text-white transition-colors">
                    Location
                  </Link>
                </p>
                <p>
                  <Link href="/gallery" className="text-sm text-gray-400 hover:text-white transition-colors">
                    Gallery
                  </Link>
                </p>
              </div>
            </div>
            <div>
              <h4 className="font-playfair text-lg font-medium mb-4">Social media</h4>
              <div className="flex gap-4 justify-center">
                <Link href="https://www.instagram.com/sapore.restaurant?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" className="text-gray-400 hover:text-white transition-colors">
                  <Instagram size={20} />
                </Link>
              </div>
            </div>
          </div>
          <div className="pt-8 md:pt-12 text-center">
            Devleoped by: Nebiyou +251 984891455
          </div>
        </div>
      </footer>

  )
}

export default Footer