let audioCtx;

const playPopSound = ({ startFreq = 800, endFreq = 200, duration = 0.08, volume = 0.8 } = {}) => {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();

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
};

export default playPopSound;
