import { useRef } from "preact/hooks";
import { useVisiblePosition } from "../hooks/useVisiblePosition";

interface Props {
  title: string;
  description: string;
  IMGs: string[];
}

export const Site = ({ title, description, IMGs }: Props) => {
  const refImgPrev = useRef<HTMLImageElement>(null);
  const refImgNew = useRef<HTMLImageElement>(null);
  const refDialog = useRef<HTMLDialogElement>(null);

  const { handleSite, active } = useVisiblePosition({
    refImgNew,
    refImgPrev,
    refDialog,
    optionsKey: {
      duration: 500,
      iterations: 1,
      easing: "ease",
    },
  });

  return (
    <>
      <figure
        class="w-[45%] max-w-72 aspect-square relative"
        onClick={handleSite}
      >
        <img
          ref={refImgPrev}
          class="object-cover h-full object-center "
          src={IMGs[0]}
          alt="example"
        />
        <figcaption class="absolute top-0 bg-black inline-block p-1  text-[10px] lg:text-sm rounded-br-sm font-bold">
          {title}
        </figcaption>
      </figure>
      {active && (
        <dialog
          ref={refDialog}
          class="focus-visible:outline-none overflow-visible backdrop:bg-black backdrop:bg-opacity-30  h-3/4 bg-transparent w-3/4 max-w-96
        "
        >
          <picture class=" block w-full aspect-square">
            <img
              ref={refImgNew}
              class="object-cover w-full aspect-square"
              src={IMGs[0]}
              alt="example"
            />
          </picture>
          <article class="bg-gray-950 text-white overflow-auto h-2/5 rounded-b-md p-5 flex flex-col gap-y-4 items-end">
            <button class="">onClick</button>
            <h3 class="font-bold w-full">{title}</h3>

            <p class="w-full">{description}</p>
          </article>
        </dialog>
      )}
    </>
  );
};
