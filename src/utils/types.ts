import type { RefObject } from "preact";

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

export interface PropsVsiblePosition<T> {
  refImgPrev: RefObject<T>;
  refImgNew: RefObject<T>;
  refDialog: RefObject<T>;
  optionsKey: KeyframeEffectOptions;
}

export type PropsUseClose<T> = Pick<
  PropsVsiblePosition<T>,
  "refImgPrev" | "refDialog"
>;

export interface CommentData {
  comment: string;
  date: string;
  user: {
    name: string;
    avatar: string;
  };
  readonly id: `${string}-${string}-${string}-${string}`;
}
