export function getPosition({
  existingPositions,
  itemSize = 90,
  containerWidth,
  containerHeight,
  minGap = 10,
  edgePadding = 18,
}) {
  const safeWidth = Math.max(0, (containerWidth ?? window.innerWidth) - itemSize - edgePadding * 2);
  const safeHeight = Math.max(0, (containerHeight ?? window.innerHeight * 0.7) - itemSize - edgePadding * 2);
  let attempts = 0;

  while (attempts < 100) {
    const left = edgePadding + Math.random() * safeWidth;
    const top = edgePadding + Math.random() * safeHeight;

    const overlaps = existingPositions.some(pos => {
      const dx = pos.left - left;
      const dy = pos.top - top;
      return Math.sqrt(dx * dx + dy * dy) < itemSize + minGap;
    });

    if (!overlaps) return { left, top };
    attempts++;
  }

  return {
    left: edgePadding + Math.random() * safeWidth,
    top: edgePadding + Math.random() * safeHeight,
  };
}
