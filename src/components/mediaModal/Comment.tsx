import { useState, type MutableRef } from "preact/hooks";
import { type CommentData, type CommentEdit } from "../../utils/types";
import { transitionViewIfSupported } from "../../utils/utilityFunctions";

interface Props extends CommentData {
  refCommentEdit: MutableRef<CommentEdit | undefined>;
}

export const Comment = ({
  comment,
  user,
  date,

  refCommentEdit,
  id
}: Props) => {
  const [options, setOptions] = useState<boolean>(false);
  const [commentEdit, setCommentEdit] = useState<CommentEdit>();

  const handleOptions = () => {
    transitionViewIfSupported(() => {
      setOptions(!options);
    });
  };

  const handleEdit = () => {
    setCommentEdit({
      comment,
      id
    });
  };

  return (
    <>
      <article class="grid grid-cols-[.2fr_1fr_.1fr] grid-rows-[36px_1fr] items-center gap-y-0.5 text-sm">
        <img
          class="aspect-square w-9 rounded-full"
          src={user.avatar}
          alt=" Avatar"
        />
        <h4 class="flex flex-col items-start ps-2 font-bold">
          {user.name}

          {commentEdit && (
            <div class="grid place-content-center pe-0 text-xs font-normal opacity-60">
              Editando
            </div>
          )}
        </h4>
        <div class="relative grid place-content-center">
          <button
            onClick={handleOptions}
            title="Opciones del comentario"
            class="select-none ps-2 text-2xl opacity-60 lg:hover:opacity-100"
          >
            ...
          </button>
          {options && (
            <div class="absolute right-0 top-8 z-10 flex w-24 flex-col gap-2 rounded-md border border-neutral-700 bg-neutral-900 py-2 text-xs shadow-lg">
              <button
                onClick={handleOptions}
                title="Eliminar comentario"
                class="font-bold text-red-500"
              >
                Eliminar
              </button>
              <hr class="w-full border-neutral-700" />
              <button
                onClick={handleEdit}
                title="Editar comentario"
                class="font-bold"
              >
                {commentEdit ? "No editar" : "Editar"}
              </button>
            </div>
          )}
        </div>

        <br />
        <p class="max-w-[175px] break-words ps-2 lg:max-w-52">{comment}</p>

        <br />
        <time class="col-start-2 ps-2 opacity-60">{date}</time>
      </article>

      <br />
      <br />
    </>
  );
};
