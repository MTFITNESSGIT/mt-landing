import Plan from "./Plan";
import { plans } from "../utils/plans";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

const PlansCarousel = () => {
  return (
    <>
      <Carousel
        className="w-full"
        orientation="horizontal"
        plugins={[
          Autoplay({
            delay: 3000,
          }),
        ]}
      >
        <CarouselContent className="w-full max-w-[350px] sm:max-w-[500px] md:max-w-full lg:max-w-[1000px]">
          {plans.map((plan, i) => {
            return (
              <CarouselItem
                className="basis-full md:basis-1/2 lg:basis-1/3"
                key={i}
              >
                <Plan
                  title={plan.title}
                  background={plan.background}
                  category={plan.category}
                  quantity={plan.quantity}
                  price={plan.price}
                />
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>
    </>
  );
};

export default PlansCarousel;
