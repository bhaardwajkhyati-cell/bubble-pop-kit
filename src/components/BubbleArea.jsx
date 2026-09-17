import Bubble from './Bubble';

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
