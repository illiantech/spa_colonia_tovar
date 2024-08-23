export interface TourismSite {
  title: string;
  images: Image[];
  info: Info;
  readonly id: ID;
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
  refImgPrev: T | null;
  refImgNew: T | null;
  refDialog: T | null;
  optionsKey: KeyframeEffectOptions;
}

export interface CommentData {
  content: string;
  date: number;
  user: {
    name: string;
    avatar: string;
  };
  readonly id: ID;
}

export type ID = `${string}-${string}-${string}-${string}`;

export interface Options {
  id?: ID;
  open: boolean;
  edit: boolean;
}
