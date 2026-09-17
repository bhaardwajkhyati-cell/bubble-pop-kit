import { useEffect, useState } from 'react';
import './App.css';
import playPopSound from './components/Audio';
import BubbleArea from './components/BubbleArea';
import { getPosition } from './utils/getPosition';
import { triggerParticleSplash } from './utils/particleSplash';

function App() {
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
    const updateBubbleAreaSize = () => {
      const bubbleArea = document.querySelector('.bubble-area');
      if (!bubbleArea) return;

      const rect = bubbleArea.getBoundingClientRect();
      setBubbleAreaSize({
        width: rect.width,
        height: rect.height,
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

    triggerParticleSplash({
      sourceElement: e.currentTarget,
      containerElement: document.querySelector(".bubble-area"),
      colorIndex: index,
      count: 10,
    });

    setTimeout(() => {
      setItems(prevItems => prevItems.filter((_, i) => i !== index));
      setBursting(null);
    }, 400);
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
            <div className="price-box">
              <span>Starting at</span>
              <strong>$19</strong>
            </div>
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
