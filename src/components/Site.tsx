import { useRef } from "preact/hooks";
import { useClose } from "../hooks/useClosePosition";
import { useVisiblePosition } from "../hooks/useVisiblePosition";
import { type TourismSite } from "../utils/types";
import { CloseButton } from "./CloseButtonModal";
import { Content } from "./ContentModal";
import { Front } from "./FrontSite";
import { Slider } from "./SiderModal";

export const Site = ({ title, info, images, id }: TourismSite) => {
  const refImgPrev = useRef(null);
  const refImgNew = useRef(null);
  const refDialog = useRef(null);
  const refContainerImgNew = useRef(null);
  const refFirstIndex = useRef<number>(0);

  const { handleSite, active, setActive } = useVisiblePosition({
    refImgNew,
    refImgPrev,
    refDialog,
    refContainerImgNew,
    optionsKey: {
      duration: 400,
      iterations: 1,
      easing: "ease"
    }
  });

  const { closeSite } = useClose({ refDialog, refImgPrev, setActive });

  return (
    <>
      <Front
        refImgPrev={refImgPrev}
        image={images[refFirstIndex.current]}
        handleSite={handleSite}
        title={title}
      />
      {active && (
        <dialog
          ref={refDialog}
          class="h-3/4 w-5/6 max-w-96 overflow-visible bg-transparent backdrop:bg-black backdrop:bg-opacity-50 focus-visible:outline-none lg:h-fit lg:w-5/6 lg:max-w-5xl"
        >
          <CloseButton closeSite={closeSite} />

          <div class="h-full lg:grid lg:grid-cols-[1fr_350px] lg:grid-rows-1">
            <Slider
              refContainerImgNew={refContainerImgNew}
              FirstIndex={refFirstIndex.current}
              refImgNew={refImgNew}
              images={images}
              active={active}
            />
            <Content title={title} info={info} />
          </div>
        </dialog>
      )}
    </>
  );
};
