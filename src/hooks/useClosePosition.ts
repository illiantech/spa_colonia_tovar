import { useEffect } from "preact/hooks";
import { CLOSE_MODAL } from "../utils/const";
import { transitionViewIfSupported } from "../utils/utilityFunctions";

interface Props<T> {
  setActive(value: boolean): void;
  active: boolean;
  refDialog: T | null;
}

export const useClose = <T extends HTMLElement>({
  active,
  setActive,
  refDialog
}: Props<T>) => {
  const handleClose = ({ target }: MouseEvent) => {
    if ((target as HTMLElement).id === CLOSE_MODAL) setActive(false);
  };

  useEffect(() => {
    if (!active) {
      transitionViewIfSupported(() => {
        (refDialog as unknown as HTMLDialogElement).close();
      });
    }
  }, [active]);

  return { handleClose };
};
