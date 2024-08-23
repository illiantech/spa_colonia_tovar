import type { ChangeEvent } from "preact/compat";
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

  const handleChange = ({ target }: ChangeEvent) => {
    if (target instanceof HTMLTextAreaElement) setInputComment(target.value);
  };

  return (
    <form
      onSubmit={handleForm}
      class="flex h-full flex-1 items-center justify-evenly lg:h-[10%] lg:flex-initial"
    >
      <textarea
        value={inputComment}
        placeholder="Agrega un comentario..."
        type="text"
        autoComplete="off"
        class="h-3/4 w-3/4 resize-none place-content-center bg-gray-950 ps-2 focus-visible:outline-none lg:h-1/2"
        onChange={handleChange}
      />
      <button
        title="Comentar"
        class="aspect-square w-8 text-sm font-bold text-white"
      >
        <SendIcon />
      </button>
    </form>
  );
};
