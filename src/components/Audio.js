let audioCtx;

/**
 * Plays a short pop sound. Audio failures are intentionally ignored so sound
 * remains an optional enhancement when browser policy or device support blocks it.
 *
 * @param {Object} [options]
 * @param {number} [options.startFreq=800]
 * @param {number} [options.endFreq=200]
 * @param {number} [options.duration=0.08]
 * @param {number} [options.volume=0.8]
 */
const playPopSound = ({ startFreq = 800, endFreq = 200, duration = 0.08, volume = 0.8 } = {}) => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    if (!audioCtx) audioCtx = new AudioContext();
    if (audioCtx.state === "suspended") audioCtx.resume().catch(() => {});

    const osc  = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.type = "triangle";
    osc.frequency.setValueAtTime(startFreq, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(endFreq, audioCtx.currentTime + duration);

    gain.gain.setValueAtTime(volume, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

    osc.start(audioCtx.currentTime);
    osc.stop(audioCtx.currentTime + duration);
  } catch {
    // Audio is an enhancement and must not interrupt the interaction.
  }
};

export default playPopSound;
