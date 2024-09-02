import type { MediaComment } from "../../utils/types";

import { useCommentOption } from "../../hooks/useCommentOptions";
import { formatterElapsedTime } from "../../utils/utilityFunctions";

export const Comment = ({
  content,
  user,
  date,
  setInputComment,
  inputComment,
  options,
  setOptions,
  setEdit,
  edit,

  id
}: MediaComment) => {
  const VERIFY_EDIT = edit.id === id && edit.active;

  const { handleDelete, handleEdit, handleOptions } = useCommentOption({
    setOptions,
    options,
    setEdit,
    edit,
    setInputComment,
    id,
    content
  });

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

          {VERIFY_EDIT && (
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
          {id === options.id && options.active && (
            <div class="absolute right-0 top-8 z-10 flex w-24 flex-col gap-2 rounded-md border border-neutral-700 bg-neutral-900 py-2 text-xs shadow-lg">
              <button
                onClick={handleDelete}
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
                {VERIFY_EDIT ? "No editar" : "Editar"}
              </button>
            </div>
          )}
        </div>

        <br />
        <p class="max-w-40 break-words ps-2 lg:max-w-52">
          {VERIFY_EDIT ? inputComment : content}
        </p>

        <br />
        <time class="col-start-2 ps-2 opacity-60">
          {formatterElapsedTime(date)}
        </time>
      </article>

      <br />
      <br />
    </>
  );
};
