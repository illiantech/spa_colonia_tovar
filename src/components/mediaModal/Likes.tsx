import { useEffect, useState } from "preact/hooks";
import { LikeIcon } from "../icons";

export const Likes = () => {
  const [like, setLike] = useState<boolean>(false);
  const [countLikes, setCountLikes] = useState<number>(0 + 1);

  useEffect(() => {
    setCountLikes((prev) => (like ? prev + 1 : prev - 1));
  }, [like]);

  const handleLike = () => {
    setLike(!like);
  };

  return (
    <div class="absolute left-[85%] top-3 flex flex-col items-center gap-1 lg:left-5 lg:top-[85%] lg:flex-row lg:gap-2">
      <button onClick={handleLike} title="Me gusta" class="aspect-square w-8">
        {<LikeIcon clase={like ? "like__active like " : "like"} />}
      </button>
      <p title={`${countLikes} Likes`} class="select-none text-xs lg:text-sm">
        {countLikes}
      </p>
    </div>
  );
};
