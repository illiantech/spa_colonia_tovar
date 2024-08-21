import { useEffect, useState } from "preact/hooks";
import { LikeIcon } from "../icons";

export const Likes = () => {
  const [like, setLike] = useState<boolean>(false);
  const [countLikes, setCountLikes] = useState<number>(0 + 1);

  useEffect(() => {
    const ME_LIKE = like ? countLikes + 1 : countLikes - 1;

    setCountLikes(ME_LIKE);
  }, [like]);

  const handleLike = () => {
    setLike(!like);
  };

  return (
    <div class="absolute left-[85%] top-3 flex flex-col items-center gap-1 lg:left-5 lg:top-[85%] lg:flex-row lg:gap-2">
      <button onClick={handleLike} title="Me gusta" class="aspect-square w-8">
        <LikeIcon fill={like ? "#ffffff" : "#000000"} />
      </button>
      <p title={`${countLikes} Likes`} class="select-none text-xs lg:text-sm">
        {countLikes}
      </p>
    </div>
  );
};
