import { useRef } from "preact/hooks";

import { useVisiblePosition } from "../hooks/useVisiblePosition";
import { CLOSE_MODAL } from "../utils/const";
import { type TourismSite } from "../utils/types";
import { transitionViewIfSupported } from "../utils/utilityFunctions";
import { CloseButton } from "./CloseButtonModal";
import { Content } from "./ContentModal";
import { Front } from "./FrontSite";
import { Likes } from "./mediaModal/Likes";
import { PorviderComment } from "./mediaModal/ProviderComment";
import { Slider } from "./SiderModal";

export const SiteModal = ({ title, info, images, id }: TourismSite) => {
  const refImgPrev = useRef(null);
  const refImgNew = useRef(null);
  const refDialog = useRef(null);

  const { handleSite, setActive, active } = useVisiblePosition({
    refImgNew: refImgNew.current,
    refImgPrev: refImgPrev.current,
    refDialog: refDialog.current,
    optionsKey: {
      duration: 400,
      iterations: 1,
      easing: "ease"
    }
  });

  const handleClose = ({ target }: MouseEvent) => {
    if ((target as HTMLElement).id === CLOSE_MODAL) {
      transitionViewIfSupported(() => {
        (refDialog.current as unknown as HTMLDialogElement).close();
      });
    }
  };

  return (
    <>
      <dialog
        onClose={() => {
          setActive(false);
        }}
        id={CLOSE_MODAL}
        ref={refDialog}
        class="h-5/6 w-5/6 max-w-96 overflow-visible bg-transparent backdrop:bg-black backdrop:bg-opacity-40 focus-visible:outline-none lg:h-fit lg:w-5/6 lg:max-w-5xl [&~figure]:open:opacity-0"
        onClick={handleClose}
      >
        <CloseButton handleClose={handleClose} />

        <div class="h-full lg:grid lg:grid-cols-[1fr_350px] lg:grid-rows-1">
          <Slider refImgNew={refImgNew} images={images} />

          <PorviderComment initialComments={[]}>
            <Content active={active} title={title} info={info}>
              <Likes />
            </Content>
          </PorviderComment>
        </div>
      </dialog>

      <Front
        refImgPrev={refImgPrev}
        image={images[0]}
        handleSite={handleSite}
        title={title}
      />
    </>
  );
};
