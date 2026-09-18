import Bubble from './Bubble';

/**
 * @param {Object} props
 * @param {Array<{id: string|number, content: string, position: {left: number, top: number}, colorIndex: number, duration: number, delay: number}>} props.items
 * @param {number|null} props.bursting
 * @param {(index: number, event: React.MouseEvent<HTMLDivElement>) => void} props.onPop
 * @param {string} [props.emptyMessage="Nothing here yet 🫧"]
 */
function BubbleArea({ items, bursting, onPop, emptyMessage = "Nothing here yet 🫧" }) {
  return (
    <div className="bubble-area">
      {items.map((item, index) => (
        <Bubble
          key={item.id}
          item={item}
          index={index}
          bursting={bursting}
          onPop={onPop}
        />
      ))}
      {items.length === 0 && emptyMessage && (
        <p className="empty-hint">{emptyMessage}</p>
      )}
    </div>
  );
}

export default BubbleArea;
