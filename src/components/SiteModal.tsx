import { useRef } from "preact/hooks";
import { useClose } from "../hooks/useClosePosition";
import { useVisiblePosition } from "../hooks/useVisiblePosition";
import { type TourismSite } from "../utils/types";
import { CloseButton } from "./CloseButtonModal";
import { Content } from "./ContentModal";
import { Front } from "./FrontSite";
import { Likes } from "./mediaModal/Likes";
import { Slider } from "./SiderModal";

export const SiteModal = ({ title, info, images, id }: TourismSite) => {
  const refImgPrev = useRef(null);
  const refImgNew = useRef(null);
  const refDialog = useRef(null);

  const { handleSite, setActive } = useVisiblePosition({
    refImgNew: refImgNew.current,
    refImgPrev: refImgPrev.current,
    refDialog: refDialog.current,
    optionsKey: {
      duration: 400,
      iterations: 1,
      easing: "ease"
    }
  });
  // 40 character
  const { closeSite } = useClose({
    refDialog: refDialog,
    refImgPrev: refImgPrev,
    setActive
  });

  return (
    <>
      <Front
        refImgPrev={refImgPrev}
        image={images[0]}
        handleSite={handleSite}
        title={title}
      />

      <dialog
        ref={refDialog}
        class="h-3/4 w-5/6 max-w-96 overflow-visible bg-transparent backdrop:bg-black backdrop:bg-opacity-40 focus-visible:outline-none lg:h-fit lg:w-5/6 lg:max-w-5xl"
      >
        <CloseButton closeSite={closeSite} />

        <div class="h-full lg:grid lg:grid-cols-[1fr_350px] lg:grid-rows-1">
          <Slider refImgNew={refImgNew} images={images} />
          <Content title={title} info={info}>
            <Likes />
          </Content>
        </div>
      </dialog>
    </>
  );
};
