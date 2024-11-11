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
        orientation="horizontal"
        plugins={[
          Autoplay({
            delay: 3000,
          }),
        ]}
      >
        <CarouselContent className="w-full max-w-[340px] sm:max-w-[500px] md:max-w-full">
          {plans.map((plan, i) => {
            return (
              <CarouselItem
                className="basis-full md:basis-1/2 lg:basis-1/3 mx-[2px]"
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
