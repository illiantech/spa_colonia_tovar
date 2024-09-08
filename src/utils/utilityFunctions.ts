import type { UUID } from "./types";

export const transitionViewIfSupported = (updateCb: () => void) => {
  if (document.startViewTransition) {
    return document.startViewTransition(updateCb);
  } else {
    updateCb();
  }
};

// example but funtinal code IA (Tabnine)
export const formatterElapsedTime = (time: number) => {
  const elapsed = Math.abs(Date.now() - time);
  if (elapsed < 60000) {
    return `${Math.floor(elapsed / 1000)} s`;
  } else if (elapsed < 3600000) {
    return `${Math.floor(elapsed / 60000)} m`;
  } else if (elapsed < 86400000) {
    return `${Math.floor(elapsed / 3600000)} h`;
  } else if (elapsed < 2592000000) {
    return `${Math.floor(elapsed / 86400000)} d`;
  } else {
    return `${Math.floor(elapsed / 604800000)} w`;
  }
};

// reduce data model when relational data base is 1-N
export const notRepeatData = ({ arr, id }: { arr: { id: UUID }[]; id: UUID }) =>
  arr.every((item) => item.id !== id);

// routes response shorthand function
export const res = (
  body: string,
  {
    status,
    statusText,
    headers
  }: { status?: number; statusText?: string; headers?: HeadersInit }
) => new Response(body, { status, statusText, headers });
