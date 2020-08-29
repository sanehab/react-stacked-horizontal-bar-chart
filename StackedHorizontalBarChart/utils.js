export const areTwoElementsOverlapping = (el1, el2) => {
  const el1BoundingRect = el1.getBoundingClientRect();
  const el2BoundingRect = el2.getBoundingClientRect();

  const notOverlapping =
    el1BoundingRect.right < el2BoundingRect.left ||
    el1BoundingRect.left > el2BoundingRect.right ||
    el1BoundingRect.bottom < el2BoundingRect.top ||
    el1BoundingRect.top > el2BoundingRect.bottom;

  return !notOverlapping;
};
