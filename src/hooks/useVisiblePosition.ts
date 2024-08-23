import { useEffect, useState } from "preact/hooks";
import { type PropsVsiblePosition } from "../utils/types";
import { transitionViewIfSupported } from "../utils/utilityFunctions";

export const useVisiblePosition = <T extends HTMLElement>({
  refImgNew,
  refImgPrev,
  refDialog,
  optionsKey
}: PropsVsiblePosition<T>) => {
  const [active, setActive] = useState<boolean>(false);

  const handleSite = () => {
    setActive(true);
  };

  useEffect(() => {
    if (active) {
      const {
        x: X_OLD,
        y: Y_OLD,
        width: W_OLD
      } = refImgPrev?.getBoundingClientRect() as DOMRect;

      transitionViewIfSupported(() => {
        (refDialog as unknown as HTMLDialogElement).showModal();

        const { x, y, width } = refImgNew?.getBoundingClientRect() as DOMRect;

        refImgNew?.animate(
          [
            {
              transform: `translateY(${-y + Y_OLD}px) translateX(${-x + X_OLD}px)`,
              width: `${W_OLD}px`,
              height: `${W_OLD}px`
            },
            {
              transform: `translateY(0px) translateX(0px)`,
              width: `${width}px`,
              height: `${width}px`
            }
          ],
          optionsKey
        );
      });
    }
  }, [active]);

  return { active, handleSite, setActive };
};
