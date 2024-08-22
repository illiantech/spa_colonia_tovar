import type { ComponentChildren } from "preact";
import { type CommentData, type CommentEdit, type Info } from "../utils/types";

import { useRef, useState } from "preact/hooks";
import { Comment } from "./mediaModal/Comment";
import { FormComment } from "./mediaModal/FormComment";

interface Props {
  info: Info;
  title: string;
  children: ComponentChildren;
}

export const Content = ({ info, title, children }: Props) => {
  const [comments, setComments] = useState<CommentData[]>([]);
  const refCommentEdit = useRef<CommentEdit>();

  return (
    <article class="relative flex h-1/2 flex-col overflow-hidden rounded-b-md bg-gray-950 text-white lg:h-full lg:justify-between lg:rounded-r-md lg:rounded-bl-none">
      {children}
      <h3 class="flex items-center px-6 py-6 text-base font-bold lg:h-[15%] lg:text-xl">
        <div class="w-5/6 lg:w-full">{title}</div>
      </h3>
      <div class="h-1/2 overflow-y-scroll border-y border-neutral-700 p-6 lg:absolute lg:top-[15%] lg:h-4/6">
        <p> {info.description}</p>
        <br />
        <br />
        <br />
        <section>
          {comments.map((comment) => {
            return (
              <Comment
                refCommentEdit={refCommentEdit}
                key={comment.id}
                {...comment}
              />
            );
          })}
        </section>
      </div>
      <FormComment refCommentEdit={refCommentEdit} setComments={setComments} />
    </article>
  );
};
