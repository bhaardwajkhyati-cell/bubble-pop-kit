/**
 * @param {Object} props
 * @param {{id: string|number, content: string, position: {left: number, top: number}, colorIndex: number, duration: number, delay: number}} props.item
 * @param {number} props.index
 * @param {number|null} props.bursting
 * @param {(index: number, event: React.MouseEvent<HTMLDivElement>) => void} props.onPop
 */
function Bubble({ item, index, bursting, onPop }) {
  return (
    <div
      className={`bubble bubble-${item.colorIndex} ${bursting === index ? "burst" : ""}`}
      style={{
        left: item.position.left + "px",
        top:  item.position.top  + "px",
        animationDuration: item.duration + "s",
        animationDelay:    item.delay    + "s",
      }}
      onClick={(e) => onPop(index, e)}
    >
      {item.content}
    </div>
  );
}

export default Bubble;
