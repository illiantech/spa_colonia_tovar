import type { RefObject } from "preact";
import { type OPACITY_VALUES, type OVERFLOW_VALUES } from "./enums";

export interface TourismSite {
  title: string;
  images: Image[];
  info: Info;
  readonly id: `${string}-${string}-${string}-${string}-${string}`;
}

export interface Image {
  src: string;
  alt: string;
}

export interface Info {
  description: string;
  tlf?: string;
  address: Address;
  openingHours?: string;
}

interface Address {
  location: string;
  link: string;
}

export interface PictureDiscrimanator<T> {
  opacity: OPACITY_VALUES;
  containerImgNew: T;
  overflow: OVERFLOW_VALUES;
}

export interface AnimatioElement {
  X_OLD: number;
  Y_OLD: number;
  W_OLD: number;
}

export interface PropsVsiblePosition<T> {
  refImgPrev: RefObject<T>;
  refImgNew: RefObject<T>;
  refDialog: RefObject<T>;
  refContainerImgNew: RefObject<T>;
  optionsKey: KeyframeEffectOptions;
}

export type PropsSlider<T> = Pick<
  PropsVsiblePosition<T>,
  "refImgNew" | "refContainerImgNew"
>;

export type PropsUseClose<T> = Pick<
  PropsVsiblePosition<T>,
  "refImgPrev" | "refDialog"
>;
