import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { certifications } from "@/utils/certifications";

const CertificationsCarousel = () => {
  return (
    <>
      <Carousel
        orientation="horizontal"
        plugins={[
          Autoplay({
            delay: 3000,
          }),
        ]}
      >
        <CarouselContent>
          {certifications.map((certificate, i) => (
            <CarouselItem className="md:basis-1/2 lg:basis-1/3" key={i}>
              <Image
                src={certificate}
                alt={certificate}
                width="400"
                height="300"
                className="w-full h-full max-w-[500px] max-h-[400px]"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>
    </>
  );
};

export default CertificationsCarousel;
