import "blaze-slider/dist/blaze.css";
import type { RefObject } from "preact";
import { useBlazeSlider } from "../hooks/useBlazeSlider";
import { type Image } from "../utils/types";

interface Props<T> {
  active: boolean;
  images: Image[];
  refImgNew: RefObject<T>;
}

// dame nummeros multiplos de 5 hasta llegar a 100

export const Slider = <T extends HTMLElement>({
  active,
  images,
  refImgNew
}: Props<T>) => {
  const { refSlider, imgIndex } = useBlazeSlider({
    active,
    config: {
      all: {
        draggable: true,
        slidesToShow: 1,
        slideGap: "0px"
      }
    }
  });

  return (
    <div class="blaze-slider aspect-square w-full" ref={refSlider}>
      <div
        class="blaze-container"
        ref={refImgNew as unknown as RefObject<HTMLDivElement>}
      >
        <div class="blaze-track-container">
          <div class="blaze-track">
            {images.map((img) => {
              return (
                <picture class="block aspect-square w-full">
                  <img
                    decoding="async"
                    key={img.alt}
                    class="aspect-square w-full object-cover"
                    {...img}
                  />
                </picture>
              );
            })}
          </div>
        </div>

        <div class="absolute left-2 top-2 flex h-6 w-10 items-center justify-center rounded-2xl bg-[hsla(0,0%,15%,0.8)] text-sm text-white lg:h-8 lg:w-[52px] lg:text-lg">{`${imgIndex}/${images.length}`}</div>

        <button
          title="Anterior"
          class="blaze-prev absolute left-2 top-2/4 flex h-6 w-6 items-center justify-center rounded-full bg-white font-mono text-lg font-bold opacity-60 hover:opacity-70 lg:h-10 lg:w-10 lg:text-3xl"
          aria-label="Go to previous slide"
        >
          {"<"}
        </button>

        <button
          title="Siguiente"
          class="blaze-next absolute right-2 top-2/4 flex h-6 w-6 items-center justify-center rounded-full bg-white font-mono text-lg font-bold opacity-60 hover:opacity-70 lg:h-10 lg:w-10 lg:text-3xl"
          aria-label="Go to next slide"
        >
          {">"}
        </button>
      </div>
    </div>
  );
};
