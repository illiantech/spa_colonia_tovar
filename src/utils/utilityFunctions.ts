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
