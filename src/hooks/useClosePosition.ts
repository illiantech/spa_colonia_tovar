import type { RefObject } from "preact";
import { useEffect } from "preact/hooks";
import { OPACITY_VALUES } from "../utils/enums";
import { transitionViewIfSupported } from "../utils/utilityFunctions";

interface Props<T> {
  setActive(value: boolean): void;
  refDialog: RefObject<T | null>;
  refImgPrev: RefObject<T | null>;
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
      const TRANSITION = transitionViewIfSupported(() => {
        (refDialog.current as unknown as HTMLDialogElement).close();
        if (refImgPrev.current?.parentElement) {
          refImgPrev.current.parentElement.style.opacity =
            OPACITY_VALUES.VISIBLE.toString();
        }
      });

      if (!TRANSITION) {
        setActive(false);
        return;
      }

      await TRANSITION.finished;
      setActive(false);
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
