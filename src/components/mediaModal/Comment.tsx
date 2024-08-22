import { useState } from "preact/hooks";
import { type CommentData } from "../../utils/types";
import { transitionViewIfSupported } from "../../utils/utilityFunctions";

export const Comment = ({ comment, user, date }: CommentData) => {
  const [options, setOptions] = useState<boolean>(false);

  const handleOptions = () => {
    transitionViewIfSupported(() => {
      setOptions(!options);
    });
  };

  return (
    <>
      <article class="grid grid-cols-[.2fr_1fr_.1fr] grid-rows-[36px_1fr] items-center gap-1 text-sm">
        <img
          class="aspect-square w-9 rounded-full"
          src={user.avatar}
          alt=" Avatar"
        />
        <h4 class="font-bold">{user.name}</h4>
        <div class="relative grid place-content-center">
          <button
            onClick={handleOptions}
            title="Opciones del comentario"
            class="select-none text-2xl opacity-60 hover:opacity-100"
          >
            ...
          </button>
          {options && (
            <div class="absolute right-0 top-8 z-10 flex w-24 flex-col gap-2 rounded-md border border-neutral-700 bg-neutral-900 py-2 text-xs shadow-lg">
              <button
                onClick={handleOptions}
                title="Eliminar comentario"
                class="text-sm font-bold text-red-500"
              >
                Eliminar
              </button>
              <hr class="w-full border-neutral-700" />
              <button
                onClick={handleOptions}
                title="Editar comentario"
                class="text-sm font-bold"
              >
                Editar
              </button>
            </div>
          )}
        </div>

        <br />
        <p class="max-w-[175px] break-words lg:max-w-52">{comment}</p>

        <br />
        <time class="col-start-2 text-sm opacity-60" datetime="">
          {date}
        </time>
      </article>

      <br />
      <br />
    </>
  );
};
