import { experiences } from "@/utils/experiences";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

const CarouselExperience = () => {
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
          {experiences.map((experience, i) => (
            <CarouselItem className="md:basis-1/2 lg:basis-1/3" key={i}>
              <Image
                src={experience}
                alt={experience}
                width="500"
                height="500"
                className="w-full h-full "
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

export default CarouselExperience;
