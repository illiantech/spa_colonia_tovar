import type { CommentActions } from "./enums";

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

type ID = `${string}-${string}-${string}-${string}`;

export interface ToggleID {
  id?: ID;
  active: boolean;
}

export interface Action {
  type: CommentActions;
  add?: CommentData;
  others?: Partial<Pick<CommentData, "id" | "content">>;
}

type SetToggleID = (value: ((prev: ToggleID) => ToggleID) | ToggleID) => void;

interface MediaModal {
  setInputComment: (value: string) => void;
  setEdit: SetToggleID;
  edit: ToggleID;
  setOptions: SetToggleID;
  inputComment: string;
  options: ToggleID;
}

export type MediaComment = MediaModal & CommentData;

export type MediaOptions = Omit<MediaModal, "inputComment"> &
  Pick<CommentData, "content" | "id">;

export type MediaForm = Omit<MediaModal, "options">;
