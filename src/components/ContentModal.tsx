import { type Info } from "../utils/types";
import { LikeIcon, SendIcon } from "./icons";

interface Props {
  info: Info;
  title: string;
}

export const Content = ({ info, title }: Props) => {
  return (
    <article class="relative flex h-1/2 flex-col overflow-hidden rounded-b-md bg-gray-950 text-white lg:h-full lg:justify-between lg:rounded-r-md lg:rounded-bl-none">
      <h3 class="flex items-center px-6 py-6 text-base font-bold lg:h-[15%] lg:text-xl">
        <div class="w-5/6 lg:w-full">{title}</div>
      </h3>

      <p class="h-1/2 overflow-auto border-y border-neutral-700 p-6 lg:absolute lg:top-[15%] lg:h-4/6">
        {info.description}
      </p>
      <div class="absolute left-[85%] top-3 flex flex-col items-center gap-1 lg:left-5 lg:top-[85%] lg:flex-row lg:gap-2">
        <button title="Me gusta" class="aspect-square w-8">
          <LikeIcon />
        </button>
        <p title={"1119 likes"} class="text-xs lg:text-sm">
          1.11k
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        class="flex h-full flex-1 items-center justify-evenly lg:h-[10%] lg:flex-initial"
      >
        <textarea
          placeholder="Agrega un comentario..."
          type="text"
          name=""
          class="h-3/4 w-3/4 resize-none place-content-center bg-gray-950 ps-2 focus-visible:outline-none lg:h-1/2"
        />
        <button
          title="Comentar"
          class="aspect-square w-8 text-sm font-bold text-white"
        >
          <SendIcon />
        </button>
      </form>
    </article>
  );
};
