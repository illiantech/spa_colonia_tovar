export const transitionViewIfSupported = (updateCb: () => void) => {
  if (document.startViewTransition) {
    return document.startViewTransition(updateCb);
  } else {
    updateCb();
  }
};
