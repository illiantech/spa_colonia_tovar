import type { RefObject } from "preact";
import { useEffect, useState } from "preact/hooks";

interface Props {
  refImgPrev: RefObject<HTMLImageElement>;
  refImgNew: RefObject<HTMLImageElement>;
  refDialog: RefObject<HTMLDialogElement>;
  optionsKey: KeyframeEffectOptions;
}

export const useVisiblePosition = ({
  refImgNew,
  refImgPrev,
  refDialog,
  optionsKey,
}: Props) => {
  const [active, setActive] = useState<boolean>(false);

  const handleSite = () => {
    setActive(true);
  };

  useEffect(() => {
    if (active) {
      const {
        x: X_OLD,
        y: Y_OLD,
        width: W_OLD,
      } = refImgPrev.current?.getBoundingClientRect() as DOMRect;

      document.startViewTransition(() => {
        refDialog.current?.showModal();

        (refImgPrev.current?.parentElement as HTMLElement).style.opacity = "0";

        const { x, y, width } =
          refImgNew.current?.getBoundingClientRect() as DOMRect;
        console.log(width, W_OLD);
        if (refImgNew)
          refImgNew.current?.animate(
            [
              {
                transform: `translateY(${-y + Y_OLD}px) translateX(${-x + X_OLD}px)`,
                width: `${W_OLD}px`,
                height: `${W_OLD}px`,
              },
              {
                transform: `translateY(0px) translateX(0px)`,
                width: `${width}px`,
                height: `${width}px`,
              },
            ],
            optionsKey,
          );
      });
    }
  }, [active]);

  const closeSite = async ({ target }: Event) => {
    if (target === refDialog.current) {
      const trans = document.startViewTransition(() => {
        refDialog.current?.close();
        (refImgPrev.current?.parentElement as HTMLElement).style.opacity = "1";
      });

      await trans.finished;

      setActive(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", closeSite);

    return () => {
      window.removeEventListener("click", closeSite);
    };
  }, []);

  return { active, handleSite };
};
