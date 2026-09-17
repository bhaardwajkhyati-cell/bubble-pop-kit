export function triggerParticleSplash({ sourceElement, containerElement, colorIndex = 0, count = 10 }) {
  const rect = sourceElement.getBoundingClientRect();
  const area = containerElement.getBoundingClientRect();
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
    setTimeout(() => particle.remove(), 600);
  }
}
