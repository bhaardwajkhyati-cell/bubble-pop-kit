/**
 * Finds a non-overlapping top-left position for a fixed-size bubble.
 * Returns null when the container has no available position.
 *
 * @param {Object} options
 * @param {Array<{left: number, top: number}>} options.existingPositions
 * @param {number} [options.itemSize=90]
 * @param {number} [options.containerWidth=window.innerWidth]
 * @param {number} [options.containerHeight=window.innerHeight * 0.7]
 * @param {number} [options.minGap=10]
 * @param {number} [options.edgePadding=18]
 * @returns {{left: number, top: number} | null}
 */
export function getPosition({
  existingPositions,
  itemSize = 90,
  containerWidth,
  containerHeight,
  minGap = 10,
  edgePadding = 18,
}) {
  const viewportWidth = typeof window === 'undefined' ? 0 : window.innerWidth;
  const viewportHeight = typeof window === 'undefined' ? 0 : window.innerHeight;
  const safeWidth = Math.max(0, (containerWidth ?? viewportWidth) - itemSize - edgePadding * 2);
  const safeHeight = Math.max(0, (containerHeight ?? viewportHeight * 0.7) - itemSize - edgePadding * 2);
  const isAvailable = (left, top) => existingPositions.every(pos => {
    const dx = pos.left - left;
    const dy = pos.top - top;
    return Math.sqrt(dx * dx + dy * dy) >= itemSize + minGap;
  });

  for (let attempts = 0; attempts < 100; attempts++) {
    const left = edgePadding + Math.random() * safeWidth;
    const top = edgePadding + Math.random() * safeHeight;

    if (isAvailable(left, top)) return { left, top };
  }

  const step = itemSize + minGap;
  const columns = Math.floor(safeWidth / step) + 1;
  const rows = Math.floor(safeHeight / step) + 1;

  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
      const left = edgePadding + column * step;
      const top = edgePadding + row * step;

      if (isAvailable(left, top)) return { left, top };
    }
  }

  return null;
}
