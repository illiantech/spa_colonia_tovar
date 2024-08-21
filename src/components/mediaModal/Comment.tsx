import { type CommentData } from "../../utils/types";

export const Comment = ({ comment, user, date }: CommentData) => {
  return (
    <>
      <article class="grid grid-cols-[.2fr_1fr] grid-rows-[36px_1fr] items-center gap-x-1 gap-y-1 text-sm sm:gap-x-0">
        <img
          class="aspect-square w-9 rounded-full"
          src={user.avatar}
          alt=" Avatar"
        />
        <h4 class="font-bold">{user.name}</h4>

        <br />
        <p>{comment}</p>
        <br />
        <time class="text-sm opacity-60" datetime="">
          {date}
        </time>
      </article>

      <br />
    </>
  );
};
