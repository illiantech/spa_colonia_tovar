import BlazeSlider, { type BlazeConfig } from "blaze-slider";

import { useEffect, useRef, useState } from "preact/hooks";

interface Props {
  config: BlazeConfig;
  active: boolean;
}

export function useBlazeSlider({ config, active }: Props) {
  const sliderRef = useRef<BlazeSlider>(null);
  const refSlider = useRef<HTMLDivElement>(null);
  const refUnsuscribe = useRef<() => boolean>(null);
  const [imgIndex, setImgIndex] = useState<number>(1);

  useEffect(() => {
    // if not already initialized
    if (!sliderRef.current && refSlider.current) {
      sliderRef.current = new BlazeSlider(refSlider.current, config);

      refUnsuscribe.current = sliderRef.current.onSlide((pageIndex) => {
        // index of the current page ( pagination index )
        setImgIndex(pageIndex + 1);
      });
    }

    return () => {
      if (sliderRef.current) {
        if (refUnsuscribe.current) refUnsuscribe.current();
        setImgIndex(1);
        sliderRef.current.destroy();
        sliderRef.current = null;
      }
    };
  }, [active]);

  return { refSlider, imgIndex };
}
