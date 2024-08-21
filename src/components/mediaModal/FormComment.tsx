import { SendIcon } from "../icons";

export const FormComment = () => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      class="flex h-full flex-1 items-center justify-evenly lg:h-[10%] lg:flex-initial"
    >
      <textarea
        placeholder="Agrega un comentario..."
        type="text"
        name=""
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
