import { type OPACITY_VALUES, type OVERFLOW_VALUES } from "./enums";

interface Image {
  src: string;
  alt: string;
}

export interface TourismSite {
  title: string;
  description: string;
  images: Image[];
  readonly id?: `${string}-${string}-${string}-${string}-${string}`;
}

export interface PictureDiscrimanator {
  opacity: OPACITY_VALUES;
  containerImgNew: HTMLDivElement;
  overflow: OVERFLOW_VALUES;
}
