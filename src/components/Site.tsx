import "blaze-slider/dist/blaze.css";
import { useRef } from "preact/hooks";
import { useBlazeSlider } from "../hooks/useBlazeSlider";
import { useVisiblePosition } from "../hooks/useVisiblePosition";

import { type TourismSite } from "../utils/types";

const FIRST_IMG = 0;

export const Site = ({ title, description, images, id }: TourismSite) => {
  const refImgPrev = useRef<HTMLImageElement>(null);
  const refImgNew = useRef<HTMLImageElement>(null);
  const refDialog = useRef<HTMLDialogElement>(null);
  const refContainerImgNew = useRef<HTMLDivElement>(null);

  const { handleSite, active, closeSite } = useVisiblePosition({
    refImgNew,
    refImgPrev,
    refDialog,
    refContainerImgNew,
    optionsKey: {
      duration: 400,
      iterations: 1,
      easing: "ease"
    }
  });

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
    <>
      <figure
        title="click para mas contenido"
        class="figure-border relative aspect-square w-[45%] max-w-72 cursor-pointer border-[2px] after:absolute after:top-0 after:aspect-square after:w-full after:bg-black after:opacity-30 after:transition-opacity after:content-[''] lg:after:hover:opacity-10"
        onClick={handleSite}
      >
        <img
          ref={refImgPrev}
          class="h-full w-full object-cover object-center"
          {...images[FIRST_IMG]}
        />
        <figcaption class="bg-tr bg-black-opac md absolute bottom-0 z-10 inline-block w-full p-1 py-2 text-center text-xs font-bold sm:text-sm">
          {title}
        </figcaption>
      </figure>
      {active && (
        <dialog
          ref={refDialog}
          class="h-3/4 w-5/6 max-w-96 overflow-visible bg-transparent backdrop:bg-black backdrop:bg-opacity-50 focus-visible:outline-none lg:h-fit lg:w-5/6 lg:max-w-5xl"
        >
          <button
            title="cerrar"
            class="absolute -right-8 -top-20 h-7 w-7 before:absolute before:left-0 before:h-[3px] before:w-7 before:rotate-45 before:rounded-md before:bg-white before:content-[''] after:absolute after:left-0 after:h-[3px] after:w-7 after:-rotate-45 after:rounded-md after:bg-white after:content-[''] hover:before:bg-gray-300 hover:after:bg-gray-300 lg:-right-20 lg:-top-10"
            onClick={closeSite}
          ></button>
          <div class="h-full lg:grid lg:grid-cols-[1fr_350px] lg:grid-rows-1">
            <div class="blaze-slider aspect-square w-full" ref={refSlider}>
              <div class="blaze-container">
                <div ref={refContainerImgNew} class="blaze-track-container">
                  <div class="blaze-track">
                    {images.map((img, i) => {
                      return (
                        <picture class="block aspect-square w-full">
                          <img
                            decoding="async"
                            key={img.src}
                            ref={i === FIRST_IMG ? refImgNew : undefined}
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
                  title="anterior"
                  class="blaze-prev absolute left-2 top-2/4 flex h-6 w-6 items-center justify-center rounded-full bg-white font-mono text-lg font-bold opacity-60 hover:opacity-70 lg:h-10 lg:w-10 lg:text-3xl"
                  aria-label="Go to previous slide"
                >
                  {"<"}
                </button>

                <button
                  title="siguiente"
                  class="blaze-next absolute right-2 top-2/4 flex h-6 w-6 items-center justify-center rounded-full bg-white font-mono text-lg font-bold opacity-60 hover:opacity-70 lg:h-10 lg:w-10 lg:text-3xl"
                  aria-label="Go to next slide"
                >
                  {">"}
                </button>
              </div>
            </div>

            <article class="relative h-2/5 overflow-hidden rounded-b-md bg-gray-950 text-white lg:h-full lg:rounded-r-md lg:rounded-bl-none">
              {id && (
                <div class="absolute left-[85%] top-4 flex flex-col items-center gap-1 lg:left-5 lg:top-[92%] lg:flex-row lg:gap-2">
                  <button>
                    <div class="h-5 w-5 bg-white lg:h-8 lg:w-8"></div>
                  </button>
                  <p class="text-xs">1.11k</p>
                </div>
              )}
              <h3 class="border-b border-neutral-700 px-6 py-6 text-base font-bold lg:text-xl">
                <div class="w-4/5 lg:w-full">{title}</div>
              </h3>

              <p class="absolute h-3/5 overflow-auto p-6 lg:h-3/4 lg:border-b lg:border-neutral-700">
                {description}
              </p>
            </article>
          </div>
        </dialog>
      )}
    </>
  );
};
