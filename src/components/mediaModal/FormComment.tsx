import { useContext, type ChangeEvent } from "preact/compat";
import { MAX_INPUT } from "../../utils/const";
import { CommentActions } from "../../utils/enums";
import { type MediaForm } from "../../utils/types";
import { transitionViewIfSupported } from "../../utils/utilityFunctions";
import { SendIcon } from "../icons";
import { CommentActionsContext } from "./ProviderComment";

export const FormComment = ({
  inputComment,
  setInputComment,
  edit,
  setEdit,
  setOptions
}: MediaForm) => {
  const actions = useContext(CommentActionsContext);

  const handleForm = (e: SubmitEvent) => {
    e.preventDefault();

    const COMMENT_PARSER = inputComment.trim();

    if (edit.id && edit.active) {
      transitionViewIfSupported(() => {
        actions({
          type: CommentActions.UPDATE,
          others: {
            content: COMMENT_PARSER,
            id: edit.id
          }
        });

        setOptions({ active: false });
        setEdit({ active: false });
        setInputComment("");
      });

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
      actions({ type: CommentActions.ADD, add: COMMENT_DATA });
    });
    setInputComment("");
  };

  const handleInput = ({ target }: ChangeEvent) => {
    if (target instanceof HTMLTextAreaElement) setInputComment(target.value);
  };

  return (
    <form
      onSubmit={handleForm}
      class="relative flex h-full flex-1 items-center justify-evenly lg:h-[12%] lg:flex-initial"
    >
      <textarea
        required
        value={inputComment}
        placeholder="Agrega un comentario..."
        type="text"
        autoComplete="off"
        class="h-1/2 w-3/4 resize-none place-content-center bg-gray-950 ps-2 focus-visible:outline-none"
        onInput={handleInput}
        maxLength={MAX_INPUT}
        // joke XD
        minLength={MAX_INPUT / MAX_INPUT}
      />
      <span class="absolute -bottom-px left-[7.5%] text-xs opacity-60 lg:text-sm">
        {inputComment.length}/200
      </span>
      <button
        title="Comentar"
        class="aspect-square w-8 text-sm font-bold text-white"
      >
        <SendIcon />
      </button>
    </form>
  );
};
