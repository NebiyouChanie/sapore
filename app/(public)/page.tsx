import Header from '@/components/usercomponents/Home-Header'
import FoodGallery from "@/components/usercomponents/FoodGrid"
import HeroSection from "@/components/usercomponents/HeroSection"
import AboutusSection from "@/components/usercomponents/Aboutus-Section"
import SpecialsSection from "@/components/usercomponents/SpecialsSection"
import MenuSection from "@/components/usercomponents/Menu-section"
import LocationSection from "@/components/usercomponents/LocationSection"
import TestimonialSection from "@/components/usercomponents/TestimonialSection"
import BookingSection from "@/components/usercomponents/BookingSection"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      
      <Header/>

      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection />

        {/* About Us Section */}
        <AboutusSection />

        {/* Our Specials Section */}
        <SpecialsSection />

        {/* Our Menu Section */}
        <MenuSection />

        {/* Gallery Section */}
        <section id="gallery" className="   ">
          <div className="container px-4 md:px-10 xl:px-32 2xl:px-40 mx-auto">
             <FoodGallery />
          </div>
        </section>

        {/* Location Section */}
        <LocationSection />

        {/* Testimonials Section */}
        <TestimonialSection />

        {/* Booking Section */}
        <BookingSection />
        </main>
      </div>
  )
}

