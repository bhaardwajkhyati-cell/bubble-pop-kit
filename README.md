# Bubble Pop Interaction Kit

A playful React UI starter for creating floating, colorful bubbles with pop animations, particle bursts, and a polished neon aesthetic.

This project is designed for product launches, landing pages, UI mockups, portfolios, and creative web interactions.

## Overview

Bubble Pop Interaction Kit gives you a ready-made interactive effect that feels premium and modern without needing a full custom animation system from scratch.

It includes:
- floating text bubbles
- click-to-pop interactions
- colorful bubble variations
- particle splash on pop
- local storage persistence
- easy styling customization
- Vite + React setup

## Why this project

This starter is ideal if you want to add a fun and memorable interaction to a landing page or product mockup without spending hours rebuilding the animation and layout logic.

It is useful for:
- SaaS product demos
- portfolio pieces
- creative web experiments
- interactive marketing pages
- UI concept mockups

## Demo

Run the app locally with:

```bash
npm install
npm run dev
```

Then open the local Vite URL shown in the terminal.

## Features

- Randomized bubble placement inside the play area
- Custom text entry for each new bubble
- Smooth floating motion
- Bubble click pop animation
- Particle burst effect
- Local storage persistence so bubbles remain after refresh
- Responsive layout for modern screens
- Easy styling adjustments via CSS

## Tech Stack

- React
- Vite
- JavaScript
- CSS

## Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open the local URL in your browser.

## Usage

1. Type any text into the input field.
2. Click the Add Bubble button.
3. A new bubble is generated in the play area.
4. Click a bubble to pop it.
5. The bubble list is saved in local storage automatically.

## Public API

### `Bubble`

Renders one interactive bubble.

```js
<Bubble item={item} index={0} bursting={null} onPop={handlePop} />
```

`item` must have this shape:

```js
{
  id: string | number,
  content: string,
  position: { left: number, top: number },
  colorIndex: number,
  duration: number,
  delay: number
}
```

- `index` — zero-based item index.
- `bursting` — index currently playing the burst animation, or `null`.
- `onPop(index, event)` — called when the bubble is clicked.

### `BubbleArea`

```js
<BubbleArea
  items={items}
  bursting={null}
  onPop={handlePop}
  emptyMessage="Nothing here yet"
/>
```

- `items` — array of bubble items.
- `bursting` — active burst index or `null`.
- `onPop(index, event)` — bubble click handler.
- `emptyMessage` — optional empty-state text. Defaults to `Nothing here yet 🫧`.

### `getPosition(options)`

Returns `{ left, top }` for a non-overlapping bubble, or `null` when the area is full.

- `existingPositions` — required array of `{ left, top }` positions.
- `itemSize` — defaults to `90`.
- `containerWidth` and `containerHeight` — measured area dimensions.
- `minGap` — defaults to `10`.
- `edgePadding` — defaults to `18`.

### `triggerParticleSplash(options)`

Creates particles and returns a cleanup function.

- `sourceElement` and `containerElement` — required DOM elements.
- `colorIndex` — defaults to `0`.
- `count` — defaults to `10`.

### `playPopSound(options)`

Plays a short pop sound. Audio errors are ignored when audio is unavailable or blocked.

- `startFreq` — defaults to `800` Hz.
- `endFreq` — defaults to `200` Hz.
- `duration` — defaults to `0.08` seconds.
- `volume` — defaults to `0.8`.

## Project Structure

```bash
src/
  App.jsx
  App.css
  components/
    Audio.js
    Bubble.jsx
    BubbleArea.jsx
  utils/
    getPosition.js
    particleSplash.js
public/
index.html
package.json
vite.config.js
```

## Customization

You can customize the project in a few key files:

- `src/App.css` — overall layout, colors, button styling, background effects
- `src/App.jsx` — main app logic and input handling
- `src/utils/getPosition.js` — bubble placement rules
- `src/utils/particleSplash.js` — pop particle generation

## Build for Production

To create a production build:

```bash
npm run build
```

The build output will be generated in the `dist/` folder.

## License

This project is provided for personal and commercial use as a starter UI interaction. If you plan to sell or redistribute it, please review your local licensing requirements and ensure the assets and code fit your intended usage.

## Notes

This project is designed as a starter kit and can be easily adapted into a larger product or interactive landing page.

It is intentionally simple, readable, and easy to modify so you can extend it with your own branding, color palettes, or interaction logic.

## Future Improvements

Possible enhancements include:
- configurable bubble themes
- drag-and-drop bubbles
- preset bubble libraries
- improved accessibility
- reusable component extraction
- multi-page product demo variations

## Author

Built as a starter UI interaction for creative product demos and digital storefronts.
