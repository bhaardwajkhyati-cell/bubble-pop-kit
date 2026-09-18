import { useEffect, useRef, useState } from 'react';
import './App.css';
import playPopSound from './components/Audio';
import BubbleArea from './components/BubbleArea';
import { getPosition } from './utils/getPosition';
import { triggerParticleSplash } from './utils/particleSplash';

function App() {
  const popTimers = useRef(new Set());
  const particleCleanups = useRef(new Set());
  const bubbleAreaSizeRef = useRef({ width: 760, height: 500 });
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('bubble-pop-kit-items');
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState("");
  const [bursting, setBursting] = useState(null);
  const [bubbleAreaSize, setBubbleAreaSize] = useState({ width: 760, height: 500 });

  useEffect(() => {
    localStorage.setItem('bubble-pop-kit-items', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    const timers = popTimers.current;
    const cleanups = particleCleanups.current;
    const updateBubbleAreaSize = () => {
      const bubbleArea = document.querySelector('.bubble-area');
      if (!bubbleArea) return;

      const rect = bubbleArea.getBoundingClientRect();
      const nextSize = {
        width: rect.width,
        height: rect.height,
      };

      if (bubbleAreaSizeRef.current.width === nextSize.width && bubbleAreaSizeRef.current.height === nextSize.height) return;

      bubbleAreaSizeRef.current = nextSize;
      setBubbleAreaSize(nextSize);
      setItems(previousItems => {
        const positions = [];
        return previousItems.map(item => {
          const position = getPosition({
            existingPositions: positions,
            itemSize: 90,
            containerWidth: nextSize.width,
            containerHeight: nextSize.height,
          });

          if (position) {
            positions.push(position);
            return { ...item, position };
          }

          const maxLeft = Math.max(18, nextSize.width - 90 - 18);
          const maxTop = Math.max(18, nextSize.height - 90 - 18);
          const clampedPosition = {
            left: Math.min(Math.max(18, item.position.left), maxLeft),
            top: Math.min(Math.max(18, item.position.top), maxTop),
          };
          positions.push(clampedPosition);
          return { ...item, position: clampedPosition };
        });
      });
    };

    updateBubbleAreaSize();

    const bubbleArea = document.querySelector('.bubble-area');
    const resizeObserver = bubbleArea ? new ResizeObserver(updateBubbleAreaSize) : null;

    if (bubbleArea && resizeObserver) {
      resizeObserver.observe(bubbleArea);
    }

    window.addEventListener('resize', updateBubbleAreaSize);

    return () => {
      if (resizeObserver) resizeObserver.disconnect();
      window.removeEventListener('resize', updateBubbleAreaSize);
      timers.forEach(clearTimeout);
      cleanups.forEach(cleanup => cleanup());
    };
  }, []);

  const addItem = () => {
    const trimmedValue = input.trim();

    if (trimmedValue === "") return;

    setItems(prevItems => {
      const existingPositions = prevItems.map(i => i.position);
      const position = getPosition({
        existingPositions,
        itemSize: 90,
        containerWidth: bubbleAreaSize.width,
        containerHeight: bubbleAreaSize.height,
      });

      if (!position) return prevItems;

      return [...prevItems, {
        id: Date.now() + Math.random(),
        content: trimmedValue,
        position,
        colorIndex: prevItems.length % 5,
        duration: 2.5 + Math.random() * 2,
        delay: Math.random() * 1.5,
      }];
    });

    setInput("");
  };

  const onPop = (index, e) => {
    playPopSound();
    setBursting(index);

    const cleanupParticles = triggerParticleSplash({
      sourceElement: e.currentTarget,
      containerElement: document.querySelector(".bubble-area"),
      colorIndex: index,
      count: 10,
    });
    particleCleanups.current.add(cleanupParticles);
    setTimeout(() => particleCleanups.current.delete(cleanupParticles), 650);

    const popTimer = setTimeout(() => {
      setItems(prevItems => prevItems.filter((_, i) => i !== index));
      setBursting(null);
      popTimers.current.delete(popTimer);
    }, 400);
    popTimers.current.add(popTimer);
  };

  return (
    <div className="container">
      <header className="hero">
        <div className="hero-copy">
          <span className="eyebrow">Interactive UI starter</span>
          <h1>🫧 Bubble Pop Kit</h1>
          <p>
            Build playful, tactile interactions for product demos, landing pages,
            and delightful digital experiences.
          </p>

          <div className="meta-row">
            <span>React component</span>
            <span>Customizable colors</span>
            <span>Instant setup</span>
          </div>

          <div className="price-row">
          </div>
        </div>

        <div className="demo-card">
          <div className="demo-header">
            <span className="dot red" />
            <span className="dot yellow" />
            <span className="dot green" />
          </div>

          <div className="demo-body">
            <div className="input-bar">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addItem()}
                placeholder="Type anything and press Enter..."
              />
              <button
          className="addButton"
          onClick={addItem}
          disabled={input.trim() === ""}
        >
          Add Bubble
        </button>
            </div>

            <BubbleArea
              items={items}
              bursting={bursting}
              onPop={onPop}
              emptyMessage="Add something above to blow your first bubble! 🫧"
            />
          </div>
        </div>
      </header>

      <section className="feature-strip">
        <div className="feature-pill">High-converting micro-interaction</div>
        <div className="feature-pill">Easy to customize</div>
        <div className="feature-pill">Ready for product mockups</div>
      </section>
    </div>
  );
}

export default App;
