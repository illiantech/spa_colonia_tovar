import type { ChangeEvent } from "preact/compat";
import { MAX_INPUT } from "../../utils/const";
import { type CommentData, type Options } from "../../utils/types";
import { transitionViewIfSupported } from "../../utils/utilityFunctions";
import { SendIcon } from "../icons";

interface Props {
  setComments: (value: (prev: CommentData[]) => CommentData[]) => void;
  inputComment: string;
  setInputComment: (value: string) => void;
  options: Options;
  setOptions: (value: Options) => void;
}

export const FormComment = ({
  setComments,
  inputComment,
  setInputComment,
  options,
  setOptions
}: Props) => {
  const handleForm = (e: SubmitEvent) => {
    e.preventDefault();

    const COMMENT_PARSER = inputComment.trim();

    if (!COMMENT_PARSER) {
      alert("Por favor, escribe un comentario.");

      return;
    }

    if (options.id && options.edit) {
      setComments((prev) =>
        prev.map((comment) =>
          comment.id === options.id
            ? { ...comment, content: COMMENT_PARSER }
            : comment
        )
      );
      setOptions({ open: false, edit: false });
      setInputComment("");
      return;
    }

    const COMMENT_DATA = {
      content: COMMENT_PARSER,
      date: Date.now(),
      user: {
        name: "Usuario Anónimo",
        avatar: "/spa_colonia_tovar/team-example.webp"
      },
      id: crypto.randomUUID()
    };

    transitionViewIfSupported(() => {
      setComments((prev) => [...prev, COMMENT_DATA]);
    });
    setInputComment("");
  };

  const handleInput = ({ target }: ChangeEvent) => {
    if (target instanceof HTMLTextAreaElement) setInputComment(target.value);
  };

  return (
    <form
      onSubmit={handleForm}
      class="grid h-1/3 grid-cols-[1fr_0.17fr] grid-rows-1 items-center justify-center lg:h-[15%] lg:flex-initial lg:items-end"
    >
      <textarea
        value={inputComment}
        placeholder="Agrega un comentario..."
        type="text"
        autoComplete="off"
        class="h-2/3 w-full resize-none place-content-center bg-gray-950 px-4 focus-visible:outline-none"
        onInput={handleInput}
        maxLength={MAX_INPUT}
      />
      <span class="col-start-1 p-0.5 ps-4 text-start text-sm opacity-60">
        {inputComment.length}/200
      </span>
      <button
        title="Comentar"
        class="col-start-2 row-start-1 aspect-square w-8 text-sm font-bold text-white lg:pb-1"
      >
        <SendIcon />
      </button>
    </form>
  );
};
