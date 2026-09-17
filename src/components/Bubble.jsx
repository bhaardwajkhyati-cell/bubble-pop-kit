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
