import { type Info } from "../utils/types";

interface Props {
  info: Info;
  title: string;
}

export const Content = ({ info, title }: Props) => {
  return (
    <article class="relative h-2/5 overflow-hidden rounded-b-md bg-gray-950 text-white lg:h-full lg:rounded-r-md lg:rounded-bl-none">
      <div class="absolute left-[85%] top-4 flex flex-col items-center gap-1 lg:left-5 lg:top-[92%] lg:flex-row lg:gap-2">
        <button>
          <div class="h-5 w-5 bg-white lg:h-8 lg:w-8"></div>
        </button>
        <p class="text-xs">1.11k</p>
      </div>

      <h3 class="border-b border-neutral-700 px-6 py-6 text-base font-bold lg:text-xl">
        <div class="w-4/5 lg:w-full">{title}</div>
      </h3>

      <p class="absolute h-3/5 overflow-auto p-6 lg:h-3/4 lg:border-b lg:border-neutral-700">
        {info.description}
      </p>
    </article>
  );
};
