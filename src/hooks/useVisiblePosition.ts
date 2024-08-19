import type { RefObject } from "preact";
import { useCallback, useEffect, useState } from "preact/hooks";
import { OPACITY_VALUES, OVERFLOW_VALUES } from "../utils/enums";
import { type PictureDiscrimanator } from "../utils/types";

interface Props {
  refImgPrev: RefObject<HTMLImageElement>;
  refImgNew: RefObject<HTMLImageElement>;
  refDialog: RefObject<HTMLDialogElement>;
  refContainerImgNew: RefObject<HTMLDivElement>;
  optionsKey: KeyframeEffectOptions;
}

export const useVisiblePosition = ({
  refImgNew,
  refImgPrev,
  refDialog,
  refContainerImgNew,
  optionsKey
}: Props) => {
  const [active, setActive] = useState<boolean>(false);

  const cbPictureDiscriminator = useCallback(
    async ({ opacity, containerImgNew, overflow }: PictureDiscrimanator) => {
      if (overflow === OVERFLOW_VALUES.HIDDEN) {
        await new Promise((resolve) =>
          setTimeout(resolve, optionsKey.duration as number)
        ); // No optimo, refactorizar

        containerImgNew.style.overflow = overflow;
      } else containerImgNew.style.overflow = overflow;

      const PICTUREs_SLIDER = Array.from(
        containerImgNew.firstElementChild
          ?.children as unknown as Array<HTMLPictureElement>
      );

      PICTUREs_SLIDER.forEach((picture) => {
        if (picture.firstElementChild !== refImgNew.current)
          picture.style.opacity = opacity.toString();
      });
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

      document.startViewTransition(async () => {
        refDialog.current?.showModal();

        if (refContainerImgNew.current) {
          cbPictureDiscriminator({
            overflow: OVERFLOW_VALUES.VISIBLE,
            opacity: OPACITY_VALUES.TRANSPARENT,
            containerImgNew: refContainerImgNew.current
          });
        }

        (refImgPrev.current?.parentElement as HTMLElement).style.opacity =
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

        if (refContainerImgNew.current) {
          cbPictureDiscriminator({
            overflow: OVERFLOW_VALUES.HIDDEN,
            opacity: OPACITY_VALUES.VISIBLE,
            containerImgNew: refContainerImgNew.current
          });
        }
      });
    }
  }, [active]);

  const closeSite = async ({ target }: Event) => {
    if (
      target === refDialog.current ||
      target === refDialog.current?.firstElementChild
    ) {
      const TRANS = document.startViewTransition(() => {
        refDialog.current?.close();
        (refImgPrev.current?.parentElement as HTMLElement).style.opacity =
          OPACITY_VALUES.VISIBLE.toString();
      });

      await TRANS.finished;

      setActive(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", closeSite);

    return () => {
      window.removeEventListener("click", closeSite);
    };
  }, []);

  return { active, handleSite, closeSite };
};
