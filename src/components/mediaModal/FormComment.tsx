import { type CommentData } from "../../utils/types";
import { transitionViewIfSupported } from "../../utils/utilityFunctions";
import { SendIcon } from "../icons";

interface Props {
  setComments: (value: (prev: CommentData[]) => CommentData[]) => void;
}

export const FormComment = ({ setComments }: Props) => {
  const handleInput = (e: SubmitEvent) => {
    e.preventDefault();

    if (e.target instanceof HTMLFormElement) {
      const FORM_DATA = new FormData(e.target);

      const { comment } = Object.fromEntries(FORM_DATA);

      const COMMENT_PARSER = (comment as string).trim();

      if (!COMMENT_PARSER) {
        alert("Por favor, escribe un comentario.");
        e.target.reset();
        return;
      }
      const COMMENT_DATA = {
        comment: COMMENT_PARSER,
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
      e.target.reset();
    }
  };

  return (
    <form
      onSubmit={handleInput}
      class="flex h-full flex-1 items-center justify-evenly lg:h-[10%] lg:flex-initial"
    >
      <textarea
        placeholder="Agrega un comentario..."
        type="text"
        name="comment"
        class="h-3/4 w-3/4 resize-none place-content-center bg-gray-950 ps-2 focus-visible:outline-none lg:h-1/2"
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
