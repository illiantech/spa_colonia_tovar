import { useEffect } from "preact/hooks";
import { OPACITY_VALUES } from "../utils/enums";
import { type PropsUseClose } from "../utils/types";

interface Props<T> extends PropsUseClose<T> {
  setActive(value: boolean): void;
}

export const useClose = <T extends HTMLElement>({
  refDialog,
  refImgPrev,
  setActive
}: Props<T>) => {
  const closeSite = async ({ target }: Event) => {
    if (
      target === refDialog.current ||
      target === refDialog.current?.firstElementChild
    ) {
      if (!document.startViewTransition) {
        (refDialog.current as unknown as HTMLDialogElement).close();
        if (refImgPrev.current?.parentElement)
          refImgPrev.current.parentElement.style.opacity =
            OPACITY_VALUES.VISIBLE.toString();
      } else {
        const TRANS = document.startViewTransition(() => {
          (refDialog.current as unknown as HTMLDialogElement).close();
          if (refImgPrev.current?.parentElement)
            refImgPrev.current.parentElement.style.opacity =
              OPACITY_VALUES.VISIBLE.toString();
        });

        await TRANS.finished;

        setActive(false);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("click", closeSite);

    return () => {
      window.removeEventListener("click", closeSite);
    };
  }, []);

  return { closeSite };
};
