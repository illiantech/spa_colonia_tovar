interface Props {
  closeSite: ({ target }: Event) => Promise<void>;
}

export const CloseButton = ({ closeSite }: Props) => {
  return (
    <button
      title="cerrar"
      class="absolute -right-8 -top-20 h-7 w-7 before:absolute before:left-0 before:h-[3px] before:w-7 before:rotate-45 before:rounded-md before:bg-white before:content-[''] after:absolute after:left-0 after:h-[3px] after:w-7 after:-rotate-45 after:rounded-md after:bg-white after:content-[''] hover:before:bg-gray-300 hover:after:bg-gray-300 lg:-right-20 lg:-top-10"
      onClick={closeSite}
    ></button>
  );
};
