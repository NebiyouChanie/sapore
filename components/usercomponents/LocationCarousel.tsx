import Image from "next/image"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
 

const locationImages = [
  '/place4.jpg',
  '/place1.jpg',
  '/place2.jpg',
  '/place3.jpg',
  '/place5.jpg',
  '/place6.jpg',
  '/location5.jpg',
  '/location2.jpg',
  '/location3.jpg',
  '/location4.jpg',
  '/location6.jpg',
]

function LocationCarousel() {
  return (
    <div className="relative mx-auto">
        <Carousel className="relative">
        <CarouselContent>
            {locationImages.map((img, index) => (
            <CarouselItem key={index}>
                <div className="relative w-full h-[300px] md:h-[400px]">
                <Image
                    src={img}
                    alt={`Sapore Restaurant ${index + 1}`}
                    fill
                    className="object-cover"
                    priority={index === 0}
                />
                </div>
            </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black" />
        <CarouselNext className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black" />
        </Carousel>
    </div>
  )
}

export default LocationCarousel