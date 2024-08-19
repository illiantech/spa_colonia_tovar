import { useMemo, useRef } from "preact/hooks";
import { useVisiblePosition } from "../hooks/useVisiblePosition";
import { useBlazeSlider } from "../hooks/useBlazeSlider";
import "blaze-slider/dist/blaze.css";

import { type Images } from "../uitls/sites";

interface Props {
  title: string;
  description: string;
  images: Images[];
}

const FIRST_IMG = 0;

export const Site = ({ title, description, images }: Props) => {
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
      easing: "ease",
    },
  });

  const { refSlider, imgIndex } = useBlazeSlider({
    active,
    config: {
      all: {
        draggable: true,
        slidesToShow: 1,
        slideGap: "0px",
      },
    },
  });

  return (
    <>
      <figure
        title="click para mas contenido"
        class="cursor-pointer w-[45%] max-w-72 aspect-square relative"
        onClick={handleSite}
      >
        <img
          ref={refImgPrev}
          class="object-cover h-full object-center "
          {...images[FIRST_IMG]}
        />
        <figcaption class="absolute top-0 bg-black inline-block p-1  text-[10px] lg:text-sm rounded-br-sm font-bold">
          {title}
        </figcaption>
      </figure>
      {active && (
        <dialog
          ref={refDialog}
          class="focus-visible:outline-none overflow-visible backdrop:bg-black backdrop:bg-opacity-50  h-3/4 bg-transparent w-3/4 max-w-96 lg:max-w-5xl  lg:w-5/6 lg:h-fit
        "
        >
          <button
            title="cerrar"
            class="absolute -top-20 -right-8 lg:-right-20 lg:-top-10 w-7 h-7 before:content-[''] before:w-7 before:h-[3px] before:bg-white hover:before:bg-gray-300 before:absolute before:rounded-md before:left-0 before:rotate-45 after:content-[''] after:w-7 after:h-[3px] after:bg-white hover:after:bg-gray-300 after:absolute after:rounded-md after:left-0 after:-rotate-45"
            onClick={closeSite}
          ></button>
          <div
            class="
         h-full lg:grid lg:grid-rows-1 lg:grid-cols-[1fr_350px]"
          >
            <div class="blaze-slider w-full aspect-square" ref={refSlider}>
              <div class="blaze-container">
                <div ref={refContainerImgNew} class="blaze-track-container">
                  <div class="blaze-track">
                    {images.map((img, i) => {
                      return (
                        <picture class=" block w-full aspect-square  ">
                          <img
                            decoding="async"
                            key={img.src}
                            ref={i === FIRST_IMG ? refImgNew : undefined}
                            class="object-cover w-full aspect-square"
                            {...img}
                          />
                        </picture>
                      );
                    })}
                  </div>
                </div>

                <div class=" absolute top-2 left-2 w-10 h-6 lg:w-[52px] lg:h-8  bg-[hsla(0,0%,15%,0.8)] flex items-center justify-center text-white text-sm lg:text-lg rounded-2xl">{`${imgIndex}/${images.length}`}</div>

                <button
                  title="anterior"
                  class=" absolute left-2 top-2/4 w-6 h-6 text-lg lg:w-10 lg:h-10 lg:text-3xl font-bold font-mono rounded-full bg-white opacity-60 hover:opacity-70 flex items-center justify-center blaze-prev"
                  aria-label="Go to previous slide"
                >
                  {"<"}
                </button>

                <button
                  title="siguiente"
                  class="absolute right-2 top-2/4 blaze-next w-6 h-6 text-lg lg:w-10 lg:h-10 lg:text-3xl font-bold font-mono rounded-full opacity-60 hover:opacity-70 flex items-center justify-center bg-white"
                  aria-label="Go to next slide"
                >
                  {">"}
                </button>
              </div>
            </div>

            <article class="lg:h-full bg-gray-950 text-white  h-1/2  rounded-b-md lg:rounded-r-md lg:rounded-bl-none  relative">
              <div class="flex flex-col items-center lg:flex-row gap-1 lg:gap-3 absolute left-[85%] lg:left-5 top-4 lg:top-[90%]">
                <button>
                  <div class="w-6 h-6 lg:w-8 lg:h-8 bg-white"></div>
                </button>
                <p class="text-xs">1000K</p>
              </div>
              <h3 class="font-bold  lg:mt-0  text-lg border-b border-neutral-700 pt-16 pb-6 lg:py-6 px-6 lg:text-xl">
                {title}
              </h3>

              <p class="overflow-auto h-1/2 lg:h-72 xl:h-[450px]  p-6">
                {description}
              </p>
            </article>
          </div>
        </dialog>
      )}
    </>
  );
};
