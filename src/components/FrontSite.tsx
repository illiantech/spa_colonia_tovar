import  {type  RefObject } from "preact";
import type { Image } from "../utils/types";

interface Props<T> {
  handleSite: () => void;
  refImgPrev: RefObject<T>;
  image: Image;
  title: string;
}

export const Front = <T extends HTMLElement>({
  handleSite,
  refImgPrev,

  image,
  title
}: Props<T>) => {
  return (
    <figure
      title="click para mas contenido"
      class="figure-border relative aspect-square w-[45%] max-w-72 cursor-pointer border-[2px] transition-opacity after:absolute after:top-0 after:aspect-square after:w-full after:bg-black after:opacity-20 after:transition-opacity after:content-[''] lg:after:hover:opacity-0"
      onClick={handleSite}
    >
      <img
        loading="lazy"
        decoding="async"
        ref={refImgPrev as unknown as RefObject<HTMLImageElement>}
        class="h-full w-full object-cover object-center"
        {...image}
      />
      <figcaption class="bg-tr md absolute bottom-0 z-10 inline-block w-full bg-black-opac-2 p-1 py-2 text-center text-xs font-bold sm:py-3 sm:text-base">
        {title}
      </figcaption>
    </figure>
  );
};
