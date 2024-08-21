import { LikeIcon } from "../icons";

export const Likes = () => {
  return (
    <div class="absolute left-[85%] top-3 flex flex-col items-center gap-1 lg:left-5 lg:top-[85%] lg:flex-row lg:gap-2">
      <button title="Me gusta" class="aspect-square w-8">
        <LikeIcon />
      </button>
      <p title={"1119 likes"} class="text-xs lg:text-sm">
        1.11k
      </p>
    </div>
  );
};
