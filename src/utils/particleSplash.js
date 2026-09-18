/**
 * Adds animated particles around a source element and returns an idempotent cleanup function.
 *
 * @param {Object} options
 * @param {HTMLElement} options.sourceElement
 * @param {HTMLElement} options.containerElement
 * @param {number} [options.colorIndex=0]
 * @param {number} [options.count=10]
 * @returns {() => void}
 */
export function triggerParticleSplash({ sourceElement, containerElement, colorIndex = 0, count = 10 }) {
  if (!sourceElement || !containerElement) return () => {};

  const rect = sourceElement.getBoundingClientRect();
  const area = containerElement.getBoundingClientRect();
  const timers = [];
  const particles = [];
  const cx = rect.left - area.left + rect.width  / 2;
  const cy = rect.top  - area.top  + rect.height / 2;

  for (let i = 0; i < count; i++) {
    const particle = document.createElement("div");
    const angle = (i / count) * Math.PI * 2;
    const dist  = 40 + Math.random() * 40;

    particle.className = `particle particle-${colorIndex % 5}`;
    particle.style.left = cx + "px";
    particle.style.top  = cy + "px";
    particle.style.setProperty("--tx", Math.cos(angle) * dist + "px");
    particle.style.setProperty("--ty", Math.sin(angle) * dist + "px");

    containerElement.appendChild(particle);
    particles.push(particle);
    timers.push(setTimeout(() => particle.remove(), 600));
  }

  return () => {
    timers.forEach(clearTimeout);
    particles.forEach(particle => particle.remove());
  };
}
