import { useCallback, useEffect, useState } from "preact/hooks";
import { OPACITY_VALUES } from "../utils/enums";
import { type AnimatioElement, type PropsVsiblePosition } from "../utils/types";

export const useVisiblePosition = <T extends HTMLElement>({
  refImgNew,
  refImgPrev,
  refDialog,
  optionsKey
}: PropsVsiblePosition<T>) => {
  const [active, setActive] = useState<boolean>(false);

  const cbAnimationElement = useCallback(
    ({ X_OLD, Y_OLD, W_OLD }: AnimatioElement) => {
      (refDialog.current as unknown as HTMLDialogElement).showModal();

      if (refImgPrev.current?.parentElement)
        refImgPrev.current.parentElement.style.opacity =
          OPACITY_VALUES.TRANSPARENT.toString();

      const { x, y, width } =
        refImgNew.current?.getBoundingClientRect() as DOMRect;

      const KEYFRAME = new KeyframeEffect(
        refImgNew.current,
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

      const ANIMATION = new Animation(KEYFRAME);

      ANIMATION.play();
    },
    []
  );

  const handleSite = () => {
    setActive(true);
  };

  useEffect(() => {
    if (active) {
      const {
        x: X_OLD,
        y: Y_OLD,
        width: W_OLD
      } = refImgPrev.current?.getBoundingClientRect() as DOMRect;

      if (!document.startViewTransition)
        cbAnimationElement({ X_OLD, Y_OLD, W_OLD });
      else
        document.startViewTransition(() => {
          cbAnimationElement({ X_OLD, Y_OLD, W_OLD });
        });
    }
  }, [active]);

  return { active, handleSite, setActive };
};
